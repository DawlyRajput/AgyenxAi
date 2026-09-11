import React, { useState } from 'react'
import { Paperclip, Mic, Send,FileText, Zap, MessageSquare, Code2, Presentation, ImageIcon, Globe, ImagesIcon } from 'lucide-react'
import sendMessage from '../features/sendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setArtifacts } from '../redux/MessageSlice'
import { createConversation } from '../features/createConversation'
import { addConversation, setConvTitle, setSelectedConversation } from '../redux/conversationSlice'
import { updateConversation } from '../features/updateConversation'


const ChatInput = () => {

  const [value, setValue]=useState("")
  const [selectedAgent, setSelectedAgent]=useState("Auto")
  const {selectedConversation}=useSelector(state=>state.conversation)
  const {messages}=useSelector(state=>state.message)
   const dispatch=useDispatch();

const handleSendMessage = async () => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return;

  let conversation = selectedConversation;

  // 1. If it's a completely new chat session
  if (!selectedConversation) {
    const conv = await createConversation();
    
    // We update Redux immediately so the UI registers the active chat session
    dispatch(setSelectedConversation(conv));
    dispatch(addConversation(conv));
    
    conversation = conv;
  }
  
  // 2. If it's the first message, change title from "New Chat" instantly
  if (conversation.title === "New Chat") {
    const updatedTitle = trimmedValue.slice(0, 40);
    
    // Dispatch to the Redux store IMMEDIATELY before running the async API call
    dispatch(setConvTitle({ conversationId: conversation._id, title: updatedTitle }));

    // Let the database update asynchronously in the background
    await updateConversation({ id: conversation._id, title: trimmedValue });
  }

  const payload = {
    prompt: trimmedValue,
    conversationId: conversation?._id,
    agent:selectedAgent.toLowerCase()
  };

  // Add the user message layout container immediately
  dispatch(addMessage({ role: "user", content: trimmedValue }));
  setValue("");
  
  // Fetch AI assistant execution
  const data = await sendMessage(payload);
  if (!data) {
           console.log("No response received from server")
    return
}
  console.log("AI response:", data)
  dispatch(setArtifacts(data.artifacts || []))
  dispatch(addMessage({ role: "assistant", content: data?.answer, images:data?.images }));
  console.log(data);
};


const agents=[
  {
    id:"auto",
    icon:Zap,
    label:"Auto"
  },
  {
   id:"chat",
   icon:MessageSquare,
   label:"Chat"
  },
  {
   id:"coding",
   icon:Code2,
   label:"Coding"
  },
  {
   id:"pdf",
   icon:FileText,
   label:"PDF"
  },
  {
   id:"ppt",
   icon:Presentation,
   label:"PPT"
  },
  {
   id:"image",
   icon:ImageIcon,
   label:"Image"
  },
  {
    id:"search",
    icon:Globe,
    label:"Search"

  }
]

  return (
    <div className="w-full overflow-hidden  px-3 py-4 border-t border-white/[0.07] md:px-5">
      <div className="flex flex-col gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 pb-3 pt-3.5 focus-within:border-white/[0.15] focus-within:bg-white/[0.04] transition-all duration-200">
         
         <div className='flex w-[80%] gap-2 pr-2 flex-wrap'>
           
           {agents.map((agent)=>{
             const isActive=selectedAgent==agent.label
             const Icon= agent.icon
             return (
              <div 
              onClick={()=>setSelectedAgent(agent.label)}
              className={`flex-shrink-0  cursor-pointer
                inline-flex items-center gap-1.5
                px-3 py-2 rounded-full text-xs font-medium border transition-all
                ${
                  isActive ?"bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)] "
                  :"bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07] "
                }
              `}
              >
                <Icon size={14}
                 className={isActive?"text-white":"text-slate-500"}/>
                 {agent.label}


                </div>
             )
           })}
         </div>


        <textarea
          placeholder="Ask Anything..."
          onChange={(e)=>setValue(e.target.value)}
          value={value}
          className="w-full resize-none bg-transparent text-[14px] leading-relaxed text-slate-200 placeholder:text-slate-500 outline-none transition-opacity [scrollbar-width:none] disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-scrollbar]:hidden"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button 
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent text-slate-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
            >
              <Paperclip size={18} />
            </button>
            <button 
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
            >
              <Mic size={18} />
            </button>
          </div>
          {/* send button */}
          <button className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150
          transition-all duration-150 ${value.trim()?" bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white": "bg-white/0.05 text-slate-600 cursor-not-allowed"}`}
          disabled={!value}
          onClick={handleSendMessage}>
            <Send size={15}/>
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default ChatInput
