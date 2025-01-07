import React from "react";
import { useSelector } from "react-redux";
import { FileCode, Folder, Code } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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
    const codes = useSelector((state) => state.code).documents;

    return (
        <div className="flex">
            {/* Sheet for Sidebar */}
            <Sheet>
                <SheetTrigger className="px-2 bg-gray-800 text-white flex flex-row items-center">
                    <Folder className="w-6 h-6" />
                    <span className="ml-2">Files</span>
                </SheetTrigger>
                <SheetContent className="w-[300px]">
                    <SheetHeader>
                        <SheetTitle className="text-lg font-semibold">File List</SheetTitle>
                        <SheetDescription>
                            Here are the available code files
                        </SheetDescription>
                    </SheetHeader>

                    {/* File List */}
                    <div className="space-y-2 overflow-y-auto max-h-[450px]">
                        {codes.map((file, index) => {
                            const { fileName, language } = file;
                            const extension = languageExtensions[language] || "";
                            const icon = languageIcons[language] || <Code className="w-5 h-5" />;

                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer rounded-lg"
                                >
                                    <div className="flex-shrink-0">{icon}</div>
                                    <div className="text-sm font-medium text-white">
                                        {fileName || "Untitled"}{extension}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default FileList;
