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
import { SpinWheelLoader } from '@/components/custom/elements/Loader'
const CodeEditor = () => {
  const language = useSelector((state) => state.language);
  const editorTheme = useSelector((state) => state.theme.editorTheme);
  const option = useSelector((state) => state.option);
  // console.log(option)
  const [code, setCode] = useState(language.snippet);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Update code when language changes
  useEffect(() => {
    setCode(language.snippet);
  }, [language]);

  const run = async () => { 
    setLoading(true);
    try {
      const response = await runCode(language.language, language.version, code);
      // console.log(response);
      setOutput(response);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
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
          <Button onClick={run} variant="default" size="md" className="mb-1 text-balance text-sm px-2"
            disabled={loading}
          >
            {loading ? <SpinWheelLoader /> : <><Play size={24} /> Run Code </>}
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
        <IO output={ output} />
      </div>
    </>);
};

export default CodeEditor;
