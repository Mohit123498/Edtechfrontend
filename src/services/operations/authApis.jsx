import { setLoading, setToken } from "../../slice/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../../services/api";
import toast from "react-hot-toast";
import { setUser } from "../../slice/profileSlice";
import { resetCart } from "../../slice/cartSlice";

export function sentOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await apiConnector("POST", authEndpoints.SENT_OTP, {
        email,
        isUserExist: true,
      });
      // console.log("Sent OTP API Response=>", response);
      // console.log(response.data.message);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // console.log("response successs for otp", response.data.success);

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      // console.log("Error occured while sending the OTP ");
      // console.log(error);
      if (!error.response.success) {
        toast.error(error.response.data.message);
      }
    }
    toast.dismiss(toastId);
  };
}

// For creating the account of student and Instrctor
export function Signup(
  firstName,
  lastName,
  email,
  password,
  confirm_password,
  accountType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await apiConnector("POST", authEndpoints.SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirm_password,
        accountType,
        otp,
      });

      // console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successfully");
      navigate("/login");
    } catch (error) {
      // console.log("Error occured while signing up", error);
      // console.log(error.message);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    toast.dismiss(toastId);
  };
}

// For Logining only student and Instrctor

export function Login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authEndpoints.LOGIN_API, {
        email,
        password,
      });
      // console.log("Login success=>", response);
      if (!response.data.success) {
        throw new Error("some error while login ", response.data.message);
      }

      toast.success("Login successfully");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      // most imp below line
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      // console.log("Error occured while loging ", error);
      // console.log("This is coming", error.response);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
}

// Only Student and Instructor can logout
export function logout(navigate) {
  return (dispatch) => {
    const toastId = toast.loading("loading");
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart([]));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    toast.success("Logged Out");
    navigate("/");
    toast.dismiss(toastId);
  };
}

// Get the reset password token so they can access new password ui
export function getPasswordResetToken(email, setEmailSent) {
  const toastId = toast.loading("loading");

  return async (dispatch) => {

    try {
      // syntex of sending value from body so we have to use curly brackets {}

      const response = await apiConnector(
        "POST",
        authEndpoints.RESET_PASSWORD_TOKEN,
        { email }
      );
      // console.log("reset Password token value", response);

      // if response is not valid so throw an erro
      if (!response) {
        throw new Error("FORGOT PASSWORD GENERATE TOKEN API ERROR");
      }

      // If every thing fine so give the success message in toast
      toast.success("Email sent successfully");
      setEmailSent(true);
      
    } catch (error) {
      // console.log(
      //   "Error occured while sending reset Token email to the user",
      //   error
      // );
      // console.log(error);

      toast.error(error.response.data.message);
      toast.dismiss(toastId);
      dispatch(setEmailSent(false));
    }
    toast.dismiss(toastId);
  };
}

// for update the password

export function resetPassword(password, confirm_password, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        authEndpoints.RESET_PASSWORD,
        { password, confirm_password, token }
      );
      // console.log("reset password response is ", response);
      if (!response) {
        throw new Error(response.data.message);
      }
      // If every thing fine so give the success message in toast
      toast.success("Password updated successfully");
    } catch (error) {
      // console.log(error);
      // console.log("Error occured while reseting the password of user.", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
}
