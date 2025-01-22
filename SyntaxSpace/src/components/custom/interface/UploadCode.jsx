import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpinWheelLoader } from '@/components/custom/fragments/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setNewCode } from '@/store/documentSlice';
import { toast } from 'sonner';
import { reverseExtensions } from '@/config/constants.js'
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding'

const UploadCode = ({ setCode, setLanguage }) => {
    const [loading, setLoading] = useState(false);
    const { docs, currentDoc } = useSelector((state) => state.documents);
    const dispatch = useDispatch();

    const handleUpload = () => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt,.js,.ts,.php,.py,.rb,.cpp,.java,.c,.cs,.fs,.lua';
            input.onchange = async (event) => {
                const file = event.target.files[0];
                // console.log(file);
                if (file) {
                    setLoading(true);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        // Get file extension
                        const fileExtension = file.name.split('.').pop().toLowerCase();
                        // console.log(fileExtension);
                        const language = reverseExtensions[fileExtension];
                        if (docs.length > 0) { 
                            // console.log(currentDoc.language);
                            // console.log(language);
                            if (currentDoc.language !== language) {
                                console.log("DONT UPLOAD");
                                toast.error('Language mismatch. Please upload a file with the same language as the current document.');
                            }
                            else {
                                // console.log("UPLOAD");
                                // Set the language if it's found
                                if (language) {
                                    setLanguage(language);
                                    setCode(e.target.result);
                                    if (docs.length > 0) {
                                        dispatch(setNewCode({ code: e.target.result, language }));
                                    }
                                } else {
                                    toast.error('Unsupported file type');
                                }
                                toast.success('Code uploaded successfully!');
                            }
                        }
                        else {
                            // Set the language if it's found
                            if (language) {
                                setLanguage(language);
                                setCode(e.target.result);
                                if (docs.length > 0) {
                                    dispatch(setNewCode({ code: e.target.result, language }));
                                }
                            } else {
                                toast.error('Unsupported file type');
                            }
                            toast.success('Code uploaded successfully!');
                        }
                    };
                    reader.onerror = () => {
                        toast.error('Failed to read the file. Please try again.');
                    };
                    reader.onloadend = () => {
                        setLoading(false);
                    };
                    reader.readAsText(file); // Read the file content as text
                } else {
                    toast.error('No file selected.');
                }
            };

            // Trigger the file input dialog
            input.click();
        } catch (error) {
            console.error('Error during upload:', error);
            toast.error('Upload Failed!', {
                description: 'An error occurred while uploading the file. Please try again later.',
            });
            setLoading(false);
        }
    };

    useGlobalKeybinding("ctrl+o", handleUpload)

    return (
        <Button
            onClick={handleUpload}
            disabled={loading}
            variant="outline"
            size="icon"
            className="flex items-center gap-2 mb-1"
        >
            {loading ? <SpinWheelLoader /> : <UploadIcon size={20} />}
        </Button>
    );
};

export default UploadCode;
