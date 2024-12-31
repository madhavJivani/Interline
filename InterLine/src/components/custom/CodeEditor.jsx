import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelect from "@/components/custom/elements/LanguageSelect";
import ThemeSelect from "@/components/custom/elements/ThemeSelect";
import { useSelector } from "react-redux";

const CodeEditor = () => {
  const language = useSelector((state) => state.language);
  const editorTheme = useSelector((state) => state.theme.editorTheme);
  const [code, setCode] = useState(language.snippet);

  // Update code when language changes
  useEffect(() => {
    setCode(language.snippet);
  }, [language]);
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    minimap: {
      enabled: true,
      size: "fill",
    },
    lineNumbers: "on",
    wordWrap: "on",
    tabSize: 4,
    // automaticLayout: true,
    fontFamily: "Fira Code",
    fontSize: 24,
    fontWeight: "500",
    hover: {
      enabled: true
    },
    cursorStyle: "line",
    renderWhitespace: "boundary",
    smoothScrolling: true,
    inlineSuggest: false,
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg pb-5 w-[80%] mx-auto">
      {/* Toolbar for Language and Theme Select */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* Language Select on the extreme left */}
        <div className="flex flex-row justify-start bg-secondary rounded-t-lg pb-1 border-red-200">
          <LanguageSelect />
        </div>
        {/* Theme Select on the extreme right */}
        <div className="rounded-t-lg pb-1 bg-secondary justify-end">
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
        options={options}
        saveViewState={true}
      />
    </div>
  );
};

export default CodeEditor;
