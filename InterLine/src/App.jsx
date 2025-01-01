import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CodeEditor from '@/components/custom/CodeEditor'
import Navbar from './components/custom/elements/Navbar'
import Home from '@/components/custom/Home'
import Signup from '@/components/custom/Signup'
import Login from '@/components/custom/Login'
// import IDE from '@/components/custom/elements/themes/Editor.jsx'
const App = () => {
  // console.log(import.meta.env.VITE_NAME);
  return (
    <div className='min-w-[620px]'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/test" element={<IDE />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App