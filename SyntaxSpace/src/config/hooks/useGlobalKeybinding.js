import { useEffect } from "react";

const useGlobalKeybinding = (keyCombo, callback) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const keys = keyCombo.toLowerCase().split("+");
            const isCtrlKey = keys.includes("ctrl");
            const mainKey = keys.find((key) => key !== "ctrl");

            if ((isCtrlKey ? event.ctrlKey : true) && event.key.toLowerCase() === mainKey) {
                event.preventDefault(); // Prevent default behavior
                callback(); // Trigger the callback
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown); // Cleanup
        };
    }, [keyCombo, callback]);
};

export default useGlobalKeybinding;
