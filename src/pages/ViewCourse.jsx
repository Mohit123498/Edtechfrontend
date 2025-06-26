import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/coursesApis";
import { setEntireCourseData } from "../slice/viewCourseSlice";
import { setCourseSectionData } from "../slice/viewCourseSlice";
import { setCompletedLectures } from "../slice/viewCourseSlice";
import { setTotalNoOfLectures } from "../slice/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourses/VideoDetailsSidebar";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../components/core/ViewCourses/CourseReviewModal";
function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      // console.log("Course Data here... ", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
  }, [courseId, token, dispatch]);
  return (
    <>
      <div className="relative flex flex-col md:flex-row min-h-screen">
        {/* Video Details Sidebar */}
        <div className="md:w-[320px] bg-gray-800 px-4 py-6 md:min-h-screen md:border-r border-gray-700">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="mx-4 md:mx-6 my-6">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}

export default ViewCourse;
