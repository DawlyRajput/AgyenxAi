// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// export const  CreateConversation= async (req, res)=>{

//     try {
//         const userId = req.headers["x-user-id"];
//         console.log(userId);
//         const conversation = await Conversation.create({
//             userId:userId
//         })
//         return res.status(200).json(conversation)
//     }
//     catch(error){
//                 return res.status(500).json({message:`craete convseartion error ${error}`});
//     }
// }


// export const getConversation= async (req, res)=>{

//     try {
//         const userId = req.headers["x-user-id"];
//         console.log(userId);
//         const conversation = await Conversation.find({
//             userId:userId
//         }).sort({updatedAt:-1})
//         return res.status(200).json(conversation)
//     }
//     catch(error){
//                 return res.status(500).json({message:`get convseartion error ${error}`});
//     }
// }

// export const updateConversation= async (req, res)=>{

//     try {
//         const {id, title} = req.body
//         console.log(userId);
//         const conversation = await Conversation.findByIdAndUpdate(
//             id,{title}
//         )
//         return res.status(200).json(conversation)
//     }
//     catch(error){
//                 return res.status(500).json({message:`update convseartion error ${error}`});
//     }
// }

// export  const saveMessage= async (req, res) =>{
//     try{
//         const {conversationId, role, content}=req.body;
//         const message = await Message.create({
//             conversationId,
//             content, 
//             role
//         })
//         return res.status(200).json(message)

//     }
//     catch(error){
//           return res.status(500).json({message:`save message error ${error}`})
//     }
// }

// export  const getMessage= async (req, res) =>{
//     try{
//         // const {conversationId}=req.body;
//         const messages = await Message.find({
//             conversationId: req.params.conversationId
//         })
//         return res.status(200).json(messages)

//     }
//     catch(error){
//           return res.status(500).json({message:`get message error ${error}`})
//     }
// }


import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const CreateConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        console.log("Creating conversation for user:", userId);
        const conversation = await Conversation.create({
            userId: userId
        });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: `create conversation error ${error.message || error}` });
    }
};

export const getConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        console.log("Getting conversations for user:", userId);
        const conversation = await Conversation.find({
            userId: userId
        }).sort({ updatedAt: -1 });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: `get conversation error ${error.message || error}` });
    }
};

export const updateConversation = async (req, res) => {
    try {
        const { id, title } = req.body;
        console.log("Updating conversation ID:", id, "with title:", title); // ✅ Fixed logging statement
        
        // Added { new: true } so it returns the freshly updated conversation object
        const conversation = await Conversation.findByIdAndUpdate(
            id, 
            { title },
            { new: true } 
        );
        
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: `update conversation error ${error.message || error}` });
    }
};

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content,images,artifacts } = req.body;
        const message = await Message.create({
            conversationId,
            content,
            role,
            images,
            artifacts
        });
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({ message: `save message error ${error.message || error}` });
    }
};

export const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: `get message error ${error.message || error}` });
    }
};

