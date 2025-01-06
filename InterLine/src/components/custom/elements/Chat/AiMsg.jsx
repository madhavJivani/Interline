import React from 'react';
import { Bot } from 'lucide-react';
import { Card } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { useSelector } from "react-redux";

const AiMsg = ({ text }) => {
    const { theme } = useSelector((state) => state.theme);

    return (
        <div className="flex justify-start mb-2">
            <div className="mr-1 flex items-center">
                <Bot className="text-muted-foreground" />
            </div>
            <Card className="w-[90%] p-2 bg-blue-500 text-white">
                {/* Render Markdown, including code blocks */}
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const language = className?.replace('language-', '');
                            return !inline ? (
                                <pre className={`language-${language} bg-gray-800 p-2 rounded-md`} {...props}>
                                    <code>{children}</code>
                                </pre>
                            ) : (
                                <code className="text-blue-500" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {text}
                </ReactMarkdown>
            </Card>
        </div>
    );
};

export default AiMsg;
