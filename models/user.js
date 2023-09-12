import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists!'],
    match: [
      /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 6-20 alphanumeric letters and be unique!',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

module.exports = User;
