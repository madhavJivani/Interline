import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 font-dmSans -mt-16">
            <AlertCircle className="w-16 h-16 text-muted-foreground" />
            <p className="text-4xl font-bold">404 - Page Not Found</p>
            <p className="text-muted-foreground text-lg max-w-lg">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
                <Link to="/">Go Back Home</Link>
            </Button>
        </div>
    );
};

export default NotFound;
