import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { generateExplanation } from '../axios/api';
import AnswerDisplay from './AnswerDisplay';
import { useAnswerStore } from '../Zustand/useAnswerStore';

const LearnMore = ({ question,questionId }) => {
  const [loading, setLoading] = useState(false);
  const [answer, setCurrAnswer] = useState('');
      const { getAnswer, setAnswer } = useAnswerStore();
  
  // Function to get answer from backend
  const fetchAnswer = async () => {
    const cachedAnswer = getAnswer(questionId);
    if (cachedAnswer) {
      
      setCurrAnswer(cachedAnswer);
      return;
    }
    if (!question) return;
    
    setLoading(true);
    setAnswer('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await generateExplanation(question);
      
      setAnswer(questionId, response.data.data);
      setCurrAnswer(response.data.data);
    } catch (error) {
      console.error('Failed to fetch answer:', error);
      setCurrAnswer('Failed to load answer. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (question) {
      fetchAnswer();
    } else {
      setAnswer('');
    }
  }, [question]);
  
  const renderLoadingScreen = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
      <div className="text-center p-4 sm:p-6 rounded-xl bg-slate-800 border border-slate-700 max-w-sm mx-4">
        <div className="mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Generating Answer
        </h2>
        
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 animate-bounce"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500 animate-bounce delay-100"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-indigo-500 animate-bounce delay-200"></div>
          </div>
        </div>
        
        <p className="text-slate-400 text-xs sm:text-sm">
          Analyzing your question and crafting a detailed answer...
        </p>
      </div>
    </div>
  );
  
  if (!question) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sm:p-8 w-full max-w-md">
          <div className="text-3xl sm:text-4xl text-slate-500 mb-3 sm:mb-4">📝</div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-300 mb-2 sm:mb-3">Select a Question</h3>
          <p className="text-sm sm:text-base text-slate-500">
            Choose a question to view its detailed answer
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden relative">
      {/* Loading overlay */}
      {loading && renderLoadingScreen()}
      
      {/* Question Header */}
      <div className="p-3 sm:p-4 lg:p-5 border-b border-slate-700 bg-slate-800/50 flex-shrink-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white break-words leading-relaxed">
          {question}
        </h3>
      </div>
      
      {/* Answer Content */}
      <div className="flex-grow overflow-y-auto p-3 sm:p-4 lg:p-5">
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">
            Detailed Answer
          </h4>
          <div className="bg-slate-800 p-3 sm:p-4 lg:p-5 rounded-lg border border-slate-700">
            {answer ? (
              <div className="text-slate-200 leading-relaxed text-sm sm:text-base break-words">
                <AnswerDisplay answer={answer.explanation}/>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6 sm:py-8 text-slate-500">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin mr-2 sm:mr-3" />
                <span className="text-sm sm:text-base">Generating answer...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;