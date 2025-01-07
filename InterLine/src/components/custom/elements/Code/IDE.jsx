import React from 'react'
import FileList from './FileList'
import CodeEditor from '../../CodeEditor'
import Options from '../Options'

const IDE = () => {
  return (
      <div>
          <div className='flex flex-row justify-between mx-4 my-2 mb-6' >
                  <FileList />
                  <Options />
          </div>
          <CodeEditor />
    </div>
  )
}

export default IDE