import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "@/appwrite/configuration";
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = async () => { 
        console.table({ firstName, lastName, email, password });
        setPassword("");

        try {
            const res = await account.create(ID.unique(), email, password, `${firstName.trim()} ${lastName.trim()}`);
            console.log(res);
            if (res.status) {
                toast({
                    description: "Account created successfully",
                    status: "success"
                });
                navigate("/login");
            }
            else { 
                toast({
                    description: "Account creation failed",
                    status: "error"
                });
            }

        } catch (error) {
            console.error("Signup failed", error.message || error);
            toast({
                description: `Some error occured , please try again later`,
                status: "error"
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold border-b-2 pb-1">Welcome to Interline!</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create an account to start coding effortlessly.
                        <br />
                        Enjoy a whole bunch of premium features.
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* First Name */}
                    <div className="space-y-1">
                        <Label htmlFor="first_name">First Name</Label>
                        <div className="relative">
                            <Input id="first_name" type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                        <Label htmlFor="last_name">Last Name</Label>
                        <div className="relative">
                            <Input id="last_name" type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input id="email" type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <EyeOff
                                    className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-4">
                    <Button className="w-full" onClick={signupHandler} >Submit</Button>
                    <p className="text-sm text-muted-foreground">
                        Already have an account? <Link to="/login" className="text-primary">Login</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
