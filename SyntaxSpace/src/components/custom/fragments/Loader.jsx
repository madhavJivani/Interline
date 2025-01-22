export const DotPingLoader = () => {
    return (
        <div className="flex items-center justify-center space-x-1">
            <span className="h-1.5 w-1.5 bg-primary rounded-full animate-ping"></span>
            <span className="h-1.5 w-1.5 bg-primary rounded-full animate-ping delay-150"></span>
            <span className="h-1.5 w-1.5 bg-primary rounded-full animate-ping delay-300"></span>
        </div>
    );
};

export const SpinWheelLoader = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-4 w-4 border-2 border-t-primary border-muted rounded-full animate-spin"></div>
        </div>
    );
};