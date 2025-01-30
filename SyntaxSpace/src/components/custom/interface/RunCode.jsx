import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LANGUAGES_DETAILS } from "@/config/constants.js";
import { runCode } from "@/backend/utils/piston.api.js";
import { SpinWheelLoader } from '@/components/custom/fragments/Loader'
import { Play } from 'lucide-react'
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding'


const RunCode = ({ language, code, input, setOutput, codeRef }) => {
    const [loading, setLoading] = useState(false);

    const handleCodeRunner = async () => {
        console.log("Running code");
        setLoading(true);

        const version = LANGUAGES_DETAILS[language][0];
        const response = await runCode(language, version, code, input);

        console.log(response);
        setOutput(response.run.output);
        setLoading(false);

        if (codeRef.current) {
            codeRef.current.scrollIntoView({
                behavior: 'smooth', // For smooth scrolling
                block: 'center'
            });
        }
    };
    useGlobalKeybinding("ctrl+f9", handleCodeRunner)
    return (
        <Button
            onClick={handleCodeRunner}
            disabled={loading}
            variant="outline"
            size="icon"
            className="flex items-center gap-2 mb-1"
        >
            {loading ? <SpinWheelLoader /> : <Play size={20} />}
        </Button>
    );
};

export default RunCode;
