import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelect from "@/components/custom/elements/LanguageSelect";
import { useSelector } from "react-redux";

const CodeEditor = () => {
  const language = useSelector((state) => state.language);
  const [code, setCode] = useState(language.snippet);

  // Update code when language changes
  useEffect(() => {
    setCode(language.snippet);
  }, [language]);

  return (
    <div className="flex flex-col items-center justify-center py-5 px-5">
      {/* Language Select Dropdown */}
      <div className="w-full">
        <LanguageSelect />
      </div>

      {/* Monaco Editor */}
      <Editor
        theme="vs-dark"
        height={"60vh"}
        width={"100%"}
        language={language.language}
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default CodeEditor;
