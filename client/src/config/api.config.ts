const baseURL = process.env.NEXT_PUBLIC_SITE_URL + '/api';
export const allPrompts = async () => {
  try {
    const response = await fetch(`${baseURL}/prompts`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const getTemplates = async () => {
  try {
    const response = await fetch(`${baseURL}/project/nextjs`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const getProjectDir = async (projectID: string) => {
  try {
    const response = await fetch(`${baseURL}/codesandbox/${projectID}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
