import React, { useState, useCallback } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco, atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy, Check } from "lucide-react"; // Import copy and check icons
import { useSelector } from "react-redux";

const IO = ({ output }) => {
    const { theme } = useSelector((state) => state.theme);
    const [isCopied, setIsCopied] = useState(false);

    const highlighterStyles = {
        light: atomOneLight,
        dark: atomOneDark,
    };

    const currentHighlighterStyle = highlighterStyles[theme] || docco;

    const handleCopyClick = useCallback(() => {
        if (output && output.run && output.run.output) {
            navigator.clipboard.writeText(output.run.output);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        }
    }, [output]);

    // Check for SIGKILL signal and display appropriate message
    const outputText = output?.run?.signal === "SIGKILL"
        ? "Process terminated by SIGKILL signal.\n\nThis usually happens when the program takes too long to execute or uses too much memory."
        : (output?.run?.output || "Output");

    return (
        <div className="w-full h-full border rounded-md bg-background max-h-[50vh] m-2 relative"> {/* Added relative positioning */}
            <ResizablePanelGroup direction="horizontal" className="h-full max-h-[50vh]">
                {/* Input Section */}
                <ResizablePanel defaultSize={50} minSize={25} maxSize={75}>
                    <ScrollArea className="h-full w-full p-4 border-r border-muted max-h-[50vh]">
                        <Textarea
                            className="w-full min-h-[15vh] max-h-[45vh] p-5"
                            placeholder="Write your input here..."
                        />
                    </ScrollArea>
                </ResizablePanel>
                <ResizableHandle withHandle={true} className="max-h-[50vh]" />
                {/* Output Section */}
                <ResizablePanel defaultSize={50} minSize={25} maxSize={75}>
                    <ScrollArea className="h-full w-full p-4 max-h-[50vh]" style={{ overflowX: 'auto' }}>
                        <div className="relative"> {/* Added relative positioning */}
                            <SyntaxHighlighter
                                language="text"
                                style={currentHighlighterStyle}
                                wrapLongLines={true}
                                showLineNumbers={true}
                                className="w-full h-full rounded-md"
                            >
                                {outputText}
                            </SyntaxHighlighter>
                            <button
                                onClick={handleCopyClick}
                                className="absolute top-2 right-2 bg-background p-1 rounded-md hover:bg-muted transition-colors"
                                aria-label="Copy output"
                            >
                                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </button>
                        </div>
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default IO;