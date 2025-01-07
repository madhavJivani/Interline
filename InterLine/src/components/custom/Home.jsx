import React from 'react'
import Chat from '@/components/custom/elements/Chat/Chat'
import Init from '@/components/custom/elements/Code/Init'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to InterLine!</p>
      <Init />
      <Chat />
    </div>
  )
}

export default Home