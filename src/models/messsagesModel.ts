import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: string;
  text: string;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  text: { type: String, required: true },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;