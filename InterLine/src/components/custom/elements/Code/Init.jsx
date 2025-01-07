import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,DialogFooter,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {Select,SelectTrigger,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectValue,} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FilePlus, FileText, FolderOpen } from "lucide-react";
import service from "@/appwrite/appwrite.db.js";
import { useSelector, useDispatch } from "react-redux";
import { setCodes } from '@/store/codeSlice.js'
import { LANGUAGES_DETAILS } from "@/constants.js";
import { SpinWheelLoader } from "@/components/custom/elements/Loader";

const Init = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(false);

    const initHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await service.createDocument({
                userId: user.$id,
                fileName: fileName || "default",
                language: language || "javascript",
                version: LANGUAGES_DETAILS[language][0] || "1.32.3",
                code: LANGUAGES_DETAILS[language][1] || `console.log("Welcome to InterLine");`,
            });

            const docs = await service.listDocument(user.$id);
            console.log(docs);
            if (docs) { 
                dispatch(setCodes(docs));
            }

        } catch (error) {
            console.error("Appwrite init error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="circleIcon"><FolderOpen className="w-5 h-5" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Initiate File</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to initiate a new file.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={initHandler}>
                    {/* File Name Input */}
                    <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Enter file name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Language Select */}
                    <div className="flex items-center space-x-3">
                        <FilePlus className="w-5 h-5 text-muted-foreground" />
                        <Select
                            onValueChange={(value) => setLanguage(value)}
                            defaultValue="javascript"
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <ScrollArea className="h-[25vh] w-full shadow-sm overflow-auto">
                                        <SelectLabel>Language Options</SelectLabel>
                                        <SelectItem value="typescript">Typescript</SelectItem>
                                        <SelectItem value="javascript">Javascript</SelectItem>
                                        <SelectItem value="php">PHP</SelectItem>
                                        <SelectItem value="csharp">C#</SelectItem>
                                        <SelectItem value="cpp">C++</SelectItem>
                                        <SelectItem value="java">Java</SelectItem>
                                        <SelectItem value="fsharp">F#</SelectItem>
                                        <SelectItem value="lua">Lua</SelectItem>
                                        <SelectItem value="powershell">PowerShell</SelectItem>
                                        <SelectItem value="python">Python</SelectItem>
                                        <SelectItem value="ruby">Ruby</SelectItem>
                                        <SelectItem value="c">C</SelectItem>
                                        <ScrollBar className="rounded-md" />
                                    </ScrollArea>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button */}
                    <DialogFooter>
                        <Button
                            type="submit"
                            size="md"
                            variant="default"
                            className="font-sans w-full"
                            disabled={loading}
                        >
                            {loading ? <SpinWheelLoader /> : "Initiate File"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Init;
