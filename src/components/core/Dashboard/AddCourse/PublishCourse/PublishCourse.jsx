import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../slice/courseSlice";
import IconBtnC from "../../../../commonCodeandPage/IconBtnC";
import { COURSE_STATUS } from "../../../../../UtilsVariable_Function/constanst_var_fun";
import { editCourseDetails } from "../../../../../services/operations/coursesApis";
import { useNavigate } from "react-router-dom";
function PublishCourse() {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {  },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // first Render me public ko true kar denge
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  // back to previor form
  function goBack() {
    console.log("click");
    dispatch(setStep(2));
  }

  function onSubmitFormHandler() {
    // jab bhi me save changes vala btn click karunga tab handleCoursePublic vala function call hoga

    handleCoursePublic();
    navigate("/dashboard/my-courses");
  }

  // show all the courses
  function gotoCourses() {
    dispatch(resetCourseState());
    // yha se naviagate kar jayenge /dashboard/mycourses vale page me
  }
  async function handleCoursePublic() {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no changes on form so there is no need to api call
      // no need to call the api
      // in this condition we show all the courses
      gotoCourses();
      return;
    }

    // if the form is updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const curseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", curseStatus);

    // now we we have the change course status from draft to public
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    // if result valid so go to in courses
    if (result) {
      gotoCourses();
    }
    setLoading(false);
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmitFormHandler)}>
        <div className="my-6 mb-8 ">
          <label
            htmlFor="public"
            className="inline-flex items-center text-lg text-richblack-25"
          >
            <input
              type="checkbox"
              id="public"
              {...register("public", { required: true })}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5 mr-2"
            />

            <span>Make This Course Public </span>
          </label>
        </div>

        {/* 2buttons for next and previos */}
        {/* disabled={loading} means btn not click when the loading value is true  */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtnC text="Save Changes" disabled={loading} />
        </div>
      </form>
    </div>
  );
}

export default PublishCourse;
