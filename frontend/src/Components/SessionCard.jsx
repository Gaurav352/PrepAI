import React, { useState } from 'react';
import { Link } from 'react-router';
import { deleteSession } from '../axios/api';
import toast from 'react-hot-toast';

const SessionCard = ({
  description,
  experience,
  role,
  topics,
  length,
  date,
  sessionid
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSession(sessionid);
      toast.success(response.data.message);

      setShowDeleteDialog(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("error in deletion", error);
      setShowDeleteDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  function toShortForm(input) {
    if (!input) return "";
    return input
      .split(/\s+/)
      .map(word => word[0]?.toUpperCase())
      .join("");
  }

  const formatted = formatDate(date);

  return (
    <>
      <div className="group relative bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Floating elements */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-700"></div>

        {/* Delete button - appears on hover */}
        <button
          onClick={handleDeleteClick}
          className="absolute cursor-pointer top-3 right-3 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm z-10">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        {/* Main content */}
        <div className="relative p-6 sm:p-7">
          {/* Header with initials and role */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                {toShortForm(role)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2 leading-tight">{role}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-slate-600/70 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-full border border-slate-500/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats/Tags - Better spacing */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
              Experience: {experience} years
            </span>
            <span className="bg-blue-500/25 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-blue-400/30">
              {length} Q&A
            </span>
            <span className="bg-green-500/25 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-green-400/30">
              {formatted}
            </span>
          </div>

          {/* Description - Better typography */}
          <div className="mb-6">
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Action button - Enhanced styling */}
          <Link to={`/sessions/${sessionid}`}>
            <button className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm group-hover:shadow-blue-500/25">
              Continue Learning
              <svg className="inline-block w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleCancelDelete}
          ></div>

          {/* Dialog Box */}
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 border border-slate-600/50">
            {/* Floating elements for dialog */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white/10 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-red-500/20 rounded-full blur-lg animate-pulse delay-500"></div>

            <div className="relative">
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              {/* Dialog Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Delete Session?</h3>
                <p className="text-slate-300 text-sm">
                  Are you sure you want to delete this session? This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-slate-600/70 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-slate-500/30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionCard;