"use client";
import React, { useRef } from "react";
import { Tabs } from "@base-ui-components/react/tabs";
import { ChevronUp, User } from "lucide-react";
import CodeString from "../CodeString";
const Playground = ({ children }: { children: React.ReactNode }) => {
  const sampleCode = `
  const handleDoubleClick = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedWord(selection.toString().trim());
    } else {
      setSelectedWord(null);
    }
  }, []);
  `;
  return (
    <div className="w-full h-fit rounded-xl outline-1 outline-fd-border overflow-clip relative">
      <div className="p-4 flex items-center justify-center  w-full h-fit min-h-[300px]">
        {children}
      </div>
      <div className="">
        <Tabs.Root
          className="flex flex-col overflow-hidden rounded-xl border bg-fd-secondary "
          defaultValue="controls"
        >
          <Tabs.List className="flex gap-3.5 text-fd-secondary-foreground overflow-x-auto px-4">
            <Tabs.Tab
              className="whitespace-nowrap text-fd-muted-foreground border-b border-transparent py-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-selected:border-fd-primary data-selected:text-fd-primary"
              value="controls"
            >
              Controls
            </Tabs.Tab>
            <Tabs.Tab
              className="whitespace-nowrap text-fd-muted-foreground border-b border-transparent py-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-selected:border-fd-primary data-selected:text-fd-primary"
              value="typescript"
            >
              TypeScript
            </Tabs.Tab>
            <Tabs.Tab
              className="whitespace-nowrap text-fd-muted-foreground border-b border-transparent py-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-selected:border-fd-primary data-selected:text-fd-primary"
              value="rescript"
            >
              Rescript
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel
            className="p-2 text-[15px] bg-fd-background rounded-xl outline-none prose-no-margin [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none"
            value="controls"
          >
            <ChevronUp className="size-10 text-gray-300" />
          </Tabs.Panel>
          <Tabs.Panel
            className="p-2 text-[15px] bg-fd-background rounded-xl outline-none prose-no-margin [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none"
            value="typescript"
          >
            <CodeString codeString={sampleCode} language="typescript" />
          </Tabs.Panel>
          <Tabs.Panel
            className="p-2 text-[15px] bg-fd-background rounded-xl outline-none prose-no-margin [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none"
            value="rescript"
          >
            <CodeString codeString={sampleCode} language="rescript" />  
          </Tabs.Panel>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Playground;
