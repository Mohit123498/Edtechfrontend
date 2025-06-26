import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../api";
import { setUser } from "../../slice/profileSlice";
import { logout } from "../../services/operations/authApis";

// Upload display picture in profile
export function updateProfileImageOfUser(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await apiConnector(
        "PUT",
        profileEndPoints.UPLOADIMAGE_API,
        formData,
        {
          // we must tell when we upload something from text
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log(
      //   "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
      //   response
      // );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");

      // console.log("Response ke andar data ye hai ", response.data);
      dispatch(setUser(response.data.data));
    } catch (error) {
      // console.log(error.message);
      // console.error("Getting error while upload an image ");
      toast.error("can't Upload Image");
    }
    toast.dismiss(toastId);
  };
}

// Update user details
export function updateProfileDetails(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await apiConnector(
        "PUT",
        profileEndPoints.UPDATE_PROFILEINFO,
        formData,
        {
          // we must tell when we upload something from text
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("Update user info  API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      );
      toast.success("Profile Updated Successfully");
    } catch (error) {
      // console.log(error.message);
      // console.error("Getting error while Updating user info ");
      toast.error("can't Upload Image");
    }
    toast.dismiss(toastId);
  };
}

// Delete user account
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        profileEndPoints.DELETE_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      // console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}

// change password from profile
export function changePasswordFromProfile(token, formData) {
  return async () => {
    const toastId = toast.loading("loading");

    try {
      const response = await apiConnector(
        "POST",
        profileEndPoints.UPDATE_PASSWORD_Profile_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // console.log("Your password update successfully", response);
      toast.success("password updated");
    } catch (error) {
      // console.log("CHANGE_PASSWORD_API API ERROR............", error);
      toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
  };
}

// get all the enrolled courses which is took by student
export async function getEnrolledCourses(token) {
  const toastId = toast.loading("...loading");
  let result = [];

  try {

    const response = await apiConnector(
      "GET",
      profileEndPoints.ENROLLED_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );


    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // console.log("Enrolled courses info fetched successfully", response);
    toast.success("Enrolled Courses ");
    // console.log(response.data.data);
    result = response?.data?.data;
  } catch (error) {
    // console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Basically this function get all the stats of instructor means toatal earnign buy selling their courses ,no of student enrolled and so on
export async function getInstructorData(token) {
  const toastId = toast.loading("loading");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndPoints.GET_INSTRUCTOR_DASHBOARD,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("GET INSTRUCTOR DASHBOARD API RESPONSE", response);
 
    result = response?.data?.courses;
  } catch (error) {
    // console.log("GET INSTRUCTOR STATS DATA API ERROR",error);
    toast.error(error);
  }
  toast.dismiss(toastId);
  return result;
}
