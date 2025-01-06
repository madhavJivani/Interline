import React from 'react';
import { Speech } from 'lucide-react'; // Speech icon from lucide-react
import { Card } from "@/components/ui/card";

const UserMsg = ({ text }) => {
    return (
        <div className="flex justify-end mb-2 mr-2">
            <Card className="w-[70%] p-2 bg-primary text-white">
                {text}
            </Card>
            <div className="flex items-center ml-1">
                <Speech className="text-secondary-foreground -scale-x-100" />
            </div>
        </div>
    );
};

export default UserMsg;
