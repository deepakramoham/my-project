import { create } from "zustand";
import apiClient from "../../services/apiClient";
import { MdError } from "react-icons/md";
const courseStore = (set) => ({
  onload: false,
  modalOpen: false,
  loading: false,
  error: null,
  courses: [],
  status: "idle", //idle, pending, success, failed,
  openModal: () => {
    set({ modalOpen: true });
  },
  closeModal: () => {
    set({ modalOpen: false });
  },
  resetStatus: (state) => {
    set({ status: "idle" });
  },
  getAllCourses: async (getController) => {
    set({ loading: true, error: null, status: "pending" });
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await apiClient.get("/courses", {
        signal: getController.signal,
      });
      set({
        loading: false,
        error: null,
        courses: response?.data,
        onload: true,
        status: "success",
      });
    } catch (error) {
      set({
        loading: false,
        error: error,
        status: "failed",
      });
    }
  },
  postCourseData: async (courseData) => {
    set({
      loading: true,
      error: null,
      status: "pending",
    });
    try {
      const response = await apiClient.post("/courses", courseData);
      if (response?.data?.newCourse) {
        set((state) => ({
          loading: false,
          error: null,
          courses: [...state.courses, response?.data?.newCourse],
          status: "success",
          modalOpen: false,
        }));
      }
    } catch (error) {
      console.log(error?.response);
      set({
        error: error,
        loading: false,
        status: "failed",
      });
    }
  },
  updateCourse: async (courseData) => {
    set({
      loading: true,
      status: "pending",
    });

    try {
      const response = await apiClient.put(
        `/courses/${courseData.id}`,
        courseData,
      );

      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === response?.data?.course.id
            ? response?.data?.course
            : course,
        ),
        status: "success",
        loading: false,
        error: null,
        modalOpen: false,
      }));
    } catch (error) {
      set({
        error: error,
        loading: false,
        status: "failed",
      });
    }
  },
  deleteCourse: async (id) => {
    set({ loading: true, status: "pending" });
    try {
      const response = await apiClient.delete(`/courses/${id}`);
      set((state) => ({
        courses: state.courses.filter(
          (course) => course.id !== response?.data?.deletedId,
        ),
        status: "success",
        loading: false,
        error: null,
      }));
    } catch (err) {
      set({
        error: err,
        loading: false,
        status: "failed",
      });
    }
  },
});

const useCounterStore = create(courseStore);

export default useCounterStore;
