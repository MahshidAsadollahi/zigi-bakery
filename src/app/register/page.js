"use client";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError('');
    setUserCreated(false);
    setShowErrorPopup(false);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      setCreatingUser(false);

      if (response.ok) {
        setUserCreated(true);
      } else {
        setError(result.message || 'Failed to create user');
        setShowErrorPopup(true);
      }
    } catch (err) {
      setCreatingUser(false);
      setError('An unexpected error occurred');
      setShowErrorPopup(true);
    }
  }

  useEffect(() => {
    if (userCreated) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setUserCreated(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userCreated]);

  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorPopup]);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center max-w-md mx-auto transition-transform duration-300 ease-in-out transform scale-105">
            <p className="mb-4 text-lg font-semibold">Account successfully created. Please</p>
            <Link href="/login" className="text-light-olive-green font-bold underline">
              Login to continue.
            </Link>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center max-w-md mx-auto transition-transform duration-300 ease-in-out transform scale-105">
            <p className="mb-4 text-lg font-semibold text-red-600">{error}</p>
            <button 
              onClick={() => setShowErrorPopup(false)} 
              className="text-light-olive-green font-bold underline">
              Close
            </button>
          </div>
        </div>
      )}

      <section className="mt-8">
        <h1 className="text-center text-nav-text text-4xl mb-4">Register</h1>
        <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input
            className="focus:outline-none focus:ring-0 focus:border-gray-500 mb-4"
            type="email"
            placeholder="email"
            value={email}
            disabled={creatingUser}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            className="focus:outline-none focus:ring-0 focus:border-gray-500 mb-4"
            type="password"
            placeholder="password"
            value={password}
            disabled={creatingUser}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button
            type="submit"
            disabled={creatingUser}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Register
          </button>
          <div className="or-divider text-gray-500 my-4">
            <span className="or-text">Or</span>
          </div>
          <button 
            type="button" onClick={()=> signIn('google', {callbackUrl:'/'})}
            className="flex gap-4 justify-center">
            <Image
              src={'/google-icon.png'}
              alt={'google icon'}
              width={24}
              height={24}
            />
            Login with Google
          </button>
          <div className="text-center my-4 text-gray-500 border-t pt-2">
            Have an account? <span/>
            <Link className="underline" href={'/login'}>Login here &raquo;</Link>
          </div>
        </form>
      </section>
    </>
  );
}
