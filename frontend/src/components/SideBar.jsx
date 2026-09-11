// import React from 'react';
// import { PanelLeftIcon, PenSquare, Plus, MessageSquare, PanelRight } from "lucide-react";
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getConversations } from '../features/getConversations.js';
// import { createConversation } from '../features/createConversation.js';
// import { addConversation, setConversations, setSelectedConversation } from '../redux/conversationSlice.js';
// import { User } from 'lucide-react';

// const SideBar = () => {
//   const [collapse, setCollapse] = useState(false);
//   const dispatch = useDispatch();
  
//   // Destructuring state directly from Redux Store hooks
//   const { conversations, selectedConversation } = useSelector((state) => state.conversation);
//   const { userData } = useSelector((state) => state.user);
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     const getConv = async () => {
//       const data = await getConversations();
//       dispatch(setConversations(data));
//     };
//     getConv();
//   }, [userData?._id, dispatch]); // Added missing dispatch dependency hook

//   const handleCreateConversation = async () => {
//     const data = await createConversation();
//     dispatch(addConversation(data));
//     // Automatically select the freshly opened session
//     dispatch(setSelectedConversation(data)); 
//   };

//   if (collapse) {
//     return (
//       <div className='hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0'>
//         <button className="mb-1 flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer" 
//         onClick={() => setCollapse(false)}>
//           <PanelRight />
//         </button>
//         <button className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer' 
//         onClick={()=>dispatch(setSelectedConversation(null))}>
//           <Plus size={14} />
//         </button>
//         <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5'>
//           {conversations.map((conv, i) => {
//             const isActive = selectedConversation?._id === conv?._id;
//             return (
//               <div
//                 key={conv?._id || i}
//                 onClick={() => dispatch(setSelectedConversation(conv))}
//                 className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${isActive
//                   ? "bg-indigo-500/10 border-indigo-500/[0.18] text-white"
//                   : "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.02]"
//                 }`}
//               >
//                 <div className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}>
//                   <MessageSquare size={13} />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className='relative shrink-0'>
//           {userData?.avatar && !imageError ? (
//             <img className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/20' 
//             src={userData?.avatar}
//              alt="image" 
//             onError={() => setImageError(true)} />
//           ) : (
//             <div className='flex items-center justify-center w-9 h-9 rounded-[10px] bg-white/[0.05] text-slate-500'>
//               <User size={15} className='text-slate-500' />
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]'>
//       <div className='flex flex-col h-full'>
//         {/* Header */}
//         <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]'>
//           <div className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
//            onClick={() => setCollapse(true)}>
//             <PanelLeftIcon />
//           </div>
//           <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>
//             AgenyxAI
//           </span>
//           <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>
//             free
//           </span>
//           <button className='lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
//            onClick={()=>dispatch(setSelectedConversation(null))}>
//             <PenSquare size={14} />
//           </button>
//         </div>

//         {/* New Chat Button */}
//         <div className='px-4 pt-4 pb-1'>
//           <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'
//        onClick={()=>dispatch(setSelectedConversation(null))}>
//             <Plus size={15} />
//             New Chat
//           </button>
//         </div>

//         {/* List Title Context */}
//         <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
//           {conversations.length === 0 ? "No Recent Conversations" : "Recents"}
//         </div>

//         {/* Scrollable Conversation List */}
//         <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
//           {conversations.map((conv, i) => {
//             const isActive = selectedConversation?._id === conv?._id;
//             return (
//               <div
//                 key={conv?._id || i}
//                 onClick={() => dispatch(setSelectedConversation(conv))}
//                 className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${isActive
//                   ? "bg-indigo-500/10 border-indigo-500/[0.18] text-white"
//                   : "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.02]"
//                 }`}
//               >
//                 <div className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}>
//                   <MessageSquare size={13} />
//                 </div>
//                 {/* Dynamic live updating text pulled cleanly directly from the iterations */}
//                 <span className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-400"}`}>
//                   {conv?.title || "New Chat"}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         <div className='mx-2.5 h-px bg-white/[0.06]' />

