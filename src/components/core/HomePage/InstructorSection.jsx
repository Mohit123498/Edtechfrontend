import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighLightText from './HighLightText';
import ReUseButton from './ReUseButton';
const InstructorSection = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <div className="flex flex-col lg:flex-row gap-20 items-center justify-center mb-20">
          <div className="lg:w-[40%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-28px_-18px_0_0]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold text-white ">
              Become an
              <HighLightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit mb-1">
              <ReUseButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </ReUseButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection