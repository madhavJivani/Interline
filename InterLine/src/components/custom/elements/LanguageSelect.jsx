import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, } from "@/components/ui/select";
import { ScrollArea ,ScrollBar} from "@/components/ui/scroll-area"
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "@/store/languageSlice";

const LanguageSelect = () => {
    const dispatch = useDispatch();
    const { language, version } = useSelector((state) => state.language);

    return (
        <div className="w-full flex justify-start">
            <Select
                defaultValue="javascript"
                onValueChange={(value) => {
                    dispatch(toggleLanguage({ language: value }));
                }}
            >
                <SelectTrigger className="w-[12vw] min-w-40"> {/* Increased width for better display */}
                    <div className="flex justify-between items-center w-full"> {/* Added flex container */}
                        <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
                        {<span className="text-primary mr-1" >v{version}</span>}
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <ScrollArea className="h-[25vh] w-full shadow-sm overflow-auto">
                        <SelectLabel>Language Options</SelectLabel>
                        <SelectItem value="typescript">
                            <span className="font-medium text-left">Typescript</span>
                        </SelectItem>
                        <SelectItem value="javascript">
                            <span className="font-medium text-left">Javascript</span>
                        </SelectItem>
                        <SelectItem value="php">
                            <span className="font-medium text-left">PHP</span>
                        </SelectItem>
                        <SelectItem value="csharp">
                            <span className="font-medium text-left">C#</span>
                        </SelectItem>
                        <SelectItem value="cpp">
                            <span className="font-medium text-left">C++</span>
                        </SelectItem>
                        <SelectItem value="java">
                            <span className="font-medium text-left">Java</span>
                        </SelectItem>
                        <SelectItem value="fsharp">
                            <span className="font-medium text-left">F#</span>
                        </SelectItem>
                        <SelectItem value="lua">
                            <span className="font-medium text-left">Lua</span>
                        </SelectItem>
                        <SelectItem value="powershell">
                            <span className="font-medium text-left">PowerShell</span>
                        </SelectItem>
                        <SelectItem value="python">
                            <span className="font-medium text-left">Python</span>
                        </SelectItem>
                        <SelectItem value="ruby">
                            <span className="font-medium text-left">Ruby</span>
                        </SelectItem>
                        <SelectItem value="c">
                            <span className="font-medium text-left">C</span>
                            </SelectItem>
                            <ScrollBar className="rounded-md" />
                    </ScrollArea>
                        </SelectGroup>

                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelect;