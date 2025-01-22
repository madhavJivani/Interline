import React, { useState } from "react";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Settings, LayoutList, WrapText, Eye, ZoomIn, TextCursorInput, Space, EyeOff, Fullscreen, CaseSensitive, AArrowUp, Bold, Pointer, PenLine, MessageSquareDot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useGlobalKeybinding from "@/config/hooks/useGlobalKeybinding";

const Options = ({ editorOptions, setEditorOptions }) => {
    const [lineNumbers, setLineNumbers] = useState(editorOptions.selectOnLineNumbers);
    const [minimapVisibility, setMinimapVisibility] = useState(editorOptions.minimap.enabled);
    const [minimapSize, setMinimapSize] = useState(editorOptions.minimap.size);
    const [wordWrap, setWordWrap] = useState(editorOptions.wordWrap);
    const [tabs, setTabs] = useState(editorOptions.tabSize);
    const [fontFamily, setFontFamily] = useState(editorOptions.fontFamily);
    const [fontSize, setFontSize] = useState([editorOptions.fontSize]);
    const [fontWeight, setFontWeight] = useState([editorOptions.fontWeight]);
    const [hover, setHover] = useState(editorOptions.hover.enabled);
    const [cursorStyle, setCursorStyle] = useState(editorOptions.cursorStyle);
    const [renderWhitespace, setRenderWhitespace] = useState(editorOptions.renderWhitespace);
    const [smoothScrolling, setSmoothScrolling] = useState(editorOptions.smoothScrolling);
    const [inlineSuggest, setInlineSuggest] = useState(editorOptions.inlineSuggest);
    const [mouseWheelZoom, setMouseWheelZoom] = useState(editorOptions.mouseWheelZoom);
    const [isOpen, setIsOpen] = useState(false);

    useGlobalKeybinding("ctrl+p", () => setIsOpen(!isOpen));
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button onClick={() => setIsOpen(true)} variant="ghost"
                                size="icon">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-center"
                            >
                                Customize Editor.
                                <br />
                                <strong>
                                    ShortCut :
                                    ⌘ P
                                </strong>
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader className="hover:cursor-context-menu">
                    <DialogTitle>
                        <div className="text-xl font-bold tracking-tight text-primary font-playfair">
                            <span>Syntax</span>
                            <span className="text-muted-foreground">Space </span>
                            <span>Editor Options</span>
                        </div>
                        </DialogTitle>
                    <DialogDescription>
                        <span className="text-sm">Customize the appearance and behavior of the editor.</span>
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[30rem] w-full rounded-md border">
                    <div className="p-6 space-y-6">
                        {/* Show Line Numbers */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <LayoutList className="h-4 w-4" />
                                    <span>Show Line Numbers</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Enable or disable the visibility of line numbers in the editor for better code navigation.</p>
                            <Switch
                                checked={lineNumbers}
                                onCheckedChange={(value) => {
                                    setLineNumbers(value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        selectOnLineNumbers: value,
                                        lineNumbers: editorOptions.lineNumbers === "on" ? "off" : "on",
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Tab Size */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <Space className="h-4 w-4" />
                                    <span>Tab Size</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Set the number of spaces for each tab in the editor.</p>
                            <Select
                                value={tabs}
                                onValueChange={(value) => {
                                    setTabs(value);
                                    console.log("Tab Size:", value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        tabSize: value,
                                    });
                                }}
                            >
                                <SelectTrigger>{tabs} Spaces</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={2}>2 Spaces</SelectItem>
                                    <SelectItem value={4}>4 Spaces</SelectItem>
                                    <SelectItem value={8}>8 Spaces</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />

                        {/* Minimap Visibility */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <EyeOff className="h-4 w-4" />
                                    <span>Minimap Visibility</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Toggle the display of the minimap for a quick overview of your code.</p>
                            <Switch
                                checked={minimapVisibility}
                                onCheckedChange={(value) => {
                                    setMinimapVisibility(value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        minimap: {
                                            enabled: value,
                                            size: editorOptions.minimap.size,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Minimap Size */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <Fullscreen className="h-4 w-4" />
                                    <span>Minimap Size</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Choose the size of the minimap for better code visibility.</p>
                            <Select
                                value={minimapSize}
                                onValueChange={(value) => {
                                    setMinimapSize(value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        minimap: {
                                            enabled: editorOptions.minimap.enabled,
                                            size: value,
                                        },
                                    });
                                }}
                            >
                                <SelectTrigger>{minimapSize.charAt(0).toUpperCase() + minimapSize.slice(1)}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fit">Fit</SelectItem>
                                    <SelectItem value="fill">Fill</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />

                        {/* Word Wrap */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <WrapText className="h-4 w-4" />
                                    <span>Word Wrap</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Enable or disable wrapping of text at the editor or viewport edges.</p>
                            <Switch
                                checked={wordWrap === "on"}
                                onCheckedChange={(value) => {
                                    const newValue = value ? "on" : "off";
                                    setWordWrap(newValue);
                                    setEditorOptions({
                                        ...editorOptions,
                                        wordWrap: newValue,
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Font Family */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <CaseSensitive className="h-4 w-4" />
                                    <span>Font Family</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Choose a font family for the code editor.</p>
                            <Select
                                value={fontFamily}
                                onValueChange={(value) => {
                                    setFontFamily(value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        fontFamily: value,
                                    });
                                }}
                            >
                                <SelectTrigger>{fontFamily}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Courier New">Courier New</SelectItem>
                                    <SelectItem value="Monaco">Monaco</SelectItem>
                                    <SelectItem value="Roboto Mono">Roboto Mono</SelectItem>
                                    <SelectItem value="Fira Code">Fira Code</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />

                        {/* Font Size */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <AArrowUp className="h-4 w-4" />
                                    <span>Font Size ({fontSize[0]})</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Adjust the font size for the editor text.</p>
                            <Slider
                                value={fontSize}
                                max={40}
                                min={10}
                                step={1}
                                onValueChange={(value) => {
                                    setFontSize(value);
                                    console.log("Font Size:", value[0]);
                                    setEditorOptions({
                                        ...editorOptions,
                                        fontSize: value[0],
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Font Weight */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <Bold className="h-4 w-4" />
                                    <span>Font Weight ({fontWeight})</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Adjust the font weight for the editor text.</p>
                            <Slider
                                value={[parseInt(fontWeight, 10)]} // Ensure the value is parsed as an integer
                                max={900}
                                min={100}
                                step={100}
                                onValueChange={(value) => {
                                    const newFontWeight = String(value[0]); // Convert the slider value to a string
                                    setFontWeight(newFontWeight); // Update the state
                                    console.log("Font Weight:", newFontWeight);
                                    setEditorOptions({
                                        ...editorOptions,
                                        fontWeight: newFontWeight, // Update editorOptions with the string value
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Hover Preview */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <Pointer className="h-4 w-4" />
                                    <span>Hover Preview</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Toggle the hover preview feature in the editor.</p>
                            <Switch
                                checked={hover}
                                onCheckedChange={(value) => {
                                    setHover(value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        hover: {
                                            enabled: value,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Cursor Style */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <TextCursorInput className="h-4 w-4" />
                                    <span>Cursor Style</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Choose the cursor style for the editor.</p>
                            <Select
                                value={cursorStyle}
                                onValueChange={(value) => {
                                    setCursorStyle(value); // Update the state
                                    console.log("Cursor Style:", value); // Log the value
                                    setEditorOptions({
                                        ...editorOptions,
                                        cursorStyle: value, // Update editorOptions with the selected value
                                    });
                                }}
                            >
                                <SelectTrigger>{cursorStyle.charAt(0).toUpperCase() + cursorStyle.slice(1)}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="line">Line</SelectItem>
                                    <SelectItem value="block">Block</SelectItem>
                                    <SelectItem value="underline">Underline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />

                        {/* Render Whitespace */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <PenLine className="h-4 w-4" />
                                    <span>Render Whitespace</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Specify how whitespace characters should be rendered in the editor.</p>
                            <Select
                                value={renderWhitespace}
                                onValueChange={(value) => {
                                    setRenderWhitespace(value); // Update the state
                                    console.log("Render Whitespace:", value); // Log the value
                                    setEditorOptions({
                                        ...editorOptions,
                                        renderWhitespace: value, // Update editorOptions with the selected value
                                    });
                                }}
                            >
                                <SelectTrigger>{renderWhitespace.charAt(0).toUpperCase() + renderWhitespace.slice(1)}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="boundary">Boundary</SelectItem>
                                    <SelectItem value="selection">Selection</SelectItem>
                                    <SelectItem value="trailing">Trailing</SelectItem>
                                    <SelectItem value="all">All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />

                        {/* Smooth Scrolling */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>Smooth Scrolling</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Enable or disable smooth scrolling in the editor.</p>
                            <Switch
                                checked={smoothScrolling}
                                onCheckedChange={(value) => {
                                    setSmoothScrolling(value);
                                    console.log("Smooth Scrolling:", value);
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Inline Suggest */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <MessageSquareDot className="h-4 w-4" />
                                    <span>Inline Suggest</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Toggle the Inline Suggest feature in the editor.</p>
                            <Switch
                                checked={inlineSuggest}
                                onCheckedChange={(value) => {
                                    setInlineSuggest(value);
                                    console.log("Inline Suggest:", value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        inlineSuggest: value,
                                    });
                                }}
                            />
                        </div>
                        <Separator />

                        {/* Mouse Wheel Zoom */}
                        <div className="space-y-2">
                            <Label>
                                <div className="flex items-center gap-2">
                                    <ZoomIn className="h-4 w-4" />
                                    <span>Mouse Wheel Zoom</span>
                                </div>
                            </Label>
                            <p className="text-sm text-gray-500">Enable or disable zooming with the mouse wheel.</p>
                            <Switch
                                checked={mouseWheelZoom}
                                onCheckedChange={(value) => {
                                    setMouseWheelZoom(value);
                                    console.log("Mouse Wheel Zoom:", value);
                                    setEditorOptions({
                                        ...editorOptions,
                                        mouseWheelZoom: value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default Options;
