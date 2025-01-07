import React from "react";
import { useSelector } from "react-redux";
import { FileCode, Folder, Code } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,SheetClose} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Init from "./Init";
import { Separator } from "@/components/ui/separator"
import { useDispatch } from "react-redux";
import { toggleLanguage } from '@/store/languageSlice.js'

// Language extensions and icons mapping
const languageExtensions = {
    typescript: ".ts",
    javascript: ".js",
    php: ".php",
    csharp: ".cs",
    cpp: ".cpp",
    java: ".java",
    fsharp: ".fs",
    lua: ".lua",
    powershell: ".ps1",
    python: ".py",
    ruby: ".rb",
    c: ".c",
};

const languageIcons = {
    typescript: <FileCode className="text-blue-500 w-5 h-5" />,
    javascript: <FileCode className="text-yellow-500 w-5 h-5" />,
    php: <FileCode className="text-purple-500 w-5 h-5" />,
    csharp: <FileCode className="text-green-500 w-5 h-5" />,
    cpp: <FileCode className="text-pink-500 w-5 h-5" />,
    java: <FileCode className="text-red-500 w-5 h-5" />,
    fsharp: <FileCode className="text-teal-500 w-5 h-5" />,
    lua: <FileCode className="text-indigo-500 w-5 h-5" />,
    powershell: <FileCode className="text-blue-700 w-5 h-5" />,
    python: <FileCode className="text-yellow-400 w-5 h-5" />,
    ruby: <FileCode className="text-red-400 w-5 h-5" />,
    c: <FileCode className="text-gray-500 w-5 h-5" />,
};


const FileList = () => {
    const codes = useSelector((state) => state.code);
    const dispatch = useDispatch();

    return (
        <div className="flex">
            {/* Sheet for Sidebar */}
            <Sheet>
                <SheetTrigger className="px-2 py-1 bg-muted text-foreground font-semibold flex flex-row items-center rounded-lg cursor-pointer">
                    <Folder className="w-6 h-6" />
                    <span className="ml-2">Files</span>
                </SheetTrigger>
                <SheetContent className="w-[25vw]">
                    <SheetHeader>
                        <SheetTitle className="text-lg font-semibold">File List</SheetTitle>
                        <SheetDescription>
                            <div className="text-md font-medium">
                                Here are the available code files
                            </div>
                            <Separator className="mt-2" />
                            <div className="flex items-center justify-between mt-2">
                                <span className="font-bold text-primary-foreground text-xl font-sans" >Create a File :</span>
                                <Init />
                            </div>
                            <Separator className="my-2" />
                        </SheetDescription>

                    </SheetHeader>

                    {/* File List */}
                    <div className="space-y-2 max-h-[10vh]">
                        {codes.map((file, index) => {
                            const { fileName, language ,code } = file;
                            const extension = languageExtensions[language] || "";
                            const icon = languageIcons[language] || <Code className="w-5 h-5" />;

                            return (
                                <SheetClose>
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 p-2 hover:bg-muted cursor-pointer rounded-lg w-[23vw]"
                                    onClick={() => dispatch(toggleLanguage({ language: language ,code : code}))}
                                >
                                    <div className="flex-shrink-0">{icon}</div>
                                    <div className="text-sm font-medium text-foreground">
                                        {fileName || "Untitled"}{extension}
                                    </div>
                                    </div>
                                </SheetClose>
                            );
                        })}   
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default FileList;
