import React, { useEffect } from 'react' 
import Nav from './Nav' 
import MessageList from './MessageList' 
import ChatInput from './ChatInput' 
import { useSelector, useDispatch } from 'react-redux' 
import getMessages from '../features/getMessages' 
import { setArtifacts, setMessages } from '../redux/MessageSlice' 

const ChatArea = () => { 
  const { selectedConversation } = useSelector(state => state.conversation)
 
  const dispatch = useDispatch() 

  useEffect(() => { 
    // 1. Declare the async function
    const getMesg = async () => { 
      if (selectedConversation) { 

        if(selectedConversation.title=="New Chat") return;

          const data = await getMessages(selectedConversation?._id) 
          dispatch(setMessages(data)) 
          const latestArtifactMessage = [...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length>0)
          dispatch(setArtifacts(latestArtifactMessage.artifacts ||[]))
       } 
    } 

    // 2. Call the function immediately
    getMesg() 

  }, [selectedConversation?._id]); // Added dispatch to dependency array for completeness

  return ( 
    <div className='flex-1 flex flex-col min-w-0'> 
      <Nav /> 
      <MessageList /> 
      <ChatInput /> 
    </div> 
  ) 
} 

export default ChatArea
