import React from 'react'
import api from '../../utils/axios.js'
async function logOut() {
 try{
 const {data} = await api.get("/api/auth/logout");
 console.log(data)
 }
 catch(error){

    Console.log(error)

 }
}

export default logOut