import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from '@/store/userSlice.js'
import auth from '@/appwrite/appwrite.auth.js'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SpinWheelLoader } from '@/components/custom/elements/Loader'
import { useToast } from "@/hooks/use-toast"
import { Mail, Eye, EyeOff } from "lucide-react";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const loginHandler = async () => {
        if (!email || !password) {
            toast({
                desciption: "Email and Password are required!",
                status: "error"
            })
            return;
        }
        setLoading(true);
        console.table({ email, password });
        const res = await auth.login({ email, password });
        if (res) {
            // console.log("Login Successful:", res);
            toast({
                description: "Login Successful",
                status: "success"
            })
            const user = await auth.getUser();
            toast({
                description: `Welcome ${user.name}`,
                status: "success"
            })
            dispatch(loginUser(user));
            // console.log("User Details:", user);
            navigate("/");
        }
        setLoading(false);
    };

    const googleLoginHandler = async () => { 
        setLoading(true);
        const res = await auth.OAuth();
        console.log("res", res);
        const user = await auth.getUser();
        console.log("Google user => ", user);
        dispatch(loginUser(user));  
        setLoading(false);
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold  border-b-2 pb-1">Welcome Back!</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Log in to your account to continue exploring Interline.
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        <Button className="w-full"
                            onClick={loginHandler}
                            disabled={loading}
                    >
                        { 
                            loading ? (<div className="flex items-center justify-center mx-auto">
                                <SpinWheelLoader />
                            </div>) : "Log In"
                        }
                        </Button>
                    <Button
                            onClick={googleLoginHandler}
                            disabled={loading}
                        className="w-full relative justify-start items-center" 
                    >
                        <Avatar className="absolute left-2 h-6 w-6">
                            <AvatarImage src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWg7X0YYzUCU5m8BA_sH_ti92q4X0lCz5h_w&s"} alt="Google Logo" />
                            <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                        {
                            loading ? (<div className="flex items-center justify-center mx-auto">
                                <SpinWheelLoader />
                            </div>) : (<span className="mx-auto">Sign in with Google</span>)
                        }
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
