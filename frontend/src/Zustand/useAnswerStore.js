import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAnswerStore = create(
  persist(
    (set, get) => ({
      answers: {}, // { questionId: answer }

      // Get answer by questionId
      getAnswer: (questionId) => {
        return get().answers[questionId] || null;
      },

      // Save or update answer
      setAnswer: (questionId, answer) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: answer,
          },
        }));
      },

      // Optional: Clear all cached answers
      clearAnswers: () => set({ answers: {} }),
    }),
    {
      name: 'answers-storage', // key in localStorage
      partialize: (state) => ({ answers: state.answers }), // only persist `answers`
    }
  )
);
