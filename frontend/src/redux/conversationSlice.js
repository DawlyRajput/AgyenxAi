import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: [],
    selectedConversation: null
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.unshift(action.payload); 
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    
    setConvTitle: (state, action) => {
      const { title, conversationId } = action.payload;
      
      // 1. Find the exact conversation object inside the array
      const conversationToUpdate = state.conversations.find(
        (conv) => conv._id === conversationId
      );

      // 2. Direct mutation (Safely handled by Redux Toolkit)
      if (conversationToUpdate) {
        conversationToUpdate.title = title;
      }

      // 3. Keep the active selected conversation in perfect sync
      if (state.selectedConversation?._id === conversationId) {
        state.selectedConversation.title = title;
      }
    },

    clearSelectedConversation: (state) => {
      state.selectedConversation = null;
    }
  }
});

export const { 
  setConversations, 
  addConversation, 
  setSelectedConversation,
  setConvTitle,
  clearSelectedConversation 
} = conversationSlice.actions;

export default conversationSlice.reducer;
