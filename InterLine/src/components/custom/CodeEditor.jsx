import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { runCode } from '@/utils/piston.api'

import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";

import LanguageSelect from "@/components/custom/elements/LanguageSelect";
import ThemeSelect from "@/components/custom/elements/ThemeSelect";
import Options from "@/components/custom/elements/Options";
import FileInputComponent from "@/components/custom/elements/FileInputComponent";
import IO from "@/components/custom/elements/IO";
import { SpinWheelLoader } from '@/components/custom/elements/Loader'

import { Play, Download } from "lucide-react";


const CodeEditor = () => {
  const language = useSelector((state) => state.language);
  const editorTheme = useSelector((state) => state.theme.editorTheme);
  const option = useSelector((state) => state.option);
  // console.log(option)
  const [code, setCode] = useState(language.snippet);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  // Update code when language changes
  useEffect(() => {
    setCode(language.snippet);
  }, [language]);

  const run = async () => { 
    console.log(input)
    setLoading(true);
    try {
      const response = await runCode(language.language, language.version, code , input);
      // console.log(response);
      setOutput(response);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const downloadCode = () => {
    const languageExtensions = {
      typescript: ".ts",
      javascript: ".js",
      php: ".php",
      csharp: ".cs",
      cpp: ".cpp", // or .cxx, .cc, .h, .hpp if you want to be more inclusive
      java: ".java",
      fsharp: ".fs", // or .fsi, .fsx
      lua: ".lua",
      powershell: ".ps1", // or .psm1, .psd1, .psc1, .pssc
      python: ".py", // or .pyw
      ruby: ".rb",
      c: ".c",
    };

    const extension = languageExtensions[language.language] || ".txt"; // Default to .txt
    const filename = `code${extension}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL
  };
  return (
    <>
      <div className="sticky top-0 z-50 shadow-md">
        <Options />
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg pb-5 w-[80%] mx-auto mt-10">
        <div className="w-full flex justify-between items-start mb-1"> {/* Main toolbar container */}
          <div className="rounded-t-lg pb-1"> {/* Language Select */}
            <LanguageSelect />
          </div>
          <div className="flex space-x-2 items-center"> {/* Run/Upload container */}
            <Button
              onClick={run}
              variant="ghost"
              size="md"
              className="text-balance text-sm px-2"
              disabled={loading}
            >
              {loading ? <SpinWheelLoader /> : <><Play size={24} /> Run Code </>}
            </Button>
            <Button variant="outline" size="circleIcon" onClick={downloadCode} className="text-balance text-sm px-2">
              <Download size={20} />
            </Button>
            <FileInputComponent setCode={setCode} />
          </div>
          <div className="rounded-t-lg pb-1"> {/* Theme Select */}
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
        <IO output={output} input={input} setInput={ setInput} />
      </div>
    </>);
};

export default CodeEditor;
