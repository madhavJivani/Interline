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

const Options = () => {
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

    const handleChange = (type, value) => {
        console.log(`${type} updated to:`, value);
    };

    return (
        <>
            {/* Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="fixed top-16 mt-6 right-2"
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
                                        handleChange("Line Numbers", value);
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
                                        handleChange("Tab Size", value);
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

                            {/* ... (Other options - similar structure as above) */}
                            {/* Minimap Visibility */}
                            <div className="space-y-2">
                                <Label>Minimap Visibility</Label>
                                <p className="text-sm text-gray-500">Show or hide the code minimap.</p>
                                <Switch
                                    checked={minimapVisibility}
                                    onCheckedChange={(value) => {
                                        setMinimapVisibility(value);
                                        handleChange("Minimap Visibility", value);
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
                                        handleChange("Minimap Size", value);
                                    }}
                                >
                                    <SelectTrigger>{minimapSize}</SelectTrigger>
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
                                        handleChange("Word Wrap", checked);
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
                                        handleChange("Font Family", value);
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
                                        handleChange("Font Size", value);
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
                                        handleChange("Font Weight", value);
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
                                        handleChange("Smooth Scrolling", value);
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