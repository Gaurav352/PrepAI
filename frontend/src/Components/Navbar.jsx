import { Brain, User, LogOut, ChevronDown, InfoIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router';
import useAuthStore from '../Zustand/authStore';
import { logout } from '../axios/api';
import toast from 'react-hot-toast';

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const {initialize,logoutUser} = useAuthStore();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogoutClick = () => {
        setShowDropdown(false);
        setShowLogoutDialog(true);
    };

    const handleConfirmLogout = async () => {
        try {
            const response = await logout();
            if(response.success){
            setShowDropdown(false);
            setShowLogoutDialog(false);
            await logoutUser();
            toast.success(response.message);
            
            navigate("/");
            
            }
        } catch (error) {
            console.log("Failed to logout",error);
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutDialog(false);
    };

    const getUserInitials = (user) => {
        if (!user) return "U";
        if (user.name) {
            return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        if (user.email) {
            return user.email.slice(0, 2).toUpperCase();
        }
        return "U";
    };



    const getUserDisplayName = (user) => {
        if (!user) return "User";
        return user.name || user.email || "User";
    };

    return (
        <>
            <nav className="bg-slate-800 shadow-lg border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <span className="ml-3 text-xl font-bold text-white">PrepAI</span>
                        </div>

                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* Profile Button */}
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 text-white hover:text-slate-300 transition-colors focus:outline-none"
                                >
                                    <div className="relative">
                                        <img
                                            src={user.profile || '/public/profile.jpg'}
                                            alt="Profile"
                                            className={`w-8 h-8 rounded-full object-cover shadow-lg border-2 border-blue-500/50`}
                                        />

                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 overflow-hidden">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-slate-700">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative"><img
                                                    src={user.profile || '/public/profile.jpg'}
                                                    alt="Profile"
                                                    className={`w-8 h-8 rounded-full object-cover shadow-lg border-2 border-blue-500/50`}
                                                />

                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-white truncate">
                                                        {getUserDisplayName(user)}
                                                    </p>
                                                    {user.email && (
                                                        <p className="text-xs text-slate-400 truncate">
                                                            {user.email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Logout Button */}
                                        <button
                                            onClick={handleLogoutClick}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors">
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Logout Confirmation Dialog */}
            {showLogoutDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Blurred Background Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-md"
                        onClick={handleCancelLogout}
                    ></div>

                    {/* Dialog Box */}
                    <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 border border-slate-600/50">
                        {/* Floating elements for dialog */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-white/10 rounded-full blur-lg animate-pulse"></div>
                        <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-500"></div>

                        <div className="relative">
                            {/* Logout Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <LogOut className="w-8 h-8 text-blue-400" />
                                </div>
                            </div>

                            {/* Dialog Content */}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Logout Confirmation</h3>
                                <p className="text-slate-300 text-sm">
                                    Are you sure you want to logout? You'll need to sign in again to access your account.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleCancelLogout}
                                    className="flex-1 bg-slate-600/70 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-slate-500/30"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmLogout}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                                >
                                    Yes, Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar