import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { RxCross2 } from "react-icons/rx";
import UploadThumnail from "../UploadThumnail";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/coursesApis";
import { setCourse } from "../../../../../slice/courseSlice";
import IconBtnC from "../../../../commonCodeandPage/IconBtnC";
import { useNavigate } from "react-router-dom";

function AddSubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();

  //   modal ke andar 3 cheej dekhegi first video, title, short discription so inhe set kar lee
  useEffect(() => {
    // subsection ko view ya edit tab kar paoge jab vo create ho chuka hoga
    if (view || edit) {
      setValue("lectureTitle", modalData?.title);
      setValue("lectureDiscription", modalData?.description);
      setValue("lectureVideo", modalData?.videoUrl);
    }
  }, []);

  //  check whether is form update or not
  function isFormUpdated() {
    const currentValue = getValues();

    // it  means form update hua hai
    if (
      currentValue.lectureTitle !== modalData.title ||
      currentValue.lectureDiscription !== modalData.description ||
      currentValue.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }
    return false;
  }

  //   this is for update the subsection page
  async function handleEditSubsection() {
    const currentValue = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    // agar ye true hai to form update hua hai so have to call update subsection api
    if (currentValue.lectureTitle !== modalData.title) {
      formData.append("title", currentValue.lectureTitle);
    }
    if (currentValue.lectureDiscription !== modalData.description) {
      formData.append("description", currentValue.lectureDiscription);
    }
    if (currentValue.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValue.lectureVideo);
    }

    // call the update sussubsection api
    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      // console.log("result", result);
      // think some logic

      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  }

  async function formSubmit(data) {
    // form ko view karne me kuch nhi karna
    if (view) {
      return;
    }
    if (edit) {
      // agar form update nhi hua to edit kar hee nhi sakte
      if (!isFormUpdated) {
        toast.error("No change made in form");
      } else {
        // edit kar do subsection kee details ko
        handleEditSubsection();
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDiscription);
    formData.append("video", data.lectureVideo);
    setLoading(true);
    // cerate subsection API
    // console.log("My formData is ", formData);
    const result = await createSubSection(formData, token);
    if (result) {
      // think some logic
      // console.log("The Result is ", result);
      // update the formate of course
      // add susection ke case me modalData hee sectionId hai bcs nestedViewSubsection me addSection vale btn me direct section id pass keaye hai
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Video Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} {"  "}
            Lecture
          </p>
          {/* close the add susection modal form */}
          {/* agar kuch load nhi hai tab modalData ko band kar do and normal case ke andar kuch nhi karo  */}
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* yha se form start jisme subsection kee details dena hai */}
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* upload video */}
          <UploadThumnail
            name="lectureVideo"
            label="lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            // yha par name change karke dekhna hai
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture ka Name/Title */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              name="lectureTitle"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2 mt-2">
            <label
              className="text-sm text-richblack-5"
              htmlFor="lectureDiscription"
            >
              Lecture Description
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDiscription"
              name="lectureDiscription"
              placeholder="Enter Lecture Description"
              {...register("lectureDiscription", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDiscription && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtnC
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddSubSectionModal;
