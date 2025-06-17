import React from 'react';
import { ChevronRight, Brain, Target, BookOpen, Pin, Zap, Users, Award, ArrowRight } from 'lucide-react';
import { features } from '../assets/Feautures';
import Working from '../Components/Working';
import Footer from '../Components/Footer';
import useAuthStore from '../Zustand/authStore';
import { Link, useNavigate } from 'react-router';
import Navbar from '../Components/Navbar';

export default function LandingPage() {
    const user = useAuthStore((state) => state.user);



  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
        <Navbar/>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your Next
              <span className="block text-blue-400">Interview with AI</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Create personalized interview sessions, get AI-generated questions, and practice with detailed explanations tailored to your role and experience level.
            </p>
            <Link to={user ? "/sessions":"/login"} >
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto group">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive interview preparation tailored to your specific needs and career goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-700/20 group"
              >
                <div className="bg-blue-700 text-white p-3 rounded-lg w-fit mb-4 group-hover:bg-emerald-500 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}

      <Working/>

      

      {/* Footer */}
      <Footer/>
    </div>
  );
}