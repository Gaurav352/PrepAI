import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '../axios/api.js';
import { useNavigate } from 'react-router';
import useAuthStore from "../Zustand/authStore.js"

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading]=useState(false);
  const {initialize} = useAuthStore();

  const onEmailChange = (email)=>{
    setEmail(email);
  }
  const onPasswordChange = (password)=>{
    setPassword(password);
  }

  const onHandleClick = async (e) => {
  e.preventDefault();

  if (email.length === 0 || password.length === 0) {
    toast.error("Please enter all fields");
    return;
  }

  setLoading(true);

  try {
    const res = await login({ email, password }); 
    if(res.success){


    toast.success(`Welcome back `);
    initialize();
    navigate("/");
    }
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login to InterviewAI</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              value={email}
              onChange={(e)=>onEmailChange(e.target.value)}
              type="email"
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Password</label>
            <input
              value={password}
              onChange={(e)=>onPasswordChange(e.target.value)}
              type="password"
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            onClick={onHandleClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="text-slate-400 mt-6 text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