//         <div className='px-3.5 py-3.5'>
//           {userData && (
//             <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150'>
//               <div className='relative shrink-0'>
//                 {userData?.avatar && !imageError ? (
//                   <img className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/20' src={userData?.avatar} alt="image" onError={() => setImageError(true)} />
//                 ) : (
//                   <div className='flex items-center justify-center w-9 h-9 rounded-[10px] bg-white/[0.05] text-slate-500'>
//                     <User size={15} />
//                   </div>
//                 )}
//               </div>
//               <div className='flex flex-col overflow-hidden min-w-0 flex-1'>
//                 <span className='text-xs font-medium text-slate-200 truncate'>{userData?.name || 'User'}</span>
//                 <span className='text-[10px] text-slate-500 truncate'>{userData?.email}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;




import React from 'react';
import {
  PanelLeftIcon,
  PenSquare,
  Plus,
  MessageSquare,
  Coins,
  LogOut,
  PanelRight,
  Menu,
  X,
  User
} from "lucide-react";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getConversations } from '../features/getConversations.js';
import { createConversation } from '../features/createConversation.js';

import {
  addConversation,
  setConversations,
  setSelectedConversation
} from '../redux/conversationSlice.js';

import logOut from '../features/logOut.js';
import { setUserData } from '../redux/userSlice.js';


