import React from 'react'
import CodeEditor from '@/components/custom/CodeEditor'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/custom/elements/Navbar'
import Home from '@/components/custom/Home'
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
          {/* <Route path="/test" element={<IDE />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App