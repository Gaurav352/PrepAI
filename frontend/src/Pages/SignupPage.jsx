import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { signup } from '../axios/api';
import useAuthStore from '../Zustand/authStore';
import { useNavigate } from 'react-router';

export default function SignupPage() {
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { initialize } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    toast('U will not be able to change photo later', {
      icon: '⚠️',
      style: {

        background: '#1e3a8a',
        color: '#ffffff',
        border: '1px solid #3b82f6',
        borderRadius: '8px',
      },
    });
  };
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length === 0 || formData.name.length === 0 || formData.password.length === 0) {
      toast.error("Please enter all fields")
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be atleat 6 characters long");
      return;
    }


    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profile',photo);

    setLoading(true);
    try {
      const res = await signup(data);
      if(res.data.success){
      toast.success(`Welcome ${res.data.user.name}`);
      initialize();
      navigate("/");
      }
    } catch (error) {
      console.log("error in signup", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative w-24 h-24">
              <img
                src={previewUrl || '/public/profile.jpg'}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 13V16H7L16 7L13 4L4 13ZM17.3 5.7C17.7 5.3 17.7 4.7 17.3 4.3L15.7 2.7C15.3 2.3 14.7 2.3 14.3 2.7L13 4L16 7L17.3 5.7Z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-slate-400 text-sm">Upload Profile Picture</span>
          </div>

          {/* Name */}
          <div>
            <label className="block text-slate-300 mb-2">Name</label>
            <input
              type="text"
              name='name'
              value={formData.name}
              onChange={handleValueChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleValueChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleValueChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a secure password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? 'loading...' : 'Signup'}
          </button>
        </form>

        <p className="text-slate-400 mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
