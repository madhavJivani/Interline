import auth from '@/backend/appwrite.auth.js'
import service from '@/backend/appwrite.db.js';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { login as storeLogin, logout as storeLogout } from '@/store/userSlice.js'
import { setDocuments } from '@/store/documentSlice.js'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/custom/Pages/Home";
import Signup from "./components/custom/Pages/Signup";
import Login from "./components/custom/Pages/Login";
import Profile from './components/custom/Pages/Profile';
import CodeEditor from './components/custom/interface/Editor';
import Navbar from "./components/custom/elements/Navbar";
import Footer from "./components/custom/elements/Footer";
import { DotPingLoader } from '@/components/custom/fragments/Loader'

import { Toaster } from "@/components/ui/sonner"
import NotFound from './components/custom/Pages/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const curr = useSelector(state => state.documents.currentDoc)
  const [loading,setLoading] = useState(false);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const user = await auth.getUser();
        if (user) { 
          dispatch(storeLogin(user));
          const docs = await service.listDocument(user.$id);
          // console.log("DOCS : ", docs);
          if (docs.total === 0) {
            console.log("No documents found - new user");
            await service.createDefaultDocument({ userId: user.$id });
            const newDocs = await service.listDocument(user.$id);
            dispatch(setDocuments(newDocs.documents));
            console.log("DEFAULT DOC CREATED", newDocs);
          }
          else { 
            dispatch(setDocuments(docs.documents));
          }
        }
      } catch (error) {
        console.log("Error in fetchCurrentUser : ", error);
        await auth.logout();
        dispatch(storeLogout());
      }
      finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="mt-8 w-full min-h-screen">
        <>
          {loading ?
            <>
              
              <div className='min-h-screen flex justify-center items-center -translate-y-8 ' >
                <DotPingLoader />
              </div>

          </> :
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editor" element={
                  <>
                    <div className="flex flex-row justify-center">
                      <CodeEditor
                        defaultLanguage={curr ? curr.language : "javascript"}
                        defaultCode={curr ? curr.code : `console.log("Welcome to SyntaxSpace");`}
                      />
                    </div>
                  </>
                } />
                <Route path="*" element={<NotFound/>} />
              </Routes>
              <Toaster />
            </>
        }
        </>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
