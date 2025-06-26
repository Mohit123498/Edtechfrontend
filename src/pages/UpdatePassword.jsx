import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authApis";
import Loader from "../components/commonCodeandPage/Loader";
function UpdatePassword() {
  let navigate = useNavigate();
 
  function navigateHandler(event) {
    event.preventDefault();
    navigate("../login", { replace: true });
  }

  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmshowPassword, setConfirmshowPassword] = useState(false);

  const [formData, setFormData] = useState({
    Password: "",
    confirmPassword: "",
  });

  const { Password, confirmPassword } = formData;

  function formDataHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    // const accountData = {
    //   ...formData,
    // };

    if (formData.Password === formData.confirmPassword) {
      navigate("/ResetPasswordDone");
    }
    // const finalData = {
    //   ...accountData,
    // };
    // console.log(finalData);

    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(Password, confirmPassword, token));
  }

  return (
    <div className="w-11/12 mx-auto flex items-center justify-center ">
      {loading ? (
        <Loader />
      ) : (
        <div className=" w-[30%]  flex flex-col justify-center items-center mt-40 ">
          <h1 className="text-4xl text-richblack-5 font-semibold">
            Choose new password
          </h1>
          <p className="mt-4 text-richblack-300 font-lg leading-6">
            Almost done. Enter your new password and youre all set.
          </p>
          <form
            onSubmit={submitHandler}
            className="flex  flex-col w-full gap-y-4 mt-6"
          >
            <div className=" max-lg:flex  max-lg:text-center max-lg:items-center max-lg:justify-center   max-lg:flex-col  gap-4">
              <label className="relative">
                <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
                  Create New Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  minLength="8"
                  required
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  value={Password}
                  onChange={formDataHandler}
                  placeholder="Enter password"
                  className="bg-richblack-800 rounded-[0.5rem]
                   text-richblack-5 w-full px-20 py-[0.5rem]"
                />


                <span
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
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
                  Confirm New Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  minLength="8"
                  required
                  type={confirmshowPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={formDataHandler}
                  placeholder="Confirm Password"
                  className="bg-richblack-800 rounded-[0.5rem]
              text-richblack-5 w-full px-20 py-[0.5rem] items-center justify-center flex"
                />

                <span
                  className="absolute right-[0.80em] mt-[-1.6em] max-lg:top-[64px] z-[111] cursor-pointer"
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

              <button
                type="submit"
                className="max-lg: w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 py-2 mt-6 "
              >
                Reset Password
              </button>
            </div>
            <div className=" flex items-center  text-richblack-5 max-lg:mt-2 max-lg:flex-row gap-3 max-lg:items-center">
              <FaArrowLeftLong />
              <button onClick={navigateHandler}>Back to login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
