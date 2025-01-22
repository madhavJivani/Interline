import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Code, Terminal, Cpu, Globe, Gamepad2, Server } from "lucide-react"; // Example icons, replace as needed

const LANGUAGES = [
    { name: "TypeScript", icon: <Globe /> },
    { name: "JavaScript", icon: <Globe /> },
    { name: "C#", icon: <Gamepad2 /> },
    { name: "PHP", icon: <Globe /> },
    { name: "Java", icon: <Code /> },
    { name: "C++", icon: <Cpu /> },
    { name: "F#", icon: <Server /> },
    { name: "Lua", icon: <Gamepad2 /> },
    { name: "Ruby", icon: <Code /> },
    { name: "PowerShell", icon: <Terminal /> },
    { name: "Python", icon: <Code /> },
    { name: "C", icon: <Cpu /> },
];

const SCROLL_DURATION = 30; // Speed in seconds (lower = faster)

const LanguageMarquee = () => {
    const controls = useAnimation();

    // Start the scrolling animation
    useEffect(() => {
        controls.start({
            x: ["0%", "-100%"],
            transition: {
                ease: "linear",
                duration: SCROLL_DURATION,
                repeat: Infinity,
            },
        });
    }, [controls]);

    return (
        <div className="relative max-w-[100vw] mx-auto overflow-hidden bg-background py-6 hover:cursor-context-menu">
            {/* Fading edges for better look */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>

            {/* Scrollable Content */}
            <motion.div
                animate={controls}
                className="flex space-x-8"
            >
                {LANGUAGES.map(({ name, icon }, index) => (
                    <HoverableLanguageBlock key={index} name={name} icon={icon} />
                ))}

                {/* Repeat content for seamless scrolling */}
                {LANGUAGES.map(({ name, icon }, index) => (
                    <HoverableLanguageBlock key={`repeat-${index}`} name={name} icon={icon} />
                ))}
            </motion.div>
        </div>
    );
};

// Language Block with Hover Effect
const HoverableLanguageBlock = ({ name, icon }) => {
    return (
        <div className="relative flex items-center space-x-2 min-w-[9vw] text-center p-3 transition-transform duration-300 rounded-full justify-center group">
            {/* Gradient Background */}
            {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,_#7C3AED,_#EC4899,_#7C3AED)] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div> */}

            {/* Content */}
            <div className="relative z-10 flex items-center space-x-2">
                <div className="text-primary">{icon}</div>
                <p className="text-base font-medium text-muted-foreground">{name}</p>
            </div>
        </div>
    );
};

export default LanguageMarquee;
