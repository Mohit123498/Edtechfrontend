// REACT_APP ye lagana must hai jab bhi front end se backend ko call karunga
const BASE_URL = process.env.REACT_APP_BASE_URL;

// yha me aap sabhi files ke api url paths me likh sakte hai
// jaise hamne below likha hai
export const categories = {
  ADD_CATEGORY_API: BASE_URL + "course/createCategory",
  SHOW_ALL_CATEGORIES: BASE_URL + "course/showAllCategory",
  SHOW_ALL_CATEGORIES_PAGE_INFO: BASE_URL + "course/getCategoryPageDetails",
};


// !!!!!!!!!!!!!!!!!!!!!AUTHENTICATION AND AUTHORIZATION ENDPOINT"


export const authEndpoints = {
  RESET_PASSWORD_TOKEN: BASE_URL + "profile/resetPassword-token",
  RESET_PASSWORD: BASE_URL + "profile/reset-password",
  LOGIN_API: BASE_URL + "auth/login",
  SIGNUP_API: BASE_URL + "auth/signup",
  SENT_OTP: BASE_URL + "auth/sendotp",
};

// console.log("=>", authEndpoints.RESET_PASSWORD);

// Contact us
export const contactEndPoints = {
  CONTACT_API: BASE_URL + "connect/contact",
};

// profile api
export const profileEndPoints = {
  UPLOADIMAGE_API: BASE_URL + "profile/updateProfileImage",
  UPDATE_PROFILEINFO: BASE_URL + "profile/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "profile/deleteProfile",
  // change password from profile
  UPDATE_PASSWORD_Profile_API: BASE_URL + "auth/changePassword",
  ENROLLED_COURSES: BASE_URL + "profile/getEnrolledCourses",

  // Instructor Dashboard which is basically show the  total earning by course selling and so many things
  GET_INSTRUCTOR_DASHBOARD: BASE_URL + "profile/instructorDashboard",
};

// All the course related end points AND categories
export const CourseEndpoints = {
  // For Creating course and get all course and get single course entire info
  CREATE_COURSE_API: BASE_URL + "course/createCourse",
  EDIT_COURSE_API: BASE_URL + "course/editCourse",
  GET_ALL_COURSES_API: BASE_URL + "course/getAllCourse",
  GET_ALL_INFO_OF_SINGLE_COURSE: BASE_URL + "course/getFullCourseDetails",
  DELETE_COURSE_API: BASE_URL + "course/deleteCourse",
  GET_COURSE_DETAILS: BASE_URL + "course/getCourseDetails",
  CREATE_RATING_REVIEWS: BASE_URL + "course/createRating",
  GET_ALL_RATING_AND_REVIEWS: BASE_URL + "course/getReviews",
  // get all the courses which is created by of specific Instructor
  GET_ALL_INSTRUCTOR_COURSES: BASE_URL + "course/getInstructorCourses",

  // create section of course ,update and delete section info
  CREATE_SECTION_API: BASE_URL + "course/addSection",
  UPDATE_SECTION_API: BASE_URL + "course/updateSection",
  DELETE_SECTION_API: BASE_URL + "course/deleteSection",

  // create subsection of course ,update and delete subsection info
  CREATE_SUBSECTION_API: BASE_URL + "course/addSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "course/deleteSubSection",

  // course progress api
  UPDATE_COURSE_PROGRESS_API: BASE_URL + "course/updateCourseProgress",

  // create and rating and review and get all ratings and also get the avrage ratings
  CREATE_RATING_REVIEW_API: BASE_URL + "course/createRating",
  GET_AVERAGE_RATING_API: BASE_URL + "course/getAverageRating",
  GET_REVIEWS_API: BASE_URL + "course/getReviews",
};

// Payments ENDPOINTS
export const paymentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "payment/verifySignature",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "payment/sendPaymentSuccessEmail",
};
