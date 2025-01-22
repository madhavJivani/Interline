import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun, Moon, Contrast } from "lucide-react"; // Import icons from Lucide

const ThemeSelect = ({ setTheme, theme }) => {
    return (
        <div className="mb-1">
            <Select onValueChange={(value) => setTheme(value)} defaultValue="vs-dark" >
                <SelectTrigger className="w-[13rem]">
                    <SelectValue placeholder={theme} />
                </SelectTrigger>
                <SelectContent className="w-[13rem]">
                    <SelectItem value="vs">
                        <div className="flex flex-row justify-start align-middle">
                            <Sun className="mr-2 h-4 w-4 text-muted-foreground" /> VS Light
                        </div>
                    </SelectItem>
                    <SelectItem value="vs-dark">
                        <div className="flex flex-row justify-start align-middle" >
                            <Moon className="mr-2 h-4 w-4 text-muted-foreground" /> VS Dark
                        </div>
                    </SelectItem>
                    <SelectItem value="hc-black">
                        <div className="flex flex-row justify-start align-middle">
                            <Contrast className="mr-2 h-4 w-4 text-muted-foreground" /> High Contrast Black
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ThemeSelect;
