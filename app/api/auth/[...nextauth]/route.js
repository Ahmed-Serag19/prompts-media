import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '../../../../utils/database';
import User from '../../../../models/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDB();

          const user = await User.findOne({ email });

          if (!user) {
            return new Response('User not found', { status: 401 });
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            return new Response('Invalid Password', { status: 401 });
          }

          return user;
        } catch (error) {
          console.error(error);
          return new Response('Sign in Failed', { status: 500 });
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile, user, account, email, credentials }) {
      console.log(user, account.type);
      if (account.type === 'oauth') {
        try {
          await connectToDB();

          // If user exists

          const userExists = await User.findOne({
            email: profile.email,
          });

          // If not create a new user

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(' ', '').toLowerCase(),
              image: profile.picture,
            });
          }

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      } else if (account.type === 'credentials') {
        const { email, password } = credentials;

        try {
          await connectToDB();

          const user = await User.findOne({ email });

          if (!user) {
            return new Response('User not found', { status: 401 });
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            return new Response('Invalid Password', { status: 401 });
          }

          return new Response('Sign in Success', { status: 200 });
        } catch (error) {
          console.error(error);
          return new Response('Sign in Failed', { status: 500 });
        }
      }
    },
  },
});

export { handler as GET, handler as POST };
