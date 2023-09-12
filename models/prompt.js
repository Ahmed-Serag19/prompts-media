import { Schema, models, model } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt cant be empty!'],
  },
  tag: {
    type: String,
    required: [true, 'Please enter 1 or more #tag'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
