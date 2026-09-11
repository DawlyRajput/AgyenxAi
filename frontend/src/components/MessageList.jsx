import React from 'react'
import { useSelector } from 'react-redux'
import MessageBubble from './MessageBubble'

const MessageList = () => {

  const {selectedConversation} = useSelector(state => state.conversation)
  const {messages} = useSelector(state => state.message)

  return (
    <div
    className="flex-1 overflow-y-auto px-6 py-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    
    >
      {messages.length==0 || !selectedConversation ? (
        <div className='flex flex-col items-center justify-center h-full gap-4 text-center'>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold text-slate-100">AgyenxAI</h1>
            <p className="text-slate-300">How can I help you today?</p>
            <p className="text-slate-400">Ask me anything-code , ideas, explanations, or just a quick question.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-1 justify-center">
              {["What is AgenyxAI?", "Explain quantum computing in simple terms.", "How do I center a div using CSS?", "What are the benefits of using React?"].map((prompt) => (
                <button className="text-[12px] text-slate-400  bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:text-slate-300  py-1.5 px-3 rounded-md transition-colors duration-200">
                  {prompt}
                </button>
              ))}
            </div>
        </div>
      ) :
      <div className='space-y-5'>
        {messages?.map((message, index) => (
          <MessageBubble key={index} role={message?.role} content={message?.content}  images={message.images || []}/>
        ))}
         
        </div>
        }
    </div>
  )
}

export default MessageList