import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from 'lucide-react';
import AiMsg from './AiMsg';
import UserMsg from './UserMsg';
import { useSelector, useDispatch } from 'react-redux';
import { addUserChat,addAiChat } from '@/store/aiSlice.js';
import run from '@/utils/ai.api.js'
import { AI_HISTORY } from '@/constants.js'
import { SpinWheelLoader, DotPingLoader } from '@/components/custom/elements/Loader'


const Chat = () => {
    const ai = useSelector(state => state.ai); // Get the chat data from Redux store
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [chatHistory, setChatHistory] = useState(AI_HISTORY);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        setLoading(true);
        if (inputValue.trim()) {
            // Dispatch new user message to Redux store
            dispatch(addUserChat(inputValue));
            setInputValue("");
            const { response, history } = await run(inputValue, chatHistory);
            dispatch(addAiChat(response))
            // console.log("history : ", history)
            setChatHistory(history);
            // console.log(chatHistory)
        }
        setLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="fixed bottom-4 right-4 text-center" size="circle">
                    <MessageCircle size={10} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%]">
                <DialogHeader>
                    <DialogTitle>AI Chat - Code Assistance</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh]">
                    {ai.map((msg, index) =>
                        msg.role === "user" ? (
                            <UserMsg key={index} text={msg.parts[0].text} />
                        ) : (
                            <AiMsg key={index} text={msg.parts[0].text} />
                        )
                    )}
                </ScrollArea>
                <div className="relative mt-4 border-t-2 border-secondary pt-2">
                    {loading && (
                        <div className="absolute bottom-14 right-0 text-sm text-gray-600 flex items-center gap-2">
                            <DotPingLoader /> Getting you best output...
                        </div>
                    )}
                    <div className="flex items-center">
                        <div className="mr-2">
                            <MessageCircle size={20} className="text-gray-500" />
                        </div>
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="w-[95%] mr-2"
                        />
                        <Button onClick={handleSendMessage} variant="outline" size="circle" disabled={loading}>
                            {loading ? <SpinWheelLoader /> : <Send size={16} />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Chat;
