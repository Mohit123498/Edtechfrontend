import React from "react";
import ReUseButton from "../components/core/HomePage/ReUseButton";

function CheckEmailPageUi() {
  return (
    <div className="w-11/12 mx-auto items-center justify-center text-center flex">
      <div className="mt-40 w-[35%]   flex-col items-center justify-center">
        <div className="w-[80%] flex-col items-center justify-center text-center mx-auto ">
          <h1 className="lg:text-4xl text-richblack-5 font-semibold">
            Password has changed
          </h1>
          <p className="mt-4 text-richblack-300 font-lg leading-6">
            {" "}
            Congratualation, You successfully changed your password Back to
            login!!!. confirm{" "}
          </p>
        </div>

        <div className="flex flex-col w-[80%] mt-4  mx-auto">
          {/* Reset Button */}
          <div className="mt-4">
            <ReUseButton active={true} text="Reset Password" linkto="/login">
              Return to login
            </ReUseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckEmailPageUi;
