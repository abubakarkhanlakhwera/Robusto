// app/auth/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useAuthStore } from '@/lib/authStore';
import { app } from '@/lib/firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function FormInput(props) {
  return (
    <input
      className="w-full border px-3 py-2 rounded mb-4 focus:ring focus:ring-blue-200"
      {...props}
    />
  );
}

function FormButton({ loading, children, ...props }) {
  return (
    <button
      disabled={loading}
      className={`w-full py-2 rounded transition ${
        loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      }`}
      {...props}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}

function SocialLogin({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center mt-3 border border-gray-300 rounded py-2 hover:bg-gray-50 transition"
    >
      <img src="/google-icon.svg" alt="" className="h-5 mr-2" />
      Continue with Google
    </button>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      let res;
      if (isLogin) {
        res = await signInWithEmailAndPassword(auth, email, password);
      } else {
        res = await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser(res.user);
    } catch (err) {
      const code = err.code || err.message || '';
      if (code.includes('user-not-found')) {
        setError('No account with that email.');
      } else if (code.includes('wrong-password')) {
        setError('Incorrect password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      setError('Google sign‑in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-lg max-w-md w-full">
        <img src="/logo.svg" alt="MyApp Logo" className="h-12 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {error && (
          <p aria-live="assertive" className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <FormInput
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <FormInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormButton loading={isSubmitting} onClick={handleAuth}>
          {isLogin ? 'Login' : 'Sign Up'}
        </FormButton>

        <SocialLogin onClick={handleGoogleLogin} />

        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
