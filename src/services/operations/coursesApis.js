import { apiConnector } from "../apiConnector";
import { CourseEndpoints, categories } from "../api";
import { toast } from "react-hot-toast";

//FOR create course get all courses and get single course

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      CourseEndpoints.GET_ALL_COURSES_API
    );
    if (!response.data.success) {
      throw new Error("Could not fetched all courses");
    }
    toast.success("SuccessFully fecthed");
    result = response?.data?.data;
  } catch (error) {
    // console.log("Getting while fetching all the courses");
    toast.error("Got Errro while fetching courses");
  }
  toast.dismiss(toastId);
  return result;
};

export const getCourseDetails = async (courseId) => {
  //
  // console.log("coming course id is ", courseId);
  const toastId = toast.loading("Loading...");
  let result = null;

  // curly braket lagana bhi kabhi kabhi jaruri hota hai front end se api call karne me
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.GET_COURSE_DETAILS,
      { courseId }
    );
    if (!response.data.success) {
      throw new Error(
        "This error get while get details of course",
        response.data.message
      );
    }
    // console.log("All info of course is", response.data);
    toast.success(response?.data?.message);
    result = response?.data;
  } catch (error) {
    result = error.response.data;
    // console.log((result = error.response.data));
    // console.log("Getting error while fetching info of course");
    toast.error("Got Errro while fetching course details");
  }
  toast.dismiss(toastId);
  return result;
};

// FOR CREATING ,UPDATING AND DELETING COURSE

export const createCourse = async (data, token) => {
  const toastId = toast.loading("Loading");
  let result = null;
  try {

    const response = await apiConnector(
      "POST",
      CourseEndpoints.CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    // console.log("CREATE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.EDIT_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    // console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.DELETE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
  } catch (error) {
    // console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

// FOR CREATING ,UPDATING AND DELETING SECTION

export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("CREATE Section API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not create section Details");
    }
    toast.success("Section Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    // console.log("CREATE SECTION  API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  const toastId = toast.loading("Loading");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("UPDATE Section API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not UPDATE section Details");
    }
    toast.success("Section Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    // console.log("update Section   API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");

    // console.log("response come from ", response.data.data);
    // YHA par backend me name check karna hai
    result = response?.data?.data;
  } catch (error) {
    // console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// FOR CREATING ,UPDATING AND DELETING SUB-SECTION
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    // name check karna hai
    result = response?.data?.data;
  } catch (error) {
    // console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.UPDATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("UPDATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    // check the name here
    result = response?.data?.data;
  } catch (error) {
    // console.log("UPDATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    // console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// Fecth all the available category
export const fetchAllCategory = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", categories.SHOW_ALL_CATEGORIES);
    // console.log("Our api Response for get all category ", response?.data?.data);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    // console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.message);
  }
  return result;
};

// all the instrucor which is created by specific constrcutor

export const getInstructorCourses = async (token) => {
  const toastId = toast.loading("loading");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      CourseEndpoints.GET_ALL_INSTRUCTOR_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("INSTRUCTOR COURSES API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Getting error while fetch instructor courses");
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    // console.log("INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// get all the info of course
// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  // console.log("spceific course details by this id", courseId);
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.GET_ALL_INFO_OF_SINGLE_COURSE,

      {courseId},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    // console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// create the ratings and reviews
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;

  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.CREATE_RATING_REVIEWS,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("CREATE RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }
    toast.success("Rating Created");
    success = true;
  } catch (error) {
    success = false;
    // console.log("CREATE RATING API ERROR............", error);
    // console.log("MSG", error.response.data.message);

    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return success;
};

// Mark the lecture of video is completed
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  // console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CourseEndpoints.UPDATE_COURSE_PROGRESS_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log(
    //   "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
    //   response
    // );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    // console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error?.response?.data.error);
    result = false;
    toast.dismiss(toastId)
  }
  toast.dismiss(toastId);
  return result;
};
