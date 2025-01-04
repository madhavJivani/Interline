import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const IO = () => {
    return (
        <div className="w-full h-full border rounded-md bg-background max-h-[50vh] m-2">
            <ResizablePanelGroup direction="horizontal" className="h-full max-h-[50vh]">
                {/* Input Section */}
                <ResizablePanel defaultSize={50} minSize={25} maxSize={75}>
                    <ScrollArea className="h-full w-full p-4 border-r border-muted max-h-[50vh]">
                        <Textarea
                            className="w-full min-h-[15vh] max-h-[45vh]"
                            placeholder="Write your input here..."
                        />
                    </ScrollArea>
                </ResizablePanel>
                <ResizableHandle withHandle={true} className="max-h-[50vh]"/>
                {/* Output Section */}
                <ResizablePanel defaultSize={50} minSize={25} maxSize={75}>
                    <ScrollArea className="h-full w-full p-4 max-h-[50vh]">
                        <div className="text-muted-foreground max-h-[50vh]">
                            Temporary output text goes here...

                        </div>
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default IO;
