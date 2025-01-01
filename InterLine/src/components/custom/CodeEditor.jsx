import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelect from "@/components/custom/elements/LanguageSelect";
import ThemeSelect from "@/components/custom/elements/ThemeSelect";
import Options from "@/components/custom/elements/Options";
import { useSelector } from "react-redux";

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

  return (
    <>
      <div className="sticky top-0 z-50 bg-red-500 shadow-md">
        <Options />
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg pb-5 w-[80%] mx-auto mt-10">
        {/* Toolbar for Language and Theme Select */}
        <div className="w-full flex flex-row justify-between items-center">
          {/* Language Select on the extreme left */}
          <div className="flex flex-row justify-start  rounded-t-lg pb-1 border-red-200">
            <LanguageSelect />
          </div>
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
      </div>
    </>);
};

export default CodeEditor;
