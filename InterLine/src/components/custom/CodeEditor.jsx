import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelect from "@/components/custom/elements/LanguageSelect";
import ThemeSelect from "@/components/custom/elements/ThemeSelect";
import Options from "@/components/custom/elements/Options";
import IO from "@/components/custom/elements/IO";
import { useSelector } from "react-redux";
import { runCode } from '@/utils/piston.api'
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const CodeEditor = () => {
  const language = useSelector((state) => state.language);
  const editorTheme = useSelector((state) => state.theme.editorTheme);
  const  option = useSelector((state) => state.option);
  // console.log(option)
  const [code, setCode] = useState(language.snippet);

  // Update code when language changes
  useEffect(() => {
    setCode(language.snippet);
  }, [language]);

  const run = async () => { 
    // console.log(language.language, language.version, code)
    const res = await runCode(language.language, language.version, code)
    console.log("RES:",res.run.output, "\nError : ",res.run.stderr, "\nCode : ",res.run.code , "\nLanguage : ",res.language)
  }
  return (
    <>
      <div className="sticky top-0 z-50 shadow-md">
        <Options />
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg pb-5 w-[80%] mx-auto mt-10">
        {/* Toolbar for Language and Theme Select */}
        <div className="w-full flex flex-row justify-between items-center">
          {/* Language Select on the extreme left */}
          <div className="flex flex-row justify-start  rounded-t-lg pb-1">
            <LanguageSelect />
          </div>
          <Button onClick={run} variant="default" size="lg" className="mb-1 font-bold text-balance">
            <Play size={5} strokeWidth={3} />
            Run
          </Button>
          {/* Theme Select on the extreme right */}
          <div className="rounded-t-lg pb-1  justify-end">
            <ThemeSelect />
          </div>
        </div>

        {/* Monaco Editor */}
        <Editor
          theme={editorTheme}
          language={language.language}
          value={code}
          onChange={(value) => setCode(value)}
          height={"60vh"}
          options={option}
          saveViewState={true}
        />
        <IO />
      </div>
    </>);
};

export default CodeEditor;
