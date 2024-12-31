import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, } from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { toggleEditorTheme } from '@/store/themeSlice';

const ThemeSelect = () => {
    const [selectedTheme, setSelectedTheme] = useState("vs-dark");
    const dispatch = useDispatch();
    return (
        <div className="w-full flex justify-end rounded-t-lg">
            <Select
                defaultValue={selectedTheme}
                onValueChange={(value) => {
                    setSelectedTheme(value);
                    dispatch(toggleEditorTheme(value));
                }}
            >
                <SelectTrigger className="w-[12vw] min-w-40">
                    <div className="flex justify-between items-center w-full">
                        <span>
                            {
                                selectedTheme === "vs-light" ? "VS Light" : selectedTheme === "vs-dark" ? "VS Dark" :
                                    "HC Black"
                            }
                        </span>
                        <span className="text-primary mr-1" >
                            { selectedTheme === "vs-light" ? "Light" : "Dark" }
                        </span>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Editor Themes</SelectLabel>
                        <SelectItem value="vs-light">
                            <span className="font-medium text-left">VS Light
                            </span>
                        </SelectItem>
                        <SelectItem value="vs-dark">
                            <span className="font-medium text-left">VS Dark</span>
                        </SelectItem>
                        <SelectItem value="hc-black">
                            <span className="font-medium text-left">High Contrast Black</span>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ThemeSelect;
