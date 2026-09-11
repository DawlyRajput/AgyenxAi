import  express from 'express'
import { CreateConversation, getConversation, saveMessage,getMessage, updateConversation} from '../controllers/chat.controller.js';

const router = express.Router();

router.get("/create-conversation", CreateConversation);
router.get("/get-conversations", getConversation);
router.post("/update-conversation", updateConversation);
router.post("/save-message", saveMessage);
router.get("/get-message/:conversationId", getMessage);

export default router
 
