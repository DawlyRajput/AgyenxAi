import React from 'react'
import { MessageSquareIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

const Nav = () => {

    const {selectedConversation} = useSelector(state => state.conversation)
    const {messages} = useSelector(state => state.message)

  return (

    <>
    {selectedConversation &&
      <div 
    className='h-14 flex items-center  
    gap-2.5 px-5 border-b  
    border-white/[0.06]  bg-[#0d0f14]'>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo/[0.06] border border-indigo/[0.06]">
            <MessageSquareIcon size={13} className=' text-indigo-400'/>
        </div>
        <div className='text-[14px] font-semibold text-slate-100 tracking-tight'>
            {selectedConversation?.title || 'New Chat'}
        </div>
        <div className='text-[10px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-1 rounded'>
         {messages?.length } Messages

        </div>
        
    </div>
    }
   
  
     </>
  )
}

export default Nav