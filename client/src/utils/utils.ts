export const extractAttributes = (inputPrompt: string) => {
  const allowedFrameworks = [
    'next',
    'react',
    'vue',
    'angular',
    'js',
    'javascript',
    'vanilla',
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
    console.error("Base64 decode error:", error);
    return null;
  }
}
