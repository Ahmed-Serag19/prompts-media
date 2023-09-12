// import { connectToDB } from '../../../utils/database';
// import User from '../../../models/user';
// import bcrypt from 'bcrypt';

// export const POST = async (req, res) => {
//   const { email, password } = await req.json();

//   try {
//     await connectToDB();

//     const user = await User.findOne({ email });

//     if (!user) {
//       return new Response('User not found', { status: 401 });
//     }

//     const isPasswordValid = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return new Response('Invalid Password', { status: 401 });
//     }

//     return new Response('Sign in Success', { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response('Sign in Failed', { status: 500 });
//   }
// };
