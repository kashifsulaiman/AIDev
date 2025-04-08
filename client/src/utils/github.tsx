import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { RepoItemsType, SelectedRepoType } from '@/types/modalTypes';
import { Project, ProjectFiles } from '@stackblitz/sdk';
import { showToaster } from '@/components/Toaster';

export function useFetchGithubRepos(
  token: string,
  onSuccess?: (data: SelectedRepoType[]) => void,
  onError?: (error: any) => void
) {
  return useMutation<SelectedRepoType[], unknown, void>(
    async () => {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          visibility: 'all',
          affiliation: 'owner,collaborator,organization_member',
          per_page: 100,
          page: 1,
        },
      });
      return response.data.map((repo: { full_name: string }) => ({
        label: repo.full_name,
      }));
    },
    {
      onSuccess,
      onError,
    }
  );
}

export async function fetchAllFiles(reponame: string, token: string) {
  const apiBaseUrl = `https://api.github.com/repos/${reponame}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    const repoResponse = await axios.get(apiBaseUrl, { headers });
    const defaultBranch = repoResponse.data.default_branch;

    const branchResponse = await axios.get(
      `${apiBaseUrl}/branches/${defaultBranch}`,
      { headers }
    );
    const treeSha = branchResponse.data.commit.sha;

    const treeResponse = await axios.get(`${apiBaseUrl}/git/trees/${treeSha}`, {
      headers,
      params: { recursive: 'true' },
    });

    const allItems = treeResponse.data.tree.map(
      (item: { path: string; type: string; size: number }) => ({
        name: item.path,
        type: item.type === 'tree' ? 'folder' : 'file',
        size: item.size ?? 0,
      })
    );

    allItems.sort((a: typeof allItems, b: typeof allItems) => {
      if (a.type > b.type) {
        return -1;
      }
      if (a.type < b.type) {
        return 1;
      }
      return 0;
    });

    let updatedItems = updateSizeForPublicPaths(allItems);
    updatedItems = removePackageLock(updatedItems);
    return updatedItems;
  } catch (error) {
    console.error(`Error fetching all files: ${error}`);
    throw error;
  }
}

export async function fetchSelectedFiles(
  reponame: string,
  token: string,
  fileList: { name: string }[]
) {
  const apiBaseUrl = `https://api.github.com/repos/${reponame}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  async function fetchDefaultBranch() {
    const response = await axios.get(apiBaseUrl, { headers });
    return response.data.default_branch;
  }

  async function fetchRepoTree(branch: string) {
    const response = await axios.get(
      `${apiBaseUrl}/git/trees/${branch}?recursive=1`,
      { headers }
    );
    return response.data.tree;
  }

  async function fetchFileContent(fileSha: string) {
    const response = await axios.get(`${apiBaseUrl}/git/blobs/${fileSha}`, {
      headers,
    });
    return Buffer.from(response.data.content, 'base64').toString('utf-8');
  }

  try {
    const defaultBranch = await fetchDefaultBranch();
    const tree = await fetchRepoTree(defaultBranch);
    const selectedFilesSet = new Set(fileList.map((file) => file.name));

    const filesContent: { [key: string]: string } = {};

    for (const item of tree) {
      if (item.type === 'blob' && selectedFilesSet.has(item.path)) {
        const content = await fetchFileContent(item.sha);
        filesContent[item.path] = content;
      }
    }

    return filesContent;
  } catch (error) {
    console.error(`Error fetching selected files: ${error}`);
    throw error;
  }
}

export const updateSizeForPublicPaths = (files: RepoItemsType[]) => {
  return files.map((file) => ({
    ...file,
    size: file.name.startsWith('public') ? 0 : file.size,
  }));
};

function removePackageLock(files: RepoItemsType[]) {
  return files.filter((file) => !file.name.includes('package-lock.json'));
}

export async function updateRepoFiles(
  repoName: string,
  token: string,
  codeObject: ProjectFiles
): Promise<void> {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  for (const [filePath, content] of Object.entries(codeObject)) {
    try {
      let fileSha = '';
      try {
        const fileResponse = await axios.get<{ sha: string }>(
          `https://api.github.com/repos/${repoName}/contents/${filePath}`,
          { headers }
        );
        fileSha = fileResponse.data.sha;
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error(
            `❌ Error checking file ${filePath}:`,
            err.response?.data || err.message
          );
          continue;
        }
      }
      const fileContent =
        typeof content === 'string'
          ? content
          : JSON.stringify(content, null, 2);
      const base64Content = Buffer.from(fileContent, 'utf-8').toString(
        'base64'
      );

      const fileData = {
        message: fileSha ? `Updated ${filePath}` : `Created ${filePath}`,
        content: base64Content,
        branch: 'main',
        ...(fileSha && { sha: fileSha }),
      };

      await axios.put(
        `https://api.github.com/repos/${repoName}/contents/${filePath}`,
        fileData,
        { headers }
      );
    } catch (error: any) {
      console.error(
        `❌ Error updating file ${filePath}:`,
        error.response?.data || error.message
      );
    }
  }
}

export async function createRepoAndUpload(
  username: string,
  repoName: string,
  token: string,
  codeObject: Project
): Promise<void> {
  const apiBaseUrl = 'https://api.github.com/user/repos';
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    const repoData = { name: repoName, private: false };
    const repoResponse = await axios.post<{
      full_name: string;
      html_url: string;
    }>(apiBaseUrl, repoData, { headers });

    const newRepoName = repoResponse.data.full_name;

    const readmeTemplate = generateReadme(
      codeObject.title,
      codeObject.description ?? 'This is sample project created by AIDev',
      username,
      repoName
    );

    const readmeContent = Buffer.from(readmeTemplate).toString('base64');
    await axios.put(
      `https://api.github.com/repos/${newRepoName}/contents/README.md`,
      {
        message: 'Initial commit',
        content: readmeContent,
        branch: 'main',
      },
      { headers }
    );

    await updateRepoFiles(newRepoName, token, codeObject.files);
  } catch (error: any) {
    console.log(
      'Error creating repository:',
      error.response?.data || error.message
    );
    showToaster('Error creating repository:', 'error');
  }
}

function generateReadme(
  projectName: string,
  description: string,
  username: string,
  repoName: string,
  features: string[] = [],
  technologies: string[] = []
): string {
  return `# ${projectName}

## Description
${description}

${features.length > 0 ? `## Features\n${features.map((feature) => `- ${feature}`).join('\n')}\n` : ''}

## Installation
\`\`\`bash
git clone https://github.com/${username}/${repoName}.git
cd ${repoName}
npm install
\`\`\`

## Usage
\`\`\`bash
npm run dev
\`\`\`
Visit \`http://localhost:3000\` in your browser.

${technologies.length > 0 ? `## Technologies Used\n${technologies.map((tech) => `- ${tech}`).join('\n')}\n` : ''}

## License
This project is licensed under the MIT License.
`;
}
