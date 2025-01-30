import React, { useEffect, useRef, useState } from 'react';
import auth from '@/backend/appwrite.auth.js'
import service from '@/backend/appwrite.db';
import { useNavigate } from 'react-router-dom';
// import { useHotkeys } from "react-hotkeys-hook";
import { SpinWheelLoader } from '../fragments/Loader';
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '@/store/userSlice';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Mail, MailPlus, Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";
import { setDocuments } from '@/store/documentSlice';
import useGlobalKeybinding from '@/config/hooks/useGlobalKeybinding';

const Signup = () => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
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

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.warning('Please fill all the fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.warning('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await auth.signup({ email, password, firstName, lastName });
            console.log(res)
            if (res.status) {
                toast(`Hello ${firstName} ${lastName}`, {
                    description: "You have successfully registered",
                })
                const login = await auth.login({ email, password });
                const user = await auth.getUser();
                dispatch(storeLogin(user));
                // console.log(user)
                const newDoc = await service.createDefaultDocument({ userId: user.$id })
                // console.log(newDoc)
                const getDocs = await service.listDocument(user.$id)
                // console.log(getDocs)
                dispatch(setDocuments(getDocs.documents))
                navigate('/');
            } else {
                // alert(res.error);
                toast(`Hello ${firstName} ${lastName}`, {
                    description: res.error,
                    action: {
                    },
                })
            }
        } catch (error) {
            console.log('Error in signup : ', error);
            alert('Signup failed');
        }
        finally {
            setLoading(false);
        }
    }

    useGlobalKeybinding('enter', handleSignUp);

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <Card className="w-full max-w-lg p-6 shadow-lg border border-border bg-card" ref={cardRef}>
                <CardHeader className="space-y-1 text-center hover:cursor-context-menu ">
                    <CardTitle className="text-2xl font-bold font-playfair text-primary">
                        Welcome to <span>Syntax</span><span className="text-muted-foreground">Space</span>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Create your account and start exploring!
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                <CardContent>
                    {/* First Name */}
                    <div className="space-y-1">
                        <Label htmlFor="first-name">First Name</Label>
                        <div className="relative">
                            <Input
                                id="first-name"
                                type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1 mt-4">
                        <Label htmlFor="last-name">Last Name</Label>
                        <div className="relative">
                            <Input
                                id="last-name"
                                type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 mt-4">
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
                                placeholder="Create your password"
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

                    {/* Confirm Password */}
                    <div className="space-y-1 mt-4">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {showConfirmPassword ? (
                                <EyeOff
                                    className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            )}
                        </div>
                    </div>
                    {/* Sign Up Button */}
                    <Button className="w-full mt-6 font-poppins" onClick={handleSignUp} disabled={loading}
                    >
                        {
                            loading ? <SpinWheelLoader /> :
                                <>
                                    <MailPlus className="mr-2 w-4 h-4" />
                                    Sign Up
                                </>}
                    </Button>
                </CardContent>
                <CardFooter>
                    <div className="text-center text-muted-foreground">
                        Already have an account Or want to continue with Google? <span className="text-primary hover:underline cursor-pointer" onClick={() => navigate('/login')}> Log In</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
