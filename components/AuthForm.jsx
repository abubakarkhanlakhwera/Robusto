'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">or continue with</p>
        <button
          onClick={handleGoogleLogin}
          className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Sign in with Google
        </button>
      </div>

      <p className="text-sm text-center text-gray-600 mt-4">
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <button className="text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
