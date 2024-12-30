import React from 'react'
import CodeEditor from '@/components/custom/CodeEditor'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/custom/elements/Navbar'
import Home from '@/components/custom/Home'
const App = () => {
  // console.log(import.meta.env.VITE_NAME);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-editor" element={<CodeEditor />} />
      </Routes>
    </Router>
  )
}

export default App