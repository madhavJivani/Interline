import React, { useState } from 'react';
import auth from '@/backend/appwrite.auth.js';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { SpinWheelLoader } from '../fragments/Loader';
import { Button } from '@/components/ui/button';
import { Sun, Moon, User, LogOut, LogIn, MailPlus, Codesandbox, House } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout as storeLogout } from '@/store/userSlice.js'
import { toggleTheme } from '@/store/themeSlice.js';
import { eraseDocuments } from '@/store/documentSlice.js'
import { toast } from 'sonner';

const Navbar = () => {
    const theme = useSelector((state) => state.theme.theme);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        toast(`Logging you out ${user.user.name}`, {
            description: "You are being logged out of your account, please wait...",
        })
        await auth.logout();
        dispatch(storeLogout());
        dispatch(eraseDocuments());
        navigate('/');
        setLoading(false);
        toast(`You have been logged out successfully !!`, {
            description: "Logged out accidentally? You can always login back.",
            action: {
                label: "Login",
                onClick: () => navigate('/login'),
            }
        })
    };

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border min-h-[10vh] ">
            <div className="mx-auto flex items-center justify-between px-12 py-3 max-w-screen-lg min-h-[10vh]">
                {/* Left: Logo */}
                <div className="text-3xl font-bold tracking-tight text-primary font-playfair hover:cursor-context-menu w-1/3 flex items-center">
                    <span>Syntax</span>
                    <span className="text-muted-foreground">Space</span>
                </div>

                {/* Middle: Navigation Links */}
                <nav className="flex space-x-8 text-sm font-medium font-source w-1/3 flex-row justify-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                            }`
                        }
                    >
                        <House className="h-5 w-5" />
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/editor"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                            }`
                        }
                    >
                        <Codesandbox className="h-5 w-5" />
                        <span>Code-Editor</span>
                    </NavLink>
                </nav>


                {/* Right: Theme Toggle, Auth Buttons */}
                <div className="flex items-center space-x-4 w-1/3 flex-row justify-end">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === 'light' ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>

                    {/* Auth Buttons */}
                    {user.status === 'loggedOut' ? (
                        <>
                            <NavLink to="/login">
                                <Button variant="outline" className="px-4 font-poppins flex items-center space-x-1">
                                    <LogIn />
                                    Login
                                </Button>
                            </NavLink>
                            <NavLink to="/signup">
                                <Button className="px-4 font-poppins flex items-center space-x-1">
                                    <MailPlus />
                                    Signup</Button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/profile">
                                <Button variant="ghost" className="px-4 font-poppins flex items-center space-x-1" disabled={loading}>
                                    <User className="h-4 w-4" />
                                    <span>Profile</span>
                                </Button>
                            </NavLink>
                            <Button
                                variant="outline"
                                className="px-4 font-poppins flex items-center space-x-1"
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                {loading ? <SpinWheelLoader /> : <>
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </>}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
