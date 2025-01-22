import React, { useState } from "react";
import ResMsg from "./ResMsg";
import InputMsg from "./InputMsg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription,DialogFooter,DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, MessageCircle } from "lucide-react";
import { AI_HISTORY } from '@/config/constants.js'
import { addUserChat, addAiChat } from '@/store/aiSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import run from "@/backend/utils/ai.api";
import { SpinWheelLoader } from "../fragments/Loader";
import { toast } from "sonner";

const Chat = () => {
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
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <MessageCircle className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-poppins">
                        <div className="flex flex-row gap-1" >
                            <div className="text-md font-bold tracking-tight text-primary font-playfair hover:cursor-context-menu">
                                <span>Syntax</span>
                                <span className="text-muted-foreground">Space </span>
                            </div>
                            <span>ChatBot</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                {/* Chat Area */}
                <div className="bg-background rounded-lg border">
                    <ScrollArea className="h-[400px] p-4">
                        <div className="space-y-3">
                            {ai.map((msg, index) =>
                                msg.role === "user" ? (
                                    <InputMsg key={index} message={msg.parts[0].text} />
                                ) : (
                                    <ResMsg key={index} message={msg.parts[0].text} />
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
                        <Button onClick={handleSend} size="icon" disabled={loading}>
                            {loading ? <SpinWheelLoader /> : <Send className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Chat;
