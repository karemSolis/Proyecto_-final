
import mongoose from "mongoose";

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({

  user: { type: String, max: 100, required: true },//usuario que envía el mensaje 

  message: { type: String, max: 500, required: false },//mensaje 
});

const messageModel = mongoose.model(messagesCollection, messageSchema);
export { messageModel };
