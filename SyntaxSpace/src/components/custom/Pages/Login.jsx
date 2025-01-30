import React, { useState,useEffect,useRef } from 'react';
import auth from '@/backend/appwrite.auth.js'
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '@/store/userSlice.js'
import { useNavigate } from 'react-router-dom';
import { setDocuments } from '@/store/documentSlice.js'
import service from '@/backend/appwrite.db.js';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SpinWheelLoader } from '../fragments/Loader';
import { Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from "sonner"
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: 'smooth', // For smooth scrolling
                block: 'center' // To align the top of the element to the top of the viewport
            });
        }
    }, []);

    const hanleLogin = async () => {
        if (!email || !password) {
            toast.warning('Please fill all the fields');
            return;
        }

        setLoading1(true);
        try {
            const res = await auth.login({ email, password });
            // console.log(res)
            if (res) {
                const user = await auth.getUser();
                // console.log(user);
                dispatch(storeLogin(user));
                const docs = await service.listDocument(user.$id);
                // console.log(docs);
                dispatch(setDocuments(docs.documents));
                navigate('/');
                toast(`Welcome ${user.name}` , {
                    description: "You have successfully logged in",
                    action: {
                        label: "View Profile",
                        onClick: () => navigate('/profile'),
                    },
                })
            } else {
                toast(`Invalid Credentials`, {
                    description: "You have entered incorrect email or password please check and try again.",
                    action: {
                        label: "Sign Up",
                        onClick: () => navigate('/signup'),
                    },
                })
            }
        } catch (error) {
            console.log('Error in login : ', error);
            toast(`Some error occured`, {
                description: "We are unable to log you in, due to some server issue",
            })
        }
        finally {
            setLoading1(false);
        }
    };

    const handleGoogleOAuth = async () => {
        setLoading2(true);
        try {
            await auth.OAuth();
        } catch (error) {
            console.log('MOST LIKELY TO ENDUP HERE IN OAUTH ERROR SECTION - THIS IS EXPECTED BEHAVIOUR : ');
            console.log('Error in login : ', error);
        }
        finally {
            setLoading2(false);
        }
        const user = await auth.getUser();
        console.log(user);
    };

    useGlobalKeybinding('enter', hanleLogin);
    
    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <Card className="w-full max-w-lg p-6 shadow-lg border border-border bg-card" ref={cardRef} >
                <CardHeader className="space-y-1 text-center hover:cursor-context-menu ">
                    <CardTitle className="text-2xl font-bold font-playfair text-primary">
                        Welcome Back to <span>Syntax</span><span className="text-muted-foreground">Space</span>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Please log in to continue
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                <CardContent>
                    {/* Email */}
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1 mt-4">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <EyeOff
                                    className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button className="w-full mt-6 font-poppins" onClick={hanleLogin} disabled={loading1 || loading2} >
                        {loading1 ? <SpinWheelLoader /> :
                            <>
                                <LogIn className="mr-2 w-4 h-4" />
                                Log In
                            </>}
                    </Button>

                    {/* Separator */}
                    <Separator className="my-6" />

                    {/* Google OAuth Button */}
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center font-poppins space-x-2 py-3"
                        onClick={handleGoogleOAuth}
                        disabled={loading1 || loading2}
                    >
                        {loading2 ? <SpinWheelLoader /> :
                            <>
                                <div className="bg-white p-1 rounded-full shadow-sm">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jsjkG08rq1TWf5GSSpxc2zmDYU9BmNa7Zg&s"
                                        alt="Google"
                                        className="w-5 h-5"
                                    />
                                </div>
                                <span>Continue with Google</span>
                            </>}
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-center text-muted-foreground">
                    <div className="text-center text-muted-foreground">
                        Don't have an account? <span className="text-primary hover:underline cursor-pointer" onClick={() => navigate('/signup')}> Sign Up</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
