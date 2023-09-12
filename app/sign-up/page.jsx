'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/new', {
        method: 'POST',
        body: JSON.stringify({ email, username, password, image }),
      });

      if (response.ok) {
        setSuccessMessage('Sign-up successful!');
        setTimeout(() => {
          signIn;
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Sign-up failed, Email already in use.'); // Handle sign-up failure
    }
  };

  return (
    <>
      {!session?.user ? (
        <section className="w-full max-w-full flex-start flex-col">
          <form
            onSubmit={handleSubmit}
            className="  mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism "
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Email:
              </span>
              <input
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="johndoe@etc.com"
                required
                type="email"
                className="form_input"
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Username:
              </span>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="johndoe"
                required
                className="form_input"
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Password:
              </span>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="******"
                required
                className="form_input"
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Image:
              </span>
              <input
                name="image"
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                placeholder="image url (optional)"
                className="form_input"
              />
            </label>

            {/* Display success message if sign-up is successful */}
            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}

            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/" className="text-gray-500 text-sm ">
                Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              >
                Sign up
              </button>
            </div>
            <div>
              <button
                type="button"
                className="px-5 py-3.5 text-sm bg-black rounded-full text-white flex gap-2 items-center "
                onClick={signIn}
              >
                <span className="text-xl">
                  <FcGoogle />
                </span>
                Sign up with google
              </button>
            </div>
          </form>
        </section>
      ) : (
        <h1 className="head_text text-left">
          <span className="blue_gradient">
            Sign Out first to register
          </span>
        </h1>
      )}
    </>
  );
};

export default SignUp;
