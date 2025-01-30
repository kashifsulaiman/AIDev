import { ProjectFiles } from '@stackblitz/sdk';

export const DiffCodeAndSendChanges = (
  oldObj: ProjectFiles,
  newObj: ProjectFiles
) => {
  const result: { create: { [key: string]: string }; destroy: string[] } = {
    create: {},
    destroy: [],
  };
  function safeJSONParse(str: string) {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      return str;
    }
  }
  for (const [key, value] of Object.entries(newObj)) {
    if (!(key in oldObj)) {
      result.create[key] = value;
    } else {
      const oldValue = safeJSONParse(oldObj[key]);
      const newValue = safeJSONParse(value);
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        result.create[key] = value;
      }
    }
  }
  for (const key of Object.keys(oldObj)) {
    if (!(key in newObj)) {
      result.destroy.push(key);
    }
  }

  return result;
};
