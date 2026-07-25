import { create } from "zustand";


const counterStore = (set) => ({
  count: 0,
  dummy: "dummy",
  courses: [],
  loading: false,

 
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  
  getAllCourses: async () => {
    set({ loading: true });
    try {
      const response = await fetch("https://todo-app-backend-5bep.onrender.com/task");
      const result = await response.json();
      set({ courses: result, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
});


const useCounterStore = create(counterStore);

export default useCounterStore;
