import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Message = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show the copied tick for 2 seconds
    });
  };

  return (
    <div className="max-w-3xl overflow-x-auto rounded-md">
      <div className="flex items-center justify-between bg-white/50 dark:bg-neutral-900/40">
        <span className="text-sm text-muted-foreground mx-2">{language}</span>
        <Button
          variant="ghost"
          size="xs"
          onClick={copyToClipboard}
          className="p-3 bg-white/50 dark:bg-neutral-900/40 rounded-none w-[8em]"
        >
          <Copy className="h-4 w-4 text-muted-foreground" />
          {copied ? <span className="text-green-500 font-source">Copied</span> : <span className="font-source">Copy</span>}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          padding: "1rem",
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Message;