const SideBar = () => {

  // Desktop collapse functionality
  const [collapse, setCollapse] = useState(false);

  // Mobile sidebar functionality
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  const { conversations, selectedConversation } =
    useSelector((state) => state.conversation);

  const { userData } =
    useSelector((state) => state.user);

  const [imageError, setImageError] = useState(false);


  // Get conversations
  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };

    getConv();
  }, [userData?._id, dispatch]);


  // Create conversation
  const handleCreateConversation = async () => {
    const data = await createConversation();

    dispatch(addConversation(data));

    // Close mobile sidebar after creating chat
    setMobileOpen(false);
  };


  // Select conversation
  const handleSelectConversation = (conv) => {
    dispatch(setSelectedConversation(conv));

    // Close mobile sidebar after selecting chat
    setMobileOpen(false);
  };


  /*
  ==========================================
  DESKTOP COLLAPSED SIDEBAR
  ==========================================
  */

  if (collapse) {
    return (
      <div
        className='hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0'
      >

        {/* Expand Sidebar */}
        <button
          className="mb-1 flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
          onClick={() => setCollapse(false)}
        >
          <PanelRight />
        </button>


        {/* New Conversation */}
        <button
          className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
         onClick={()=>dispatch(setSelectedConversation(null))}>
          <Plus size={14} />
        </button>


        {/* Conversations */}
        <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5'>

          {conversations.map((conv, i) => {

            const isActive =
              selectedConversation?._id === conv?._id;

            return (
              <div
                key={conv?._id || i}
                onClick={() => handleSelectConversation(conv)}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/[0.18] text-white"
                    : "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.02]"
                }`}
              >

                <div
                  className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  <MessageSquare size={13} />
                </div>

              </div>
            );
          })}

        </div>


        {/* User Avatar */}
        <div className='relative shrink-0'>

          {userData?.avatar && !imageError ? (

            <img
              className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/20'
              src={userData?.avatar}
              alt="image"
              onError={() => setImageError(true)}
            />

          ) : (

            <div className='flex items-center justify-center w-9 h-9 rounded-[10px] bg-white/[0.05] text-slate-500'>
              <User size={15} className='text-slate-500' />
            </div>

          )}

        </div>

      </div>
    );
  }


  return (
    <>
      {/* 
      ==========================================
      MOBILE HAMBURGER BUTTON
      ==========================================
      */}

      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className='lg:hidden fixed top-4 left-4 z-[60] flex items-center justify-center w-10 h-10 rounded-xl bg-[#0d0f14] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors'
        >
          <Menu size={20} />
        </button>
      )}


      {/* 
      ==========================================
      MOBILE OVERLAY
      ==========================================
      */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className='lg:hidden fixed inset-0 z-40 bg-black/60'
        />
      )}


      {/* 
      ==========================================
      SIDEBAR
      ==========================================
      */}

      <div
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          w-[270px]
          h-screen
          shrink-0
          bg-[#0d0f14]
          border-r border-white/[0.06]

          transform transition-transform duration-200

          ${
            mobileOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >

        <div className='flex flex-col h-full'>


          {/* 
          ==========================================
          HEADER
          ==========================================
          */}

          <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]'>


            {/* Desktop Collapse Button */}
            <div
              className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
              onClick={() => setCollapse(true)}
            >
              <PanelLeftIcon />
            </div>


            {/* Logo */}
            <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>
              AgenyxAI
            </span>


            {/* Free Badge */}
            <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>
              free
            </span>


            {/* Desktop New Chat */}
            <button
              className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
             onClick={()=>dispatch(setSelectedConversation(null))}>
            
              <PenSquare size={14} />
            </button>


            {/* Mobile Close Button */}
            <button
              className='lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>

          </div>


          {/* 
          ==========================================
          NEW CHAT BUTTON
          ==========================================
          */}

          <div className='px-4 pt-4 pb-1'>

            <button
              className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'
          onClick={()=>dispatch(setSelectedConversation(null))}>
              <Plus size={15} />
              New Chat
            </button>

          </div>


          {/* 
          ==========================================
          CONVERSATION HEADING
          ==========================================
          */}

          {conversations.length === 0 ? (

            <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
              No Recent Conversations
            </div>

          ) : (

            <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
              Recents
            </div>

          )}


          {/* 
          ==========================================
          CONVERSATION LIST
          ==========================================
          */}

          <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>

            {conversations.map((conv, i) => {

              const isActive =
                selectedConversation?._id === conv?._id;

              return (

                <div
                  key={conv?._id || i}
                  onClick={() => handleSelectConversation(conv)}
                  className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                    isActive
                      ? "bg-indigo-500/10 border-indigo-500/[0.18] text-white"
                      : "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.02]"
                  }`}
                >

                  <div
                    className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150 ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-white/[0.05] text-slate-500"
                    }`}
                  >
                    <MessageSquare size={13} />
                  </div>


                  <span
                    className={`text-[13px] font-medium truncate ${
                      isActive
                        ? "text-slate-100"
                        : "text-slate-400"
                    }`}
                  >
                    {conv?.title || "New Chat"}
                  </span>

                </div>

              );

            })}

          </div>


          {/* Separator */}
          <div className='mx-2.5 h-px bg-white/[0.06]' />


          {/* 
          ==========================================
          USER SECTION
          ==========================================
          */}

          <div className='px-3.5 py-3.5'>

            {userData ? (

              <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150'>

                {/* Avatar */}
                <div className='relative shrink-0'>

                  {userData?.avatar && !imageError ? (

                    <img
                      className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/20'
                      src={userData?.avatar}
                      alt="image"
                      onError={() => setImageError(true)}
                    />

                  ) : (

                    <div className='flex items-center justify-center w-9 h-9 rounded-[10px] bg-white/[0.05] text-slate-500'>
                      <User size={15} className='text-slate-500' />
                    </div>

                  )}

                </div>


                {/* User Details */}
                <div className="flex-1 min-w-0">

                  <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                    {userData?.name || "User"}
                  </p>

                  <p className="text-[12px] text-slate-500 mt-2">
                    Free User
                  </p>

                </div>


                {/* Coins + Logout */}
                <div className='flex gap-1'>

                  <button
                    className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                  >
                    <Coins size={15} className='text-slate-500' />
                  </button>


                  <button
                    className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                    onClick={() => {
                      logOut();
                      dispatch(setUserData(null));
                    }}
                  >
                    <LogOut size={15} className='text-slate-500' />
                  </button>

                </div>

              </div>

            ) : (

              <button>
                Login
              </button>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default SideBar;
