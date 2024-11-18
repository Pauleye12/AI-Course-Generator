import axios from "axios";
import { coursesType } from "./types";

const api = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 10000,
  headers: { "Content-type": "application/json" },
});

//Function to get all courses
export const getCourses = async () => {
  try {
    const res = await api.get("/courses");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//Function to get Specific course
export const getCourseById = async (Id?: number) => {
  try {
    const res = await api.get(`/courses/${Id}`);
    return res.data;
  } catch (error) {
    // throw new Error("Error fetching blog details");
    console.error(error);
  }
};

//Function to get all category
export const getAllCategory = async () => {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//Function to get courses by category
export const getCoursesByCategory = async (category: string) => {
  try {
    const res = await api.get("/courses");
    const data = res.data;

    // Filter the courses based on the category
    const categoryCourses = data.filter(
      (C: coursesType) => C.category === category
    );

    if (category !== "All" && categoryCourses.length !== 0) {
      console.log("yes");
      return categoryCourses;
    } else if (category === "All") {
      return data; // Return all courses if category is "All"
    } else if (categoryCourses.length === 0) {
      console.log("mid");
      return categoryCourses; // Return empty array if no courses match
    } else {
      console.log("no");
      return data; // Return all courses if no matches found
    }
  } catch (error) {
    console.error(error);
  }
};

//Function to add a course
export const addCourse = async (course: coursesType) => {
  try {
    const res = await api.post("/courses", course); // Send a POST request to add the course
    return res.data; // Return the added course data
  } catch (error) {
    console.error(error); // Log any errors
  }
};

//Function to delete course

//Function to get Dashboard metrics
export const getAllDashboardMetric = async () => {
  try {
    const res = await api.get("/dashboardMetrics");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
