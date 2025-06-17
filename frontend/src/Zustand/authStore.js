import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser, logout } from "../axios/api.js"

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      initialCheckDone: false,

      initialize: async () => {
        try {
          set({ loading: true });
          const  data  = await getCurrentUser();
          set({
            user: (data.data.success) ? data.data.user : null,
            loading: false,
            initialCheckDone: true,
          });
        } catch (error) {
          set({
            user: null,
            loading: false,
            initialCheckDone: true,
          });
        }
      },

      login: (userData) => set({ user: userData }),

      logoutUser: async () => {
        try {
          await logout();
          set({ user: null });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      }
    }),
    {
      name: 'auth-store', // key in localStorage
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);

export default useAuthStore;

