import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderStepsForm from "../AddCourse/RenderStepsForm";
import { getFullDetailsOfCourse } from "../../../../services/operations/coursesApis";
import { setCourse, setEditCourse } from "../../../../slice/courseSlice";
function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  // console.log("course id is ",courseId);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId , token);
      // console.log("full details of course is ",result);

      if (result?.courseDetails) {
        // edit vale flag ko true set karunga
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };
    populateCourseDetails();
  }, []);
  if (loading) {
    <div className="grid flex-1 place-items-center">
      <div className="spinner"></div>
    </div>;
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course{" "}
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderStepsForm />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            No Course Found
          </p>
        )}
      </div>
    </div>
  );
}

export default EditCourse;
