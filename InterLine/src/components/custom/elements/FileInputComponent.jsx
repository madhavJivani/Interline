import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"

const FileInputComponent = ({ setCode }) => {
    const fileInputRef = React.useRef(null);

    const allowedExtensions = [".ts", ".js", ".php",".cs", ".cpp", ".cxx", ".cc", ".h", ".hpp", ".java", ".fs", ".fsi", ".fsx",".lua", ".ps1", ".psm1", ".psd1", ".psc1", ".pssc", ".py", ".pyw", ".rb", ".txt"];

    const handleFileChange = (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            const file = files[0];
            const fileName = file.name.toLowerCase();
            const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

            if (hasValidExtension) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const fileContent = event.target.result;
                    // console.log("File Content:", fileContent);
                    setCode(fileContent);
                };

                reader.onerror = (error) => {
                    console.error("Error reading file:", error);
                };

                reader.readAsText(file);
            } else {
                console.log("Only files with these extensions are allowed:", allowedExtensions.join(", "));
            }
        } else {
            console.log("No file selected");
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            <AlertDialog> 
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="lg"
                        className=" text-balance text-sm px-2"
                    >
                        <Upload size={24} /> Upload File
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-primary text-center text-xl mb-2 border-b-2 border-secondary-foreground pb-2" ><strong>Caution: Code Reset on Language Change</strong></AlertDialogTitle>
                        <AlertDialogDescription className="text-foreground">
                            Changing the selected programming language will <b>erase</b> any code currently in the editor, including uploaded files. Please ensure the correct language is selected <b>before</b> uploading.
                            <div className="text-primary font-serif mt-2 text-sm">
                                (To change the language after upload, copy your code to avoid losing it.)
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClick} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
};

export default FileInputComponent;