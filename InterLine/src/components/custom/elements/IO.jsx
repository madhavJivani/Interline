import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco, atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { OctagonAlert } from "lucide-react"; // Import the OctagonAlert icon for error
import { useSelector } from "react-redux";

const IO = ({ output }) => {
    const { theme } = useSelector((state) => state.theme);

    const highlighterStyles = {
        light: atomOneLight, // Use a light theme style
        dark: atomOneDark,   // Use a dark theme style
    };

    const currentHighlighterStyle = highlighterStyles[theme] || docco; // Default to docco

    return (
        <div className="w-full h-full border rounded-md bg-background max-h-[50vh] m-2">
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
                    <ScrollArea className="h-full w-full p-4 max-h-[50vh]">
                        {/* Show stderr with error if code is 1 */}
                        {output?.run?.code === 1 && (
                            <div className="flex items-center gap-2 mb-2 text-red-600">
                                <OctagonAlert size={24} />
                                <span>{output.run.stderr || "Error occurred"}</span>
                            </div>
                        )}

                        {/* Display output if no error */}
                        <SyntaxHighlighter
                            language="text"
                            style={currentHighlighterStyle}
                            wrapLines={true}
                            showLineNumbers={true}
                            className="w-full h-full rounded-md"
                        >
                            {output ? output.run.output : "Output"}
                        </SyntaxHighlighter>
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default IO;
