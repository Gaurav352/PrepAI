import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Navbar from '../Components/Navbar';
import toast from 'react-hot-toast';
import { createSession, fetchQuestions } from '../axios/api';
import { useNavigate } from 'react-router';

const CreateSession = () => {
    const [formData, setFormData] = useState({
        role: '',
        topics: [],
        description: '',
        experience: '',
        numberOfQuestion: ''
    });
    const [currentTopic, setCurrentTopic] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Add topic to the list
    const addTopic = () => {
        if (currentTopic.trim() && !formData.topics.includes(currentTopic.trim())) {
            setFormData(prev => ({
                ...prev,
                topics: [...prev.topics, currentTopic.trim()]
            }));
            setCurrentTopic('');
        }
    };

    // Remove topic from the list
    const removeTopic = (topicToRemove) => {
        setFormData(prev => ({
            ...prev,
            topics: prev.topics.filter(topic => topic !== topicToRemove)
        }));
    };

    // Handle Enter key for adding topics
    const handleTopicKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTopic();
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.role || !formData.description || !formData.experience || formData.topics.length === 0) {
            toast.error("Enter All fields");
            return ;
        }
        if(formData.numberOfQuestion < 3){
            toast.error("Minimum three question required");
            return ;
        }
        setLoading(true);

        try {
            const res = await fetchQuestions(formData);
            
            if(res.data.success){
                const questions = res.data.data;
                const res1 = await createSession({
                    role:formData.role,
                    questions,
                    description:formData.description,
                    topics:formData.topics,
                    experience:formData.experience
                })
                if(res1.data.success){
                    navigate(`/sessions/${res1.data.session._id}`);
                    toast.success("Session Created Successfully");
                }
            }
        } catch (error) {
            console.error('Error creating session:', error);
            toast.error('Failed to create session. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Check if form is valid
    const isFormValid = formData.role && formData.topics.length > 0 && formData.description && formData.experience;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            <Navbar />

            {/* Main Content */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={()=>navigate("/sessions")}
                    className="flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Sessions
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Create New Interview Session
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Set up a personalized interview practice session tailored to your role and experience
                    </p>
                </div>

                {/* Form Card */}
                <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-black/10"></div>

                    {/* Floating elements */}
                    <div className="absolute top-8 left-8 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-8 right-8 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-700"></div>

                    {/* Form Content */}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="relative p-6 sm:p-8">
                            <div className="space-y-6">
                                {/* Role Field */}
                                <div>
                                    <label htmlFor="role" className="block text-sm font-semibold text-white mb-3">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Frontend Developer, Backend Engineer, Full Stack Developer"
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                {/* Experience Field */}
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-semibold text-white mb-3">
                                        Years of Experience
                                    </label>
                                    <input
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        placeholder='Experience'
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    >

                                    </input>
                                </div>

                                {/* Topics Field */}
                                <div>
                                    <label htmlFor="topics" className="block text-sm font-semibold text-white mb-3">
                                        Topics / Skills
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={currentTopic}
                                                onChange={(e) => setCurrentTopic(e.target.value)}
                                                onKeyPress={handleTopicKeyPress}
                                                placeholder="e.g., React.js, Node.js, System Design"
                                                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={addTopic}
                                                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 flex items-center"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Topics List */}
                                        {formData.topics.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.topics.map((topic, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white"
                                                    >
                                                        {topic}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTopic(topic)}
                                                            className="hover:bg-white/20 rounded-full p-1 transition-colors"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-xs text-slate-400">
                                            Add relevant skills, technologies, or topics you want to practice
                                        </p>
                                    </div>
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-white mb-3">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Describe your interview preparation goals, target companies, or specific areas you want to focus on..."
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-semibold text-white mb-3">
                                        Number Of Questions
                                    </label>
                                    <input
                                        id="numberOfQuestion"
                                        name="numberOfQuestion"
                                        value={formData.numberOfQuestion}
                                        placeholder='Number of Questions'
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    >

                                    </input>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all transform ${isFormValid && !loading
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                                                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Creating Session...
                                            </div>
                                        ) : (
                                            'Create Interview Session'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">💡 Tips for Better Sessions</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li>• Be specific with your role title to get more targeted questions</li>
                        <li>• Add 3-5 relevant topics/skills you want to focus on</li>
                        <li>• Include your target company type or specific preparation goals</li>
                        <li>• Select the experience level that matches your current skill set</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateSession;