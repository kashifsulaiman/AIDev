import React from 'react';

import Editor from '@monaco-editor/react';

export const Code = ({ code }: { code: string }) => {
  return (
    <div className="m-0 w-[calc(100%-255px)] text-base">
      <Editor
        height="100vh"
        language={'javascript'}
        value={code}
        theme="vs-light"
      />
    </div>
  );
};
