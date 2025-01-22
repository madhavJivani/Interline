import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Code, Terminal, Globe, Cpu, Gamepad2, Server } from "lucide-react";
import { LANGUAGES_DETAILS } from "@/config/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const LanguageSelect = ({ setLanguage, language, setCode }) => {
    const {docs,currentDoc } = useSelector(state => state.documents)
    const handleLanguageChange = (value) => {
        if (docs.length > 0) {
            if (currentDoc.language === value) {
                setLanguage(value);
            }
            else {
                toast.error("Language mismatch, Create a new file to work with other language")
            }
        }
        else { 
            setLanguage(value);
            setCode(LANGUAGES_DETAILS[value][1]);
        }
    };
    return (
        <div className="mb-1">
            <Select
                onValueChange={(value) => handleLanguageChange(value)}
                defaultValue="javascript"
                value={language}
            >
                <SelectTrigger className="w-[13rem]">
                    <div className="flex flex-row items-center">
                        <SelectValue placeholder={language} />
                    </div>
                </SelectTrigger>
                <SelectContent className="w-[13rem]">
                    {/* Web Development Languages */}
                    <SelectGroup>
                        <SelectLabel>Web Development Languages</SelectLabel>
                        <SelectItem value="javascript">
                            <div className="flex flex-row items-center">
                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> JavaScript
                            </div>
                        </SelectItem>
                        <SelectItem value="typescript">
                            <div className="flex flex-row items-center">
                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> TypeScript
                            </div>
                        </SelectItem>
                        <SelectItem value="php">
                            <div className="flex flex-row items-center">
                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> PHP
                            </div>
                        </SelectItem>
                    </SelectGroup>

                    {/* Game Development Languages */}
                    <SelectGroup>
                        <SelectLabel>Game Development Languages</SelectLabel>
                        <SelectItem value="csharp">
                            <div className="flex flex-row items-center">
                                <Gamepad2 className="mr-2 h-4 w-4 text-muted-foreground" /> C#
                            </div>
                        </SelectItem>
                        <SelectItem value="lua">
                            <div className="flex flex-row items-center">
                                <Gamepad2 className="mr-2 h-4 w-4 text-muted-foreground" /> Lua
                            </div>
                        </SelectItem>
                    </SelectGroup>

                    {/* Systems Programming Languages */}
                    <SelectGroup>
                        <SelectLabel>Systems Programming Languages</SelectLabel>
                        <SelectItem value="c">
                            <div className="flex flex-row items-center">
                                <Cpu className="mr-2 h-4 w-4 text-muted-foreground" /> C
                            </div>
                        </SelectItem>
                        <SelectItem value="cpp">
                            <div className="flex flex-row items-center">
                                <Cpu className="mr-2 h-4 w-4 text-muted-foreground" /> C++
                            </div>
                        </SelectItem>
                    </SelectGroup>

                    {/* Server-side Programming Languages */}
                    <SelectGroup>
                        <SelectLabel>Server-side Programming Languages</SelectLabel>
                        <SelectItem value="java">
                            <div className="flex flex-row items-center">
                                <Code className="mr-2 h-4 w-4 text-muted-foreground" /> Java
                            </div>
                        </SelectItem>
                        <SelectItem value="python">
                            <div className="flex flex-row items-center">
                                <Code className="mr-2 h-4 w-4 text-muted-foreground" /> Python
                            </div>
                        </SelectItem>
                        <SelectItem value="ruby">
                            <div className="flex flex-row items-center">
                                <Code className="mr-2 h-4 w-4 text-muted-foreground" /> Ruby
                            </div>
                        </SelectItem>
                        <SelectItem value="fsharp">
                            <div className="flex flex-row items-center">
                                <Server className="mr-2 h-4 w-4 text-muted-foreground" /> F#
                            </div>
                        </SelectItem>
                        <SelectItem value="powershell">
                            <div className="flex flex-row items-center">
                                <Terminal className="mr-2 h-4 w-4 text-muted-foreground" /> PowerShell
                            </div>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelect;
