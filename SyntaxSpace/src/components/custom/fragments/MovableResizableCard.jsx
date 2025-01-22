import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { Send, MessageCircle, X, MessageCircleOff } from "lucide-react";
import { AI_HISTORY } from '@/config/constants.js'
import { addUserChat, addAiChat } from '@/store/aiSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import run from "@/backend/utils/ai.api";
import { SpinWheelLoader } from "@/components/custom/fragments/Loader";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ResMsg from "@/components/custom/chat/ResMsg";
import InputMsg from "@/components/custom/chat/InputMsg";
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const MovableResizableCard = () => {
    const ai = useSelector((state) => state.ai);
    const dispatch = useDispatch();
    const [currentInput, setCurrentInput] = useState("");
    const [chatHistory, setChatHistory] = useState(AI_HISTORY);
    const [loading, setLoading] = useState(false);
    const handleSend = async () => {
        if (currentInput.trim()) {
            setLoading(true);
            dispatch(addUserChat(currentInput));
            setCurrentInput("");

            // Start a timer to log "Time Wasted" if it takes longer than 12 seconds
            const timer = setTimeout(() => {
                toast("Some error occured !!", {
                    description: (<p>
                        We are unable to process your request at the moment. This may be due to a slow network connection or an issue with our servers.
                        <br />
                        <b className="font-dmSerif text-md" >
                            Or maybe you are just wasting your time and maybe our SyntaxSpace ChatBot has blocked you for spamming or wasting our resources.
                        </b>
                    </p>),
                })
                console.log("Time Wasted");
                setLoading(false);
            }, 10000);

            try {
                // Placeholder bot response for demo
                const { response, history } = await run(currentInput, chatHistory);
                clearTimeout(timer); // Clear the timer if the response arrives in time
                dispatch(addAiChat(response));
                setChatHistory(history);
            } catch (error) {
                console.error("Error in handling send:", error);
            } finally {
                setLoading(false);
            }
        }
        else {
            toast.warning('Please type something to send');
        }
    };

    const [rnd, setRnd] = useState(null);
    const [visible, setVisible] = useState(false); // To control visibility of the card

    // Calculate the center of the screen
    const calculateCenter = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const cardWidth = windowWidth * 0.6; // 60% of window width
        const cardHeight = windowHeight * 0.6; // 60% of window height

        return {
            x: (windowWidth - cardWidth) / 2,
            y: ((windowHeight - cardHeight) / 2) - 32,// 32px offset from top for mt-8 in App.jsx,
            width: cardWidth,
            height: cardHeight,
        };
    };

    // Set initial position and handle resize
    useEffect(() => {
        // Set initial centered position
        const center = calculateCenter();
        setRnd(center);

        // Update position and size when window is resized
        const handleResize = () => {
            const center = calculateCenter();
            setRnd(center);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle visibility
    const toggleVisibility = () => {
        setVisible(!visible);
    };
    useGlobalKeybinding('ctrl+enter', handleSend);
    return (
        <>
            {/* Button to toggle visibility of the card */}
            <Button
                onClick={toggleVisibility}
                className="fixed bottom-4 left-4 z-50"
                size="icon"
                variant="outline"
            >
                {visible ? <MessageCircleOff className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                
            </Button>

            {/* Movable and resizable card */}
            {visible && rnd && (
                <Rnd
                    size={{
                        width: rnd.width,
                        height: rnd.height,
                    }}
                    position={{
                        x: rnd.x,
                        y: rnd.y,
                    }}
                    onDragStop={(e, dir) =>
                        setRnd({
                            ...rnd,
                            x: parseInt(dir.x, 10),
                            y: parseInt(dir.y, 10),
                        })
                    }
                    onResizeStop={(e, direction, ref, delta, position) =>
                        setRnd({
                            ...rnd,
                            width: parseInt(ref.style.width, 10),
                            height: parseInt(ref.style.height, 10),
                            ...position,
                        })
                    }
                    enableResizing={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: false,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: true,
                    }}
                    minHeight={window.innerHeight * 0.4}
                    minWidth={window.innerWidth * 0.4}
                    maxHeight={window.innerHeight * 0.7}
                    maxWidth={window.innerWidth * 0.7}
                    bounds={"window"}
                >
                    <Card className="border-2 border-primary-muted">
                        <CardHeader className="border-b-2 border-secondary">
                            <CardTitle className="text-2xl font-poppins">
                                <div className="flex flex-row justify-between align-middle" >
                                    <div className="flex flex-row gap-1" >
                                        <div className="text-md font-bold tracking-tight text-primary font-playfair hover:cursor-context-menu">
                                            <span>Syntax</span>
                                            <span className="text-muted-foreground">Space </span>
                                        </div>
                                        <span>ChatBot</span>
                                    </div>
                                    <Button size="icon" onClick={toggleVisibility} variant="ghost" > 
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 cursor-context-menu rounded-lg">
                            {/* Chat Area */}
                            <div className="bg-background rounded-lg border ">
                                <ScrollArea className="h-[400px] p-4">
                                    <div className="space-y-3 ">
                                        {ai.map((msg, index) =>
                                            msg.role === "user" ? (
                                                <div className="flex flex-row justify-end" >
                                                    <InputMsg key={index} message={msg.parts[0].text} />
                                                </div>
                                            ) : (
                                                    <div className="flex flex-row justify-start" >
                                                        <ResMsg key={index} message={msg.parts[0].text} />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </ScrollArea>
                                {/* Input Field */}
                                <div className="p-4 border-t flex space-x-3">
                                    <Input
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-grow font-serif"
                                    />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button onClick={handleSend} size="icon" disabled={loading} >
                                                    {loading ? <SpinWheelLoader /> : <Send className="h-6 w-6" />}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <strong>⌘ Enter</strong>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Rnd>
            )}
        </>
    );
};

export default MovableResizableCard;
