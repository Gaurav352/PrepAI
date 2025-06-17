import React, { useState, useEffect } from 'react';
import { Pin, PinOff, ExternalLink, ChevronDown, ChevronUp, Clock, BookOpen, Target, Zap, Award, TrendingUp, Menu, X, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { addQuestion, fetchCurrentSession, fetchQuestions, togglePin } from '../axios/api';
import useAuthStore from '../Zustand/authStore';
import Navbar from '../Components/Navbar';
import AnswerDisplay from '../Components/AnswerDisplay';
import LearnMore from '../Components/LearnMore';
import toast from 'react-hot-toast';


const ShowSession = () => {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedAnswers, setExpandedAnswers] = useState(-1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { id } = useParams();
    const [learnmore, setLearnmore] = useState('');
    const [moreLoading, setMoreLoading] = useState(false);
    const navigate = useNavigate();
    const [curr,setcurr]=useState(null);


    const fetchSessionData = async () => {
        try {
            const res = await fetchCurrentSession(id);
            if (res.data.success) {
                setSessionData(res.data.session);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching session data:', error);
            setLoading(false);
        }
    };
    const loadmoreHandler = async () => {
        if (sessionData.length >= 20) {
            toast.error("Question Limit reached");
            return;
        }
        setMoreLoading(true);
        try {
            const formData = {
                role: sessionData.role,
                topics: sessionData.topics,
                experience: sessionData.experience,
                numberOfQuestion: 5
            }
            const response = await fetchQuestions(formData);

            const newQuestions = response.data.data;
            const res = await addQuestion({ sessionId: id, questions: newQuestions })
            setSessionData(prev => ({
                ...prev,
                questions: [...prev.questions, ...newQuestions]
            }));
            toast.success("Added More question");
        } catch (error) {
            console.log("Failed to load more", error);
            toast.error("Failed to load more");
        } finally {
            setMoreLoading(false);
        }
    }

    useEffect(() => {
        fetchSessionData();
    }, []);

    const learnMoreHandler = (question,questionId) => {
        setLearnmore(question);
        setcurr(questionId);
        // On mobile, open sidebar when a question is selected
        if (window.innerWidth < 1024) {
            setSidebarOpen(true);
        }
    }

    const handlePinToggle = async (questionId) => {
        try {
            const response = await togglePin(questionId);
            fetchSessionData();
        } catch (error) {
            console.log("error in toggle", error);
        }
    };

    const toggleAnswer = (index) => {
        if (expandedAnswers === index) {
            setExpandedAnswers(-1);
        } else {
            setExpandedAnswers(index);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <div className="text-white text-xl">Loading session...</div>
                </div>
            </div>
        );
    }

    if (!sessionData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-2">Failed to load session data</div>
                    <div className="text-slate-400">Please try refreshing the page</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            {/* Main Layout Container */}
            <div className="flex h-screen pt-16">
                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden fixed top-20 left-4 z-40 bg-slate-800 text-white p-2 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Left Sidebar - Responsive */}
                <div className={`
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    fixed lg:relative
                    top-16 lg:top-0 
                    left-0 
                    h-[calc(100vh-4rem)]
                    w-full sm:w-96 lg:w-[600px] xl:w-[500px] 2xl:w-[600px]
                    bg-slate-800/95 lg:bg-slate-800/50 
                    backdrop-blur-sm lg:backdrop-blur-none
                    border-r border-slate-700 
                    flex-shrink-0 
                    z-30 lg:z-auto
                    transition-transform duration-300 ease-in-out
                    overflow-y-auto
                `}>
                    {/* Close button for mobile */}
                    <div className="lg:hidden p-4 border-b border-slate-700">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-slate-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-4 h-full">
                        <LearnMore question={learnmore} questionId={curr} />
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-20 top-16"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <div className="flex-1 px-4 py-8 overflow-y-auto min-w-0 h-full">
                    <div className="max-w-4xl mx-auto">
                        {/* Header with gradient background */}
                        <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 border border-slate-600 shadow-xl">
                            {/* Back Button */}
                            <button
                                onClick={() => navigate("/sessions")}
                                className="absolute top-4 right-4 z-10 bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 shadow"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            <div className="flex items-center justify-between mb-4 lg:mb-6">
                                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                    Continue Learning...
                                </h1>
                            </div>

                            {/* Role and Topics */}
                            <div className="mb-4 lg:mb-6">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
                                    {sessionData.role}
                                </h2>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {sessionData.topics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="px-2 sm:px-3 py-1 bg-slate-700 text-blue-300 text-xs sm:text-sm rounded-lg border border-slate-600"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                {/* Enhanced Tags */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 rounded-lg border border-slate-600">
                                        <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <span className="text-white text-sm">
                                            Experience: {sessionData.experience} years
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Questions Section with enhanced styling */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4 lg:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Interview Q & A</h3>
                            </div>

                            <div className="space-y-4">
                                {sessionData.questions.map((item, index) => (
                                    <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-600">
                                        {/* Question Header */}
                                        <div className="p-4 sm:p-6 hover:bg-slate-750 transition-colors relative">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                                                            {index + 1}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-base sm:text-lg font-medium text-white leading-relaxed break-words">
                                                            {item.question}
                                                        </h4>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                                    {/* Pin Button */}
                                                    <Pin
                                                        onClick={() => handlePinToggle(item._id)}
                                                        className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${item.isPinned ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`}
                                                    />

                                                    {/* Learn More Button */}
                                                    <button
                                                        onClick={() => learnMoreHandler(item.question,item._id)}
                                                        className="cursor-pointer px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        <span className="hidden sm:inline">Learn More</span>
                                                        <span className="sm:hidden">Learn</span>
                                                    </button>

                                                    {/* Expand Icon */}
                                                    <div
                                                        onClick={() => toggleAnswer(index + 1)}
                                                        className="text-slate-400 p-1 cursor-pointer"
                                                    >
                                                        {expandedAnswers === index + 1 ? (
                                                            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        ) : (
                                                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Answer Section */}
                                        {expandedAnswers === index + 1 && (
                                            <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gradient-to-r from-slate-800 to-slate-750 border-t border-slate-700">
                                                <div className="pt-4 sm:pt-6">
                                                    <div className="bg-slate-900 p-4 sm:p-6 rounded-lg border border-slate-700">
                                                        <div className="text-slate-200 leading-relaxed whitespace-pre-line text-sm sm:text-base break-words">
                                                            <AnswerDisplay answer={item.answer} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={loadmoreHandler}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                    <TrendingUp className="w-4 h-4" />
                                    {moreLoading ? 'fetching...' : 'Load More Questions'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowSession;