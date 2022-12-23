import { Schema, model, Types } from 'mongoose';

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [Types.ObjectId],
    default: [],
  },
}, { timestamps: true, versionKey: false });

export default model('card', cardSchema);
