export const extractAttributes = (inputPrompt: string) => {
  const allowedFrameworks = [
    'next',
    'react',
    'vue',
    'angular',
    'js',
    'javascript',
    'vanilla',
    'next.js',
    'node',
    'express',
    'backend'
  ];
  const lowerCasePrompt = inputPrompt.toLowerCase();
  const attributes = { framework: 'react' };
  const findFrameworkIndex = allowedFrameworks.findIndex((item) =>
    lowerCasePrompt.includes(item)
  );
  if (findFrameworkIndex !== -1)
    attributes.framework = allowedFrameworks[findFrameworkIndex];
  return attributes;
};

export function base64Decode(encoded: string) {
  try {
    const decoded = atob(decodeURIComponent(encoded));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Base64 decode error:', error);
    return null;
  }
}

export function extractEnvVariables(codeChunks: string[]): string[] {
  const regex = /process\.env\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
  const matches = new Set<string>();

  for (const code of codeChunks) {
    let match;
    while ((match = regex.exec(code)) !== null) {
      matches.add(match[1]);
    }
  }
  return Array.from(matches);
}

export function areEnvValuesComplete(
  envKeys: string[],
  envValues: Record<string, string>
): boolean {
  return envKeys.every((key) => {
    const value = envValues[key];
    return typeof value === "string" && value.trim() !== "";
  });
}

export function replaceEnvInFiles(
  envMap: Record<string, string>,
  files: Record<string, string>
): Record<string, string> {
  const updatedFiles: Record<string, string> = {};

  for (const [filename, content] of Object.entries(files)) {
    let updatedContent = content;

    for (const [key, value] of Object.entries(envMap)) {
      const regex = new RegExp(`process\\.env\\.${key}\\b`, "g");
      updatedContent = updatedContent.replace(regex, `"${value}"`);
    }

    updatedFiles[filename] = updatedContent;
  }
  return updatedFiles;
}
