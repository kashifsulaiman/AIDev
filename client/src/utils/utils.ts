export const extractAttributes = (inputPrompt: string) => {
  const allowedFrameworks = ['next', 'react', 'vue'];
  const lowerCasePrompt = inputPrompt.toLowerCase();
  const attributes = { framework: 'react' };
  const findFrameworkIndex = allowedFrameworks.findIndex((item) =>
    lowerCasePrompt.includes(item)
  );
  if (findFrameworkIndex !== -1)
    attributes.framework = allowedFrameworks[findFrameworkIndex];
  return attributes;
};
