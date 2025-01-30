import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import ThemeSelect from "./ThemeSelect";
import LanguageSelect from "./LanguageSelect";
import Options from "./Options";
import RunCode from "./RunCode";
import InputOutput from "./InputOutput";
import Download from "./Download";
import UploadCode from "./UploadCode";
import FileSystem from "./FileSystem";
import { initialOptions } from "@/config/constants";
import FileList from "./FileList";
import { SaveFile, DeleteFile, EditFile } from "./FileControl";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import MovableResizableCard from "../fragments/MovableResizableCard";

const CodeEditor = ({
    editorWidth = "95vw",
    editorHeight = "75vh",
    defaultLanguage = "javascript",
    defaultCode = `console.log("Welcome to SyntaxSpace");`,
}) => {
    const curr = useSelector((state) => state.documents.currentDoc);
    const [code, setCode] = useState(curr.code || localStorage.getItem("syntax_code") || defaultCode);
    const [language, setLanguage] = useState(curr.language || localStorage.getItem("syntax_language") || defaultLanguage);
    const [theme, setTheme] = useState("vs-dark");
    const [editorOptions, setEditorOptions] = useState(initialOptions);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const { user, status } = useSelector(state => state.user)

    const codeRef = useRef(null);
    useEffect(() => {
        // console.log("hello");
        // console.log("syntax_language:", localStorage.getItem("syntax_language"));
        // console.log("syntax_code:", localStorage.getItem("syntax_code"));

        return () => {
            // console.log("bye");
            localStorage.setItem("syntax_language", language);
            localStorage.setItem("syntax_code", code);
        };
    }, [code, language]);

    return (
        <div className="p-4 bg-background border-2 border-muted rounded-xl mb-8">
            <div className="fixed top-3 left-3 z-20">
                <MovableResizableCard />
            </div>
            <div className="flex justify-between items-center border-b-2 border-secondary pb-2 mb-2">
                <div className="w-1/3 flex flex-row justify-start items-center">
                    <FileSystem
                        language={curr.language ? curr.language : language}
                        fileName={curr.fileName ? curr.fileName : ""}
                    />
                </div>
                <div className="w-1/3 flex flex-row justify-center items-center">
                    {status === 'loggedIn' &&
                        <>
                            <div className="flex items-center gap-2 justify-end">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <SaveFile code={code} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Save your code.
                                                <br />
                                                <span className="font-semibold">Always Save your work before switching.</span>
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <DeleteFile />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete your code.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <EditFile />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Change Filename.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </>
                    }
                </div>
                <div className="w-1/3">
                    <div className="flex items-center gap-2 justify-end">
                        <FileList setCode={setCode} setLanguage={setLanguage} />
                        <Options setEditorOptions={setEditorOptions} editorOptions={editorOptions} />
                    </div>
                </div>
            </div>
            {/* Control Panel */}
            <div className="flex justify-between items-center">
                <LanguageSelect
                    setLanguage={setLanguage}
                    language={curr.language ? curr.language : language}
                    setCode={setCode}
                />
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Download code={code} language={language} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-center"
                                >Download your code.
                                    <br />
                                    <strong>
                                        ShortCut :
                                        ⌘ Q
                                    </strong>
                                </p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <RunCode code={code} language={language} input={input} setOutput={setOutput} codeRef={codeRef} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p
                                    className="text-center"
                                >Test your code.
                                    <br />
                                    <strong>
                                        ShortCut :
                                        ⌘ F9
                                    </strong>
                                </p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <UploadCode setCode={setCode} setLanguage={setLanguage} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p
                                    className="text-center"
                                >Upload your code.
                                    <br />
                                    <strong>
                                        ShortCut :
                                        ⌘ O
                                    </strong>
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <ThemeSelect setTheme={setTheme} theme={theme} />
            </div>

            {/* Code Editor */}
            <div className="rounded-lg overflow-hidden shadow-lg border border-border">
                <Editor
                    theme={theme}
                    language={curr.language ? curr.language : language}
                    value={curr.code ? curr.code : code}
                    onChange={(value) => setCode(value)}
                    height={editorHeight}
                    width={editorWidth}
                    options={editorOptions}
                    saveViewState={true}
                />
            </div>

            {/* Input Output */}
            <div className="mt-2" ref={codeRef}>
                <InputOutput input={input} setInput={setInput} output={output} />
            </div>
        </div>
    );
};

export default CodeEditor;
