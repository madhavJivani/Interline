import React from 'react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { ChevronRight } from "lucide-react"
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import {HoverCard,HoverCardContent,HoverCardTrigger,} from "@/components/ui/hover-card"

const BackgroundBeamsWithCollisionPage = () => {
    return (
        <BackgroundBeamsWithCollision>
            <div className="relative z-20 text-center font-sans tracking-tight flex flex-col justify-center items-center  hover:cursor-context-menu">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-primary 
                flex justify-center gap-4 items-center w-[60vw] ">
                    Welcome to 
                    <span
                        className="relative bg-gradient-to-r from-primary via-muted-foreground to-muted bg-clip-text text-transparent py-4"
                        style={{
                            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow
                        }}
                    >
                        <span>SyntaxSpace</span>
                    </span>
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground font-source">
                    <TextGenerateEffect duration={2} filter={false} words={"A powerful coding environment with"} />
                </p>
                <span className="flex flex-row items-center justify-center mt-[5rem] flex-wrap w-[70vw] text-xl gap-4">
                    {/* Multi-language Coding Support */}
                    <HoverCard>
                        <HoverCardTrigger className="hover:underline cursor-pointer">
                            Multi-language Coding Support
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className='text-sm'>Write, edit, and debug code in multiple programming languages, including JavaScript, Python, C++, and more.</p>
                        </HoverCardContent>
                    </HoverCard>
                    <ChevronRight size={30} />

                    {/* Advanced Code Editor */}
                    <HoverCard>
                        <HoverCardTrigger className="hover:underline cursor-pointer">
                            Advanced Code Editor
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className='text-sm'>Experience an advanced, user-friendly code editor with syntax highlighting, autocompletion, and error detection.</p>
                        </HoverCardContent>
                    </HoverCard>
                    <ChevronRight size={30} />

                    {/* Integrated Terminal */}
                    <HoverCard>
                        <HoverCardTrigger className="hover:underline cursor-pointer">
                            Integrated Terminal (Text & File I/O)
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className='text-sm'>Run commands, test scripts, and handle file input/output seamlessly within an integrated terminal.</p>
                        </HoverCardContent>
                    </HoverCard>
                    <ChevronRight size={30} />

                    {/* Secure Authentication */}
                    <HoverCard>
                        <HoverCardTrigger className="hover:underline cursor-pointer">
                            Secure Authentication (Google & Custom)
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className='text-sm'>Ensure safe access with Google Sign-In and customizable authentication methods for users.</p>
                        </HoverCardContent>
                    </HoverCard>
                    <ChevronRight size={30} />

                    {/* Gemini-powered AI Coding Assistant */}
                    <HoverCard>
                        <HoverCardTrigger className="hover:underline cursor-pointer">
                            Gemini-powered AI Coding Assistant
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className='text-sm'>Boost productivity with AI-powered assistance for code generation, debugging, and learning.</p>
                        </HoverCardContent>
                    </HoverCard>
                </span>
            </div>
        </BackgroundBeamsWithCollision>
    );
};

export default BackgroundBeamsWithCollisionPage;
