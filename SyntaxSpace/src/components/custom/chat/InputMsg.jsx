import React from "react";

const InputMsg = ({ message }) => {
    return (
        <div className="flex justify-end max-w-3xl">
            <div className="bg-primary text-primary-foreground rounded-lg p-3">
                <p className="text-sm font-sans">{message}</p>
            </div>
        </div>
    );
};

export default InputMsg;
