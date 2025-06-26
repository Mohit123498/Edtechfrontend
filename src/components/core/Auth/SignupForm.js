import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sentOtp } from "../../../services/operations/authApis";
import { setSignupData } from "../../../slice/authSlice";
import { ACCOUNT_TYPE } from "../../../UtilsVariable_Function/constanst_var_fun";
import ConfirmationComponent from "../../commonCodeandPage/ConfirmationComponent";
import "./SignupForm.css";
import Loader from "../../commonCodeandPage/Loader";
function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // check role of the login user
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmshowPassword, setConfirmshowPassword] = useState(false);
  const { firstName, lastName, email, password, confirm_password } = formData;

  function formDataHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  var signupData;
  // Handle the form data
  function submitHandler(event) {
    event.preventDefault();
    // veryfying enter password and confirm password
    if (password !== confirm_password) {
      toast.error("Password does not match");
      return;
    }
    // copy the entire data
    signupData = {
      ...formData,
      accountType,
    };
    // console.log(signupData);

    // dispatch the send otp and signup services function

    dispatch(setSignupData(signupData));
    dispatch(sentOtp(formData.email, navigate));
    // Reset the entire data of signup form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  // data to pass to Tab button which set the account type  component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* student instructor vale 2 button  */}
      {/* unko es component se handle karenge  */}

      <ConfirmationComponent
        tabData={tabData}
        accountType={accountType}
        setAccountType={setAccountType}
      />
      <form
        onSubmit={submitHandler}
        className="flex  flex-col w-full gap-y-6 mt-1 max-sm:mx-auto"
      >
        {/* first name and last name  */}
        <div className="  flex gap-x-2 max-sm:flex-col max-sm:mx-auto mt-1">
          <label className="w-full">
            <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={formDataHandler}
              placeholder="Enter your first name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>

          <label>
            <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={formDataHandler}
              placeholder="Enter your lastname"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
        </div>

        {/* email address vala  */}
        <div className="max-md:flex max-sm-md:items-center max-md:justify-center">
          <label>
            <p
              className="text-[0.9rem]
          text-richblack-5 mb-1 
          leading-[1.385rem] 
           max-sm:auto
          "
            >
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={formDataHandler}
              placeholder="Enter Email Address"
              className="w-full rounded-[0.5rem]
             bg-richblack-800 p-[12px]
             text-richblack-5
              max-md:w-fit
              max-md:text-center
             "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
        </div>

        <div className="flex gap-2 max-sm:flex-col max-sm:mx-auto">
          <label className="relative">
            <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={formDataHandler}
              minLength="8"
              placeholder="Enter password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />

            {/* same concpet as login form jaise
             */}

            <span
              className="absolute top-[38px]  cursor-pointer  right-3"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative">
            <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            {/* show showPassword1 we handle another eye button for showing the password */}
            <input
              required
              type={confirmshowPassword ? "text" : "password"}
              name="confirm_password"
              value={confirm_password}
              onChange={formDataHandler}
              placeholder="Confirm Password"
              minLength="8"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />

            <span
              className="absolute  right-3 cursor-pointer ms: top-9"
              onClick={() => {
                setConfirmshowPassword(!confirmshowPassword);
              }}
            >
              {!confirmshowPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 py-2 "
        >
          Create Account
        </button>
        <p className="text-white text-center">
          Already have an account?
          <span
            className=" ml-2 text-blue-600 cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
export default SignupForm;
