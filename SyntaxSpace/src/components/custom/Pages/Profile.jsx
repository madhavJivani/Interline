import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {Mail,Smartphone,Verified,XCircle,FileText,Info,Code,Key,Clock,RefreshCw,User,Calendar,Tag,} from "lucide-react";
import { extensions, LANGUAGE_ICONS, LANGUAGES_DETAILS } from "@/config/constants";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const documents = useSelector((state) => state.documents.docs);

    const avatarUrl = `https://ui-avatars.com/api/?name=${user?.name || "User"}`;

    return (
        <div className="mx-auto px-6 py-6 max-w-screen-lg space-y-6 font-source">
            {/* User Profile Card */}
            <Card className="w-full shadow-lg">
                <CardHeader className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar */}
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>

                    {/* Name and Email */}
                    <div>
                        <h1 className="text-2xl font-playfair font-semibold text-primary">
                            {user?.name || "User Name"}
                        </h1>
                        <p className="text-sm text-muted-foreground flex items-center space-x-1 justify-center gap-1">
                            <Mail className="w-4 h-4" />
                            {user?.email || "No Email Provided"}
                        </p>
                    </div>

                    {/* Badges for Verifications */}
                    <div className="flex space-x-2">
                        {user?.emailVerification ? (
                            <Badge variant="outline" className="flex items-center space-x-1">
                                <Verified className="w-4 h-4 text-green-500" />
                                <span>Email Verified</span>
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="flex items-center space-x-1">
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span>Email Not Verified</span>
                            </Badge>
                        )}

                        {user?.phone ? (
                            <Badge variant="outline" className="flex items-center space-x-1">
                                <Smartphone className="w-4 h-4 text-blue-500" />
                                <span>Phone Added</span>
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="flex items-center space-x-1">
                                <Smartphone className="w-4 h-4 text-gray-500" />
                                <span>No Phone</span>
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                {/* Additional User Information */}
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-muted-foreground" />
                        <p>Password Updated: {user?.passwordUpdate ? new Date(user?.passwordUpdate).toLocaleDateString() : "Never Updated"}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p>Registration: {new Date(user?.registration).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <p>User ID: {user?.$id}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Documents List */}
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <h2 className="text-lg font-source font-semibold text-primary">
                        Uploaded Documents 
                        <span className="font-sans text-sm text-muted-foreground" > ({documents.length})</span>
                    </h2>
                </CardHeader>
                <ScrollArea className="h-[60vh]">
                    <CardContent>
                        {documents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                {documents.map((doc) => (
                                    <Tabs
                                        key={doc.$id}
                                        defaultValue="fileInfo"
                                        className="border rounded-lg shadow-sm bg-muted/10 p-4"
                                    >
                                        <TabsList className="flex">
                                            <TabsTrigger value="fileInfo" className="flex items-center w-1/2">
                                                <FileText className="w-4 h-4 mr-1" />
                                                File Info
                                            </TabsTrigger>
                                            <TabsTrigger value="otherInfo"  className="flex items-center w-1/2 "> 
                                                <Info className="w-4 h-4 mr-1" />
                                                Other Details
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* File Info Tab */}
                                        <TabsContent value="fileInfo" className="mt-4">
                                            <div className="flex flex-col items-start space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    
                                                    <Avatar className="h-5 w-5">
                                                        <AvatarImage src={LANGUAGE_ICONS[doc.language]} alt={doc.language} />
                                                        <AvatarFallback>{doc.language}</AvatarFallback>
                                                    </Avatar>
                                                    <p>
                                                        <strong>File Name:</strong> {doc.fileName}.{extensions[doc.language] || "txt"}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Tag className="w-4 h-4 text-muted-foreground" />
                                                    <p>
                                                        <strong>Version:</strong> {LANGUAGES_DETAILS[doc.language][0]}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2 flex-row ">
                                                    <Key className="w-4 h-4 text-muted-foreground" />
                                                    <p className="flex flex-row align-bottom gap-2" >
                                                        <strong>File ID:</strong> 
                                                        <Badge variant="outline" className="flex items-center space-x-1">
                                                            {doc.$id}
                                                        </Badge>
                                                    </p>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        {/* Other Details Tab */}
                                        <TabsContent value="otherInfo" className="mt-4">
                                            <div className="flex flex-col items-start space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    <p>
                                                        <strong>Created At:</strong> {new Date(doc.$createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                                                    <p>
                                                        <strong>Updated At:</strong> {new Date(doc.$updatedAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                        )}
                    </CardContent>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </Card>
        </div>
    );
};

export default Profile;
