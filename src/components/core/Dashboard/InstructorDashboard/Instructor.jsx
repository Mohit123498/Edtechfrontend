import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getInstructorCourses } from "../../../../services/operations/coursesApis";
import { getInstructorData } from "../../../../services/operations/profileApis";
import Loader from "../../../commonCodeandPage/Loader";
import InstructorChart from "./InstructorChart";
function Instructor() {
  const [loading, setLoading] = useState(false);
  const [InstructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  useEffect(() => {
    const getCourseDatawithState = async () => {
      setLoading(true);
      const InstructorApiData = await getInstructorData(token);
      // console.log("Instructor Data with stats of earning ", InstructorApiData);

      //   Particular Instructor se related courses
      const instructorCourses = await getInstructorCourses(token);

      //  agar data aaya hai to set kar do
      if (InstructorApiData.length) {
        setInstructorData(InstructorApiData);
      }

      //  instructor courses api se data aaya hai to courses ko set kar do

      if (instructorCourses.length) {
        setCourses(instructorCourses);
      }

      setLoading(false);
    };
    getCourseDatawithState();
  },[]);

  // get all the things
  const totalAmount = InstructorData?.reduce(
    (acc, curr) => acc + curr?.totalCourseAmountOfSellingCourse,
    0
  );
  const totalEnrollStudents = InstructorData?.reduce(
    (acc, curr) => acc + curr?.totalStudentEnrolled,
    0
  );

  // console.log(
  //   "totalAmount=> ",
  //   totalAmount,
  //   "totalEnrollStudents=>",
  //   totalEnrollStudents
  // );

  return (
    <div className="p-4 md:p-8">
    <div className="space-y-2 mb-8">
      <h1 className="text-2xl font-bold text-richblack-5">Hi {user.firstName}</h1>
      <p className="font-medium text-richblack-200">Let's start something new</p>
    </div>
    {loading ? (
      <Loader />
    ) : courses.length > 0 ? (
      <div>
        <div className="my-4 flex flex-col lg:flex-row lg:space-x-4 lg:h-[350px] space-y-4 lg:space-y-0">
          {totalAmount > 0 || totalEnrollStudents > 0 ? (
            <div className="flex-1">
              <InstructorChart courses={InstructorData} />
            </div>
          ) : (
            <div className="flex-1 rounded-md bg-richblack-800 p-6 flex flex-col justify-center items-center">
              <p className="text-lg font-bold text-richblack-5">Visualize</p>
              <p className="mt-4 text-xl font-medium text-richblack-50">
                Not Enough Data To Visualize
              </p>
            </div>
          )}
          <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Statistics</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-lg text-richblack-200">Total Courses</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  {courses.length}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Students</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  {totalEnrollStudents}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Income</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  Rs. {totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Your Courses Section */}
        <div className="rounded-md bg-richblack-800 p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
            <Link
              to="/dashboard/my-courses"
              className="text-xs font-semibold text-yellow-50"
            >
              View all Courses
            </Link>
          </div>
          <div className="my-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course, index) => (
              <div key={index} className="w-full">
                <img
                  src={course?.thumbnail}
                  alt="course_image"
                  loading="lazy"
                  className="h-[201px] w-full rounded-md object-fill"
                />
                <div className="mt-3 w-full">
                  <p className="text-sm font-medium text-richblack-50">
                    {course?.courseName}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <p className="text-xs font-medium text-richblack-300">
                      {course?.studentEnrolled?.length} Students
                    </p>
                    <p className="text-xs font-medium text-richblack-300">|</p>
                    <p className="text-xs font-medium text-richblack-300">
                      Rs. {course.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
        <p className="text-center text-2xl font-bold text-richblack-5">
          You do not create any course yet !!
        </p>
        <Link to="/dashboard/add-course">
          <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
            Create a Course?
          </p>
        </Link>
      </div>
    )}
  </div>
  
  );
}

export default Instructor;
