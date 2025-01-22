import React, { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import { Textarea } from '@/components/ui/textarea'
import { Copy, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const InputOutput = ({ input, setInput, output }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show the copied tick for 2 seconds
    });
  };

  return (
    <div>
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel
          minSize={20}
          maxSize={80}
          size={50}
          style={{ overflow: "auto" }}
        >
          <div className="flex flex-col gap-2 p-2">
            <p className="text-md font-semibold">Input</p>
            <ScrollArea>
              <Textarea
                className="w-full h-24 p-2 bg-background border-2 border-border rounded-lg font-poppins "
                placeholder="Enter input here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <ScrollBar />
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel
          minSize={20}
          maxSize={80}
          size={50}
          style={{ overflow: "auto" }}
        >
          <div className="flex flex-col gap-2 p-2">
            <div className='flex flex-row justify-between align-middle' >
              <p className="text-md font-semibold">Output</p>
              <Button variant="ghost" size="xs" onClick={copyToClipboard} >
                <Copy className="h-4 w-4 text-muted-foreground" />
                {copied ? <span className="text-green-500">Copied!</span> : <span>Copy</span>}
              </Button>
            </div>
            <ScrollArea>
              <Textarea
                className="w-full h-24 p-2 bg-background border-2 border-border rounded-lg font-poppins "
                placeholder="Output will be displayed here..."
                readOnly={true}
                value={output}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default InputOutput