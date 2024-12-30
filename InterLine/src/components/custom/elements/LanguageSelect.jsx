import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "@/store/languageSlice";

const LanguageSelect = () => {
    const dispatch = useDispatch();
    const { language, version } = useSelector((state) => state.language);

    return (
        <div className="w-full flex justify-start mb-1 px-5">
            <Select
                defaultValue="javascript"
                onValueChange={(value) => {
                    dispatch(toggleLanguage({ language: value }));
                }}
            >
                <SelectTrigger className="w-[12vw]"> {/* Increased width for better display */}
                    <div className="flex justify-between items-center w-full"> {/* Added flex container */}
                        <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
                        {<span className="text-primary" >v{version}</span>}
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Language Options</SelectLabel>
                        <SelectItem value="javascript">
                            <span className="font-medium text-left">Javascript</span>
                        </SelectItem>
                        <SelectItem value="typescript">
                            <span className="font-medium text-left">Typescript</span>
                        </SelectItem>
                        <SelectItem value="python">
                            <span className="font-medium text-left">Python</span>
                        </SelectItem>
                        <SelectItem value="java">
                            <span className="font-medium text-left">Java</span>
                        </SelectItem>
                        <SelectItem value="csharp">
                            <span className="font-medium text-left">C#</span>
                        </SelectItem>
                        <SelectItem value="php">
                            <span className="font-medium text-left">PHP</span>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelect;