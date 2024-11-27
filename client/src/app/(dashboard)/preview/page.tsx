'use client';

// import { Code } from '@/components/code-editor';
// import Sidebar from '@/components/code-editor/sidebar';
import React, { Suspense, useEffect, useState } from 'react';
import Loader from '@/Loader/loading';
import { useStoreState } from 'easy-peasy';
// import { getIcon } from '@/components/code-editor/icon';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

// function generateFileName(componentCode: string) {
//   // Match the component name after `const` or `function` keywords
//   const match = componentCode?.match(/(?:const|function)\s+([A-Za-z0-9_]+)/);

//   if (match && match[1]) {
//     return `${match[1]}.jsx`;
//   }

//   return 'Component.jsx';
// }

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const prompt = useStoreState((state: any) => state?.promptModel?.prompt);
  const jsxCode = prompt?.code;
  // const cssCode = `.hello {
  //   color: red;
  //   font-size: 24px;
  // }`;

  useEffect(() => {
    if (prompt?.code) {
      setIsLoading(false);
    }
  }, [prompt?.code]);
  // const icon = getIcon('jsx', 'nameabc');

  return (
    <>
      {isLoading ? (
        <div className="h-full bg-opacity-25 bg-purple-white-gradient-opactity25 lg:h-screen">
          <div className="flex size-full items-center justify-center">
            <div style={{ height: '40px', width: '40px' }} className="size-10">
              <Loader Color="#961CBE" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="h-full bg-opacity-25 bg-purple-white-gradient-opactity25 lg:h-screen">
            <div className="flex h-full w-full">
              {/* <Sidebar>
                <div
                  className={`flex items-center ${true ? 'bg-[#6f63c5] hover:!bg-none' : 'bg-transparent hover:bg-[#b9b2e9]'} mb-0.5 hover:text-white`}
                >
                  <span className="flex h-8 w-8 items-center justify-center">
                    {icon}
                  </span>

                  <span className="ml-[1px] !text-black">
                    {generateFileName(prompt?.code)}
                  </span>
                </div>
                <div
                  className={`flex items-center ${true ? 'bg-[#6f63c5] hover:!bg-none' : 'bg-transparent hover:bg-[#b9b2e9]'} mb-0.5 hover:text-white`}
                >
                  <span className="flex h-8 w-8 items-center justify-center">
                    {icon}
                  </span>

                  <span className="ml-[1px] !text-black">
                    Chatbot.css
                  </span>
                </div>
              </Sidebar> */}
              {/* <Code code={jsxCode} type='javascript' onChange={(value) => setJsxCode(value || "")} />
              <Code code={cssCode} type='css' onChange={(value) => setCssCode(value || "")} /> */}
              <SandpackProvider
                template="react"
                options={{
                  externalResources: ['https://cdn.tailwindcss.com'],
                }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                files={jsxCode}
              >
                <SandpackLayout style={{ height: '100%' }}>
                  <SandpackFileExplorer style={{ height: '100%' }} />
                  <SandpackCodeEditor
                    showTabs
                    showLineNumbers={false}
                    showInlineErrors
                    wrapContent
                    closableTabs
                    style={{ height: '100%' }}
                  />
                  <SandpackPreview style={{ height: '100%' }} />
                </SandpackLayout>
              </SandpackProvider>
            </div>

            {/* Live Preview */}

            {/* <div
              style={{
                flex: 1,
                border: "1px solid #ddd",
                padding: "10px",
                overflow: "auto",
                width: 300
              }}
            >
              <style>{cssCode}</style>
              <LiveProvider
                language="jsx"
                code={jsxCode}
                noInline
                scope={{ React, useState, useEffect, useRef }}
              >
                <LivePreview />
              </LiveProvider>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}

const PageWithSuspense = () => (
  <Suspense
    fallback={
      <div className="flex h-full w-full items-center justify-center">
        <Loader Color="#961CBE" />
      </div>
    }
  >
    <Page />
  </Suspense>
);
export default PageWithSuspense;
