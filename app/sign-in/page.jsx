'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (session?.user) {
      setTimeout(() => {
        setRedirectToHome(true);
      }, 1500);
    }
  }, [session]);

  useEffect(() => {
    if (redirectToHome) {
      router.push('/');
    }
  }, [redirectToHome, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        router.push('/');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Sign-in failed');
    }
  };

  return (
    <>
      {redirectToHome ? (
        <h1 className="head_text text-left">
          <span className="blue_gradient">
            You are already logged in!
          </span>
        </h1>
      ) : (
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
            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/" className="text-gray-500 text-sm ">
                Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              >
                Sign in
              </button>
            </div>
            {errorMessage && (
              <h1 className="text-red-600">{errorMessage}</h1>
            )}
          </form>
          <div className="text-center">
            <button
              onClick={signIn}
              type="button"
              className="px-5 mt-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              Sign in with google
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default SignIn;
