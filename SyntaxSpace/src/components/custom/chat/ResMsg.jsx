import React from "react";
import Message from "./Message"; // Code display component
import ReactMarkdown from "react-markdown"; // Import React Markdown

const ResMsg = ({ message }) => {
    // Regex to match code blocks
    const regex = /```(\w+)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;

    // Extract all code blocks and text
    let match;
    while ((match = regex.exec(message)) !== null) {
        if (lastIndex < match.index) {
            parts.push({ type: "text", content: message.slice(lastIndex, match.index) });
        }
        parts.push({ type: "code", language: match[1], content: match[2] });
        lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last code block
    if (lastIndex < message.length) {
        parts.push({ type: "text", content: message.slice(lastIndex) });
    }

    return (
        <div className="flex items-start space-x-2 max-w-3xl">
            <div className="bg-secondary text-muted-foreground rounded-lg p-3">
                {parts.map((part, index) => {
                    if (part.type === "text") {
                        return (
                            <div key={index} className="mb-2">
                                {/* Render markdown text */}
                                <ReactMarkdown>{part.content.trim()}</ReactMarkdown>
                            </div>
                        );
                    } else if (part.type === "code") {
                        return (
                            <div key={index} className="mb-2">
                                {/* Render code using the Message component */}
                                <Message code={part.content} language={part.language} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default ResMsg;
