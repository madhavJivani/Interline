import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLine, toggleTabs, toggleMinimapVisiblity, toggleMinimapSize, toggleWordWrap, toggleFontFamily, toggleFontSize, toggleFontWeight, toggleHover, toggleCursorStyle, toggleRenderWhitespace, toggleSmoothScrolling, toggleInlineSuggest, toggleMouseWheelZoom } from '@/store/optionSlice';

const Options = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [tabSize, setTabSize] = useState("4");
    const [minimapVisibility, setMinimapVisibility] = useState(true);
    const [minimapSize, setMinimapSize] = useState("fill");
    const [wordWrap, setWordWrap] = useState(true);
    const [fontFamily, setFontFamily] = useState("Fira Code");
    const [fontSize, setFontSize] = useState([20]);
    const [fontWeight, setFontWeight] = useState([500]);
    const [smoothScrolling, setSmoothScrolling] = useState(true);
    const [hover, setHover] = useState({ enabled: true });
    const [cursorStyle, setCursorStyle] = useState("line");
    const [renderWhitespace, setRenderWhitespace] = useState("trailing");
    const [inlineSuggest, setInlineSuggest] = useState(true);
    const [mouseWheelZoom, setMouseWheelZoom] = useState(false);
    return (
        <>
            {/* Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="absolute right-2 mt-2"
                        onClick={() => setIsOpen(true)}
                        variant="ghost"
                        size="circleIcon"
                    >
                        <Settings className="w-5 h-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                    <DialogTitle>Editor Options</DialogTitle>
                    <ScrollArea className="h-[30rem] w-full rounded-md border mt-4">
                        <div className="p-6 space-y-6">
                            {/* Line Numbers */}
                            <div className="space-y-2">
                                <Label>Show Line Numbers</Label>
                                <p className="text-sm text-gray-500">Toggle visibility of line numbers in the editor.</p>
                                <Switch
                                    checked={showLineNumbers}
                                    onCheckedChange={(value) => {
                                        setShowLineNumbers(value);
                                        dispatch(toggleLine());
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Tab Size */}
                            <div className="space-y-2">
                                <Label>Tab Size</Label>
                                <p className="text-sm text-gray-500">Adjust the width of a tab character.</p>
                                <Select
                                    value={tabSize}
                                    onValueChange={(value) => {
                                        setTabSize(value);
                                        dispatch(toggleTabs());
                                    }}
                                >
                                    <SelectTrigger>{tabSize} Spaces</SelectTrigger> {/* Show current selection */}
                                    <SelectContent>
                                        <SelectItem value="2">2 Spaces</SelectItem>
                                        <SelectItem value="4">4 Spaces</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />

                            {/* Minimap Visibility */}
                            <div className="space-y-2">
                                <Label>Minimap Visibility</Label>
                                <p className="text-sm text-gray-500">Show or hide the code minimap.</p>
                                <Switch
                                    checked={minimapVisibility}
                                    onCheckedChange={(value) => {
                                        setMinimapVisibility(value);
                                        dispatch(toggleMinimapVisiblity());
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Minimap Size */}
                            <div className="space-y-2">
                                <Label>Minimap Size</Label>
                                <p className="text-sm text-gray-500">Adjust the size of the minimap.</p>
                                <Select
                                    value={minimapSize}
                                    onValueChange={(value) => {
                                        setMinimapSize(value);
                                        dispatch(toggleMinimapSize());
                                    }}
                                >
                                    <SelectTrigger>{minimapSize.charAt(0).toUpperCase()+minimapSize.slice(1)}</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fit">Fit</SelectItem>
                                        <SelectItem value="fill">Fill</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />

                            {/* Word Wrap */}
                            <div className="space-y-2">
                                <Label>Word Wrap</Label>
                                <p className="text-sm text-gray-500">Wrap text at the edge of the editor or viewport.</p>
                                <Checkbox
                                    checked={wordWrap}
                                    onCheckedChange={(checked) => {
                                        setWordWrap(checked);
                                        dispatch(toggleWordWrap());
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Font Family */}
                            <div className="space-y-2">
                                <Label>Font Family</Label>
                                <p className="text-sm text-gray-500">Choose a font family for the editor.</p>
                                <Select
                                    value={fontFamily}
                                    onValueChange={(value) => {
                                        setFontFamily(value);
                                        dispatch(toggleFontFamily(value));
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
                                <Label>Font Size <span className="text-sm font-serif text-primary" >({fontSize[0]})</span></Label>
                                <p className="text-sm text-gray-500">Adjust the font size in the editor.</p>
                                <Slider
                                    value={fontSize}
                                    max={40}
                                    min={10}
                                    step={1}
                                    onValueChange={(value) => {
                                        setFontSize(value);
                                        dispatch(toggleFontSize(value));
                                    }}
                                />
                                
                            </div>
                            <Separator />

                            {/* Font Weight */}
                            <div className="space-y-2">
                                <Label>Font Weight <span className="text-sm font-serif text-primary" >  ({fontWeight[0]})</span> </Label>
                                <p className="text-sm text-gray-500">Change the font weight (boldness).</p>
                                <Slider
                                    value={fontWeight}
                                    max={900}
                                    min={100}
                                    step={50}
                                    onValueChange={(value) => {
                                        setFontWeight(value);
                                        dispatch(toggleFontWeight(value));
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Smooth Scrolling */}
                            <div className="space-y-2">
                                <Label>Smooth Scrolling</Label>
                                <p className="text-sm text-gray-500">Enable or disable smooth scrolling in the editor.</p>
                                <Switch
                                    checked={smoothScrolling}
                                    onCheckedChange={(value) => {
                                        setSmoothScrolling(value);
                                        dispatch(toggleSmoothScrolling());
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Hover */}
                            <div className="space-y-2">
                                <Label>Hover</Label>
                                <p className="text-sm text-gray-500">Enable or disable hover tooltips in the editor.</p>
                                <Switch
                                    checked={hover.enabled}
                                    onCheckedChange={(value) => {
                                        setHover({ enabled: value });
                                        dispatch(toggleHover());
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Cursor Style */}
                            <div className="space-y-2">
                                <Label>Cursor Style</Label>
                                <p className="text-sm text-gray-500">Change the cursor style in the editor.</p>
                                <Select
                                    value={cursorStyle}
                                    onValueChange={(value) => {
                                        setCursorStyle(value);
                                        dispatch(toggleCursorStyle(value));
                                    }}
                                >
                                    <SelectTrigger>{cursorStyle}</SelectTrigger>
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
                                <Label>Render Whitespace</Label>
                                <p className="text-sm text-gray-500">Choose how whitespace is rendered in the editor.</p>
                                <Select
                                    value={renderWhitespace}
                                    onValueChange={(value) => {
                                        setRenderWhitespace(value);
                                        dispatch(toggleRenderWhitespace(value));
                                    }}
                                >
                                    <SelectTrigger>{renderWhitespace}</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="boundary">Boundary</SelectItem>
                                        <SelectItem value="trailing">Trailing</SelectItem>
                                        <SelectItem value="all">All</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />

                            {/* Inline Suggest */}
                            <div className="space-y-2">
                                <Label>Inline Suggest</Label>
                                <p className="text-sm text-gray-500">Enable or disable inline suggestions in the editor.</p>
                                <Switch
                                    checked={inlineSuggest}
                                    onCheckedChange={(value) => {
                                        setInlineSuggest(value);
                                        dispatch(toggleInlineSuggest());
                                    }}
                                />
                            </div>
                            <Separator />

                            {/* Mouse Wheel Zoom */}
                            <div className="space-y-2">
                                <Label>Mouse Wheel Zoom</Label>
                                <p className="text-sm text-gray-500">Enable or disable zooming with the mouse wheel.</p>
                                <Switch
                                    checked={mouseWheelZoom}
                                    onCheckedChange={(value) => {
                                        setMouseWheelZoom(value);
                                        dispatch(toggleMouseWheelZoom());
                                    }}
                                />
                            </div>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Options;