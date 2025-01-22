import React, { useState } from 'react';
import { Download as DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { extensions } from '@/config/constants';
import { SpinWheelLoader } from '@/components/custom/fragments/Loader';
import { toast } from 'sonner';
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding';


const Download = ({ code, language }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        try {
            setLoading(true);
            const fileName = `syntaxspace_${Date.now()}.${extensions[language] || 'txt'}`;
            const blob = new Blob([code], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();

            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error during download:", error);
            toast("Download Failed !!", {
                description: "An error occurred while downloading the file. Please try again later.",
            })
        } finally {
            setLoading(false);
        }
    };

    useGlobalKeybinding("ctrl+q", handleDownload)

    return (
        <Button
            onClick={handleDownload}
            disabled={loading}
            variant="outline"
            size="icon"
            className="flex items-center gap-2 mb-1"
        >
            {loading ? <SpinWheelLoader /> : <DownloadIcon size={20} />}
        </Button>
    );
};

export default Download;
