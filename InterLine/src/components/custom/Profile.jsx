import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Check, X, Phone, Calendar } from "lucide-react";

const Profile = () => {
    const {user} = useSelector((state) => state.user);

    // Format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        // <div className="flex justify-center items-center min-h-screen bg-muted">
        <div className="flex justify-center items-center h-[100vh]">
            <Card className="w-full max-w-lg shadow-lg">
                {/* Header */}
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b p-6 space-y-4 sm:space-y-0">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`} />
                            <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold text-primary">{user.name || "Unknown User"}</h2>
                            <p className="text-sm text-muted-foreground">{user.email || "No Email Provided"}</p>
                        </div>
                    </div>

                    {/* Badge Section */}
                    <div className="flex justify-end sm:justify-start">
                        <Badge variant={user.status ? "success" : "destructive"}>
                            {user.status ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </CardHeader>


                {/* Content */}
                <CardContent className="space-y-4 p-6">
                    {/* Email */}
                    <div className="flex items-center space-x-2">
                        <Mail className="text-primary" size={18} />
                        <p className="text-sm">
                            <strong>Email:</strong> {user.email || "Not Provided"}
                        </p>
                    </div>

                    {/* Email Verification */}
                    <div className="flex items-center space-x-2">
                        {user.emailVerification ? (
                            <Check className="text-green-500" size={18} />
                        ) : (
                            <X className="text-red-500" size={18} />
                        )}
                        <p className="text-sm">
                            <strong>Email Verified:</strong>{" "}
                            {user.emailVerification ? "Yes" : "No"}
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-2">
                        <Phone className="text-primary" size={18} />
                        <p className="text-sm">
                            <strong>Phone:</strong> {user.phone || "Not Provided"}
                        </p>
                    </div>

                    {/* Account Creation */}
                    <div className="flex items-center space-x-2">
                        <Calendar className="text-primary" size={18} />
                        <p className="text-sm">
                            <strong>Account Created:</strong> {formatDateTime(user.$createdAt)}
                        </p>
                    </div>

                    {/* Last Accessed */}
                    <div className="flex items-center space-x-2">
                        <Calendar className="text-primary" size={18} />
                        <p className="text-sm">
                            <strong>Last Accessed:</strong> {formatDateTime(user.accessedAt)}
                        </p>
                    </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex justify-end space-x-2 p-6">
                    <Badge variant="outline">User ID: {user.$id}</Badge>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Profile;
