// formType which tells this is signup or Login form
import React from "react";
import LoginForm from "../core/Auth/LoginForm";
import framImage from "../../assets/Images/frame.png";
import SignupForm from "../core/Auth/SignupForm";
import { FcGoogle } from "react-icons/fc";
import "./CommonCodeTemplate.css";
// setUserLogin function tells user is login or not

function CommonCodeTemplate({ title, discrip1, discrip2, image, formType }) {
  return (
    <div className="flex justify-between w-11/12 max-w-[1160px] mx-auto gap-x-12 gap-y-0 mt-20">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="head1 text-richblack-5 font-semibold text-[1.85rem] leading-[2.36rem]">
          {title}
        </h1>
        <p className="text-[1.25rem] leading-[1.625rem] mt-4 text-center">
          <span className="text-white">{discrip1}</span>
          <br />
          <span className="text-blue-100 text-center italic">{discrip2}</span>
        </p>

        {/* if formtype signup hai signup vala form render kar do nhi to login vala render kar do */}
        {formType === "signup" ? <SignupForm /> : <LoginForm />}

        {/* this is used for "OR" vala content  div line create karne ke leaye */}
        <div className="flex w-full items-center my-4 gap-x-2 ">
          <div className="w-full h-[2px] bg-richblack-700"></div>
          <p className="text-richblack-700 font-medium leading-[1.375rem]">
            OR
          </p>
          <div className="w-full h-[2px] bg-richblack-700"></div>
        </div>

        <button
          className="w-full flex justify-center items-center
        rounded-[8px] font-medium text-richblack-100
        border richblack-700 px-[12px] py-[9px] gap-x-2 mt-6
        "
        >
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>
      </div>

      {/* Images  */}

      {/* place the images  framimage common hai dono form me thatswhy 
      hamne import keaye hai */}
      <div className="relative w-11/12 max-w-[450px] mt-8 max-sm:hidden">
        <img
          src={framImage}
          alt="Pattern"
          width={550}
          height={500}
          loading="lazy"
        />

        {/* login page me and signup page me different image hai esleaye
         image ko props me send karke nikal leaye image name ke variable me  */}
        <img
          src={image}
          alt="Students"
          width={550}
          height={500}
          loading="lazy"
          className="absolute -top-4 right-4 max-sm:hidden"
        />
      </div>
    </div>
  );
}
export default CommonCodeTemplate;
