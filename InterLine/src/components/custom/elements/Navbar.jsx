import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogIn, LogOut, UserPlus, Moon, Sun, Braces } from 'lucide-react';
import { logo_light, logo_dark } from '@/constants.js';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/themeSlice.js';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/store/userSlice.js';
import { useToast } from "@/hooks/use-toast"
import auth from '@/appwrite/appwrite.auth.js'

const Navbar = () => {
    const { toast } = useToast();
    const { theme } = useSelector((state) => state.theme);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await auth.logout();
        console.log("User logged out");
        // console.log(logoutRes);
        dispatch(logoutUser());
        navigate("/");
        toast({
            description: "Logged out successfully",
            status: "success"
        });
    }

    return (
        <nav className="flex justify-between items-center p-4 shadow-sm dark:shadow-primary shadow-muted-foreground min-w-[620px]"> 
            <div className="flex items-center mr-5 hover:cursor-context-menu"> {/* Main container for logo and links */}
                <div className="flex items-center space-x-4 mr-8"> {/* Added margin-right */}
                    <img
                        src={theme === "dark" ? logo_light : logo_dark}
                        alt="Interline Logo"
                        className="w-12 h-12 rounded-full"
                    />
                    <h1 className="text-xl font-semibold font-mono">Interline</h1>
                </div>
                <div className="flex space-x-6"> {/* Links container */}
                    <Link to="/" className="text-sm font-medium flex items-center space-x-1 hover:text-primary">
                        <User size={16} />
                        <span>Home</span>
                    </Link>
                    <Link to="/code-editor" className="text-sm font-medium flex items-center space-x-1 hover:text-primary">
                        <Braces size={16} />
                        <span>CodeEditor</span>
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-6 mr-2">
                <Button
                    variant="secondary"
                    size="circleIcon"
                    onClick={() => {
                        dispatch(toggleTheme());
                    }}
                >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
                {user.status === "loggedOut" &&
                    (<>
                    <Button size="md" className="text-sm font-medium" onClick={ ()=> (navigate("/signup"))} >
                        {<UserPlus size={16} />}SignUp
                    </Button>
                    <Button size="md" className="text-sm font-medium" onClick={() => (navigate("/login"))}>
                        {<LogIn size={16} />}Login
                    </Button>
                </>)}
                {user.status === "loggedIn" &&
                    (<>
                    <Button variant="link" size="md" className="text-sm font-medium"
                        onClick={logoutHandler}
                    >
                        {<LogOut size={16} />}Logout
                    </Button>
                    <Button variant="outline" size="circleIcon" className="text-sm font-medium" onClick={() => (navigate("/profile"))}>
                        <User size="20" />
                    </Button>
                </>)}
            </div>
        </nav>
    );
};

export default Navbar;