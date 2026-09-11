import {createSlice} from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
     messages: [],
     artifacts:[]
    //  selectedMessage: null
    },
    reducers: {
      setMessages :(state, action)=>{
        state.messages=action.payload
      },
      addMessage:(state, action)=>{
        state.messages.push(action.payload)
      },
    //   setSelectedMessage:(state, action)=>{
    //     state.selectedMessage =action.payload
    //   }
    setArtifacts:(state, action)=>{
      state.artifacts=action.payload
    },

    }
})

export const { setMessages,addMessage , setArtifacts} = messageSlice.actions;
export default messageSlice.reducer;