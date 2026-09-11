import React from 'react'
import api from '../../utils/axios.js'

async function getMessages(id) {
  try{
  const {data} = await api.get(`api/chat/get-message/${id}`)
  console.log('Fetched messages:', data);
  return data;
  }
  catch(error){
    console.error('Error fetching messages:', error);
return []
  }
}

export default getMessages