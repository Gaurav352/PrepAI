import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import Navbar from '../Components/Navbar';
import SessionCard from '../Components/SessionCard';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router';
import { mySessions } from '../axios/api';

const Sessions = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const response = await mySessions();
            setSessions(response.data.sessions);
        } catch (error) {
            console.log("failed to fetch sessions", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSessions();
    }, []);

    // Filter sessions based on search term
    const filteredSessions = sessions.filter(session =>
        session?.role?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        session?.skills?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        session?.description?.toLowerCase().includes(searchTerm?.toLowerCase())
    );



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            <Navbar />

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {/* Heading */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Your Past Sessions
                        </h1>

                        {/* Back Button */}
                        <button
                            onClick={() => navigate("/")}
                            className="group flex items-center gap-2 px-4 py-2 cursor-pointer bg-blue-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 rounded-full shadow-sm hover:shadow-md"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="text-sm md:text-base font-medium">Back</span>
                        </button>

                    </div>

                    {/* Subtext */}
                    <p className="text-slate-300 text-lg">
                        Manage and practice with your personalized interview sessions
                    </p>
                </div>



                {/* Search and Filter Bar */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search sessions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <Loading />
                )}

                {/* Empty State */}
                {!loading && filteredSessions.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {searchTerm ? 'No sessions found' : 'No sessions yet'}
                        </h3>
                        <p className="text-slate-400 mb-6">
                            {searchTerm
                                ? 'Try adjusting your search criteria'
                                : 'Create your first interview session to get started'
                            }
                        </p>

                    </div>
                )}

                {/* Sessions Grid */}
                {!loading && filteredSessions.length > 0 && (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 max-w-4xl mx-auto'
                        }`}>
                        {filteredSessions.map((session) => (
                            <SessionCard
                                description={session.description}
                                topics={session.topics}
                                date={session.createdAt}
                                role={session.role}
                                experience={session.experience}
                                length={session.questions.length}
                                sessionid={session._id}
                            />
                        ))}
                    </div>
                )}

                {/* Results Count */}
                {!loading && filteredSessions.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-slate-400">
                            Showing {filteredSessions.length} of {sessions.length} sessions
                        </p>
                    </div>
                )}
            </div>

            {/* Floating Create Button */}
            <button
                onClick={(e) => navigate("/sessions/create")}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50 group"
                aria-label="Create new session"
            >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Floating background elements */}
            <div className="fixed top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse pointer-events-none"></div>
            <div className="fixed bottom-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-700 pointer-events-none"></div>
        </div>
    );
};

export default Sessions;