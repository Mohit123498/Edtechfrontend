import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authApis";
import Loader from "../components/commonCodeandPage/Loader";
import toast from "react-hot-toast";
function ForgotPassword() {
  let navigate = useNavigate();
  function navigateHandler(event) {
    event.preventDefault();

    navigate("../login", { replace: true });
  }

  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  function handleSumbitHandler(event) {
    event.preventDefault();

    dispatch(getPasswordResetToken(email, setEmailSent));
    if (email === " ") {
      toast.error("Enter your email");
    }
  }

  return (
    <div className="w-11/12 flex items-center justify-center mx-auto">
      {loading ? (
        <div className="flex items-center justify-center mt-36 ">
          <Loader />
        </div>
      ) : (
        <div className=" w-[508px] h-[448px] flex flex-col items-center justify-center">
          <div className="w-[80%] text-center">
            <h1 className="text-4xl text-richblack-5 font-semibold">
              {!emailSent ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className="mt-4 text-richblack-300 font-lg leading-6 flex text-center">
              {" "}
              {!emailSent
                ? " Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try  account recovery"
                : `We have sent the reset email to
               ${email}`}
            </p>
          </div>

          <div className="flex flex-col w-[80%] mt-4 items-center justify-center">
            <form onSubmit={handleSumbitHandler}>
              {!emailSent && (
                <div>
                  <label className="w-full mt-8">
                    <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
                      Email address
                      <sup className=" text-pink-200 font-extrabold font-2xl">
                        *
                      </sup>
                    </p>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter email id"
                      className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full px-20 py-[0.5rem]"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
              )}

              {/* button */}
              <div className="mt-7">
                <button
                  type="submit"
                  className=" w-full text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold
                     shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                        bg-yellow-50 text-black 
                         hover:scale-95 transition-all duration-200 hover:shadow-none
                         max-lg:flex items-center justify-center mx-auto text-center"
                >
                  {!emailSent ? "Reset Password" : "Resend email"}
                </button>
              </div>

              <div className="max-sm:mt-8 text-richblack-5 mt-2 flex flex-row gap-3 max-sm:items-center max-sm:justify-center items-center">
                <FaArrowLeftLong />
                <button onClick={navigateHandler}>Back to login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
