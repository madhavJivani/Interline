import React from "react";
import { LANGUAGE_ICONS, extensions, HoverCardInfo } from "@/config/constants.js";
import { InfoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSelector } from "react-redux";

const FileSystem = ({ language, fileName = "" }) => {
    // const { docs, currentDoc } = useSelector(state => state.documents)   
    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link" className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={LANGUAGE_ICONS[language]} />
                            <AvatarFallback>
                                {extensions[language]?.toUpperCase() || "?"}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-base font-dmSans text-foreground">
                            {fileName || "syntaxspace"}
                            {extensions[language] && `.${extensions[language]}`}
                        </span>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-96 p-4 rounded-xl shadow-md bg-muted font-dmSerif">
                    <div className="flex space-x-4 font-source ">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={LANGUAGE_ICONS[language]} />
                            <AvatarFallback>
                                {extensions[language]?.toUpperCase() || "?"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 text-foreground">
                            <h4 className="text-lg font-semibold">{HoverCardInfo[language]?.title || "Unknown Language"}</h4>
                            <p className="text-sm text-muted-foreground">
                                {HoverCardInfo[language]?.description || "No description available."}
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                <InfoIcon className="h-4 w-4 text-primary" />
                                <span className="text-xs text-muted-foreground">
                                    {HoverCardInfo[language]?.meta?.details || "Details unavailable"}
                                </span>
                            </div>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </>
    );
};

export default FileSystem;
