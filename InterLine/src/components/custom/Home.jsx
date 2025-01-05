import React from 'react'
import service from '@/appwrite/appwrite.db.js'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector(state => state.user)
  const handleClick = async () => { 
    // ------------------- Appwrite Create Document -------------------
    // const document = await service.createDocument({
    //   userId: user.user.$id,
    //   fileName: 'test',
    //   language: 'javascript',
    //   version: '1',
    //   code:
    //   `
    //   console.log("Hello World")
    //   console.log("Welcome to InterLine !!!")
    //   console.log("🙏🙏")
    //   `
    // });

    // ------------------- Appwrite List Documents - (of complete user) -------------------
    // const userId = user.user.$id;
    // const document = await service.listDocument( userId );
    // console.log("DOC : ", document);
    // ------------------- Appwrite List Documents - (of complete user by filename) -------------------
    // const userId = user.user.$id;
    // const document = await service.listDocumentByFileName('user','script.js');
    // console.log("DOC : ", document);
    // ------------------- Appwrite List Documents - (of complete user by language) -------------------
    const userId = user.user.$id;
    const document = await service.listDocumentByLanguage(userId,'javascript');
    console.log("DOC : ", document);
  }

  
  return (
    <div>Home
      <br />
      <hr />
      {user.status === 'loggedIn' && <button onClick={handleClick} >initialize</button>}
    </div>
  )
}

export default Home