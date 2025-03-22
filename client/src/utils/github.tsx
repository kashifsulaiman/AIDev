import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { RepoItemsType } from '@/types/modalTypes';

type Repo = { label: string };

export function useFetchGithubRepos(
  token: string,
  onSuccess?: (data: Repo[]) => void,
  onError?: (error: any) => void
) {
  return useMutation<Repo[], unknown, void>(
    async () => {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
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
