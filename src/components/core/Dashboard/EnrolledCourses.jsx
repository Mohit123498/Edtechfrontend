import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../../../services/operations/profileApis";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrollCourses, setEnrollCourses] = useState(null);

  async function getMyEnrolledCourses() {
    try {
      const res = await getEnrolledCourses(token);
      // console.log("we get the enroll courses", res);

      setEnrollCourses(res);
    } catch (error) {
      // console.log("Could not fetch enrolled courses.");
    }
  }
  useEffect(() => {
    getMyEnrolledCourses();
  }, []);

  // If i want to show the enrolled courses so i have to make the api call
  // mujhe backend se api call karke info lani padegi ki kon kon se courses student ne enroll keaye hai
  return (
    <div>
      <div className="text-richblack-25 flex items-center justify-center text-4xl font-semibold ">
        Enrolled Courses
      </div>
      {!enrollCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrollCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You did not enroll any course yet !!!
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name </p>
            <p className="w-1/4 px-2 py-3"> Duration </p>
            <p className="flex-1 px-2 py-3"> Progress</p>
          </div>
          {/* from here your card is start */}
          {enrollCourses.map((course, index, arr) => {
            return (
              <div
                key={index}
                className={`flex items-center border border-richblack-700 ${
                  index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <img
                    src={course?.thumbnail}
                    alt="thumnail"
                    loading="lazy"
                    className="h-34 w-44 rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course?.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course?.courseDescription?.length > 40
                        ? `${course?.courseDescription?.slice(0, 40)}...`
                        : course?.courseDescription}
                    </p>
                  </div>
                </div>

                {/* add video duration */}
                <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                {/* progress bar */}
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress :{course?.progressPercentage || 0}%</p>
                  {/* for adding progress bar we use react progress bar 
                  form react-progree-bar by this  npm i @ramonak/react-progress-bar */}
                  <ProgressBar
                    completed={course?.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
