"use client";
import { Check, Copy } from "lucide-react";
import React, { ReactNode, useEffect, useCallback } from "react";
import { highlight } from "sugar-high";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

type SupportedLanguages =
  | "tsx"
  | "jsx"
  | "typescript"
  | "javascript"
  | "python"
  | "ruby"
  | "go"
  | "rust"
  | "java"
  | "cpp"
  | "cs"
  | "php"
  | "rescript";

interface CodeBlockProps {
  codeString: string;
  language?: SupportedLanguages;
  className?: string;
}

interface CopyButtonProps {
  isCopied: boolean;
  copyToClipboard: () => Promise<void>;
}

const CodeString: React.FC<CodeBlockProps> = ({
  codeString,
  language = "tsx",
  // className, // Keep if styling is needed, remove if not. For now, keep.
}) => {
  const codeHTML = highlight(codeString);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [selectedWord, setSelectedWord] = React.useState<string | null>(null);
  const codeRef = React.useRef<HTMLPreElement>(null);

  const highlightOccurrences = useCallback(
    (currentCodeHTML: string, word: string): string => {
      if (!word) return currentCodeHTML;
      const regex = new RegExp(`\\\\b${word}\\\\b`, "gi");
      return currentCodeHTML.replace(
        regex,
        (match) =>
          `<mark class="bg-yellow-200 dark:bg-green-400">${match}</mark>`
      );
    },
    []
  );

  const handleDoubleClick = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedWord(selection.toString().trim());
    } else {
      setSelectedWord(null);
    }
  }, []);

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (_) {
      toast.error("Failed to copy text");
    }
  };

  const highlightedCodeHTML = selectedWord
    ? highlightOccurrences(codeHTML, selectedWord)
    : codeHTML;

  return (
    <div className="rounded-lg overflow-hidden text-sm my-6 relative">
      <CopyButton copyToClipboard={copyToClipboard} isCopied={isCopied} />

      {/* <div className="relative size-full rounded-[inherit] text-xs py-3.5 [&_.line]:px-4 max-h-[600px]" > */}

      <pre
        className="code-block relative size-full rounded-[inherit] text-xs py-3.5 [&_.line]:px-4 max-h-[600px] overflow-auto flex-grow [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        ref={codeRef}
        onDoubleClick={handleDoubleClick}
      >
        <code
          className={`language-${language} border-none !bg-inherit`}
          dangerouslySetInnerHTML={{ __html: highlightedCodeHTML }}
        />
      </pre>
      {/* </div> */}
    </div>
  );
};

const CopyButton: React.FC<CopyButtonProps> = ({
  isCopied,
  copyToClipboard,
}) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.button
        key={isCopied ? "check" : "copy"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-1 right-1 p-2 rounded-md z-10"
        onClick={copyToClipboard}
      >
        {isCopied ? (
          <Check size={14} className="dark:text-green-500 text-green-600" />
        ) : (
          <Copy size={14} className="dark:text-gray-500 text-gray-600" />
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default CodeString;
