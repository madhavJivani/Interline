import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/userSlice.js";
import auth from '@/appwrite/appwrite.auth.js'

import { ScrollArea } from "@/components/ui/scroll-area";
import CodeEditor from "@/components/custom/CodeEditor";
import Navbar from "./components/custom/elements/Navbar";
import Home from "@/components/custom/Home";
import Signup from "@/components/custom/Signup";
import Login from "@/components/custom/Login";
import Profile from "@/components/custom/Profile";
import Footer from "./components/custom/elements/Footer";
import { DotPingLoader } from "@/components/custom/elements/Loader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await auth.getUser();
        if (user) { 
          dispatch(loginUser(user));
        }
        // console.log("User Details:", user);
        
      } catch (error) {
        console.error("Fetching Profile failed:", error.message || error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <DotPingLoader />
    </div>
  ) : (
    <ScrollArea className="h-screen w-screen">
      <div className="min-w-[620px]">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code-editor" element={<CodeEditor />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/test"
              element={
                <div className="flex items-center justify-center h-screen">
                  <DotPingLoader />
                </div>
              }
            />
            </Routes>
          <Footer />
          <Toaster />
        </Router>
      </div>
    </ScrollArea>
  );
};

export default App;
