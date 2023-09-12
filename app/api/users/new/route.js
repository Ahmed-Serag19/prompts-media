import { connectToDB } from '../../../../utils/database';
import User from '../../../../models/user';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  const { email, username, password, image } = await req.json();

  try {
    await connectToDB();

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse('Email is already registered', {
        status: 400,
      });
    }

    // Create a new user
    const newUser = new User({
      email,
      username,
      password,
      image,
    });

    await newUser.save();

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to create a new User', {
      status: 500,
    });
  }
};
