'use client';

import { useEffect, useState } from 'react';
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

export default function AuthPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleAuth = async () => {
    try {
      setError('');
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        setUser(res.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAuth}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <button
          className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
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
