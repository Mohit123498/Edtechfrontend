import { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtnC from "../../../../commonCodeandPage/IconBtnC";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import NestedViewSubsection from "./NestedViewSubsection";
import { MdNavigateNext } from "react-icons/md";

import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slice/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/coursesApis";
function AddCourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // handle form submission this is create & update the course
  async function onSubmitForm(data) {
    setLoading(true);
    let result;
    // if i am edit section so we call update section api
    if (editSectionName) {
      result = await updateSection(
        {
          // direct editSection dena hai nhi deaye to code fat rha hai
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    }
    // otherwise you create the section
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    // agar valid result aaya hai to course kee value bhi change karni padigi
    if (result) {
      // console.log("The section result", result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }

  //   cancle the edit for section name
  function cancleEditHandler() {
    setEditSectionName(null);
    // form ka bhi use karnege to sectionName kee value ko empty set kar do
    setValue("sectionName", "");
  }

  // this is form update the section Name
  function editChangedSectionNameHandler(sectionId, sectionName) {
    // pahle se id same hai to cancle kar do we are toggling
    if (editSectionName === sectionId) {
      cancleEditHandler();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  // next button when you click next button it navigate you next form
  // if u are in 2 nd form so you will navigate the 3rd form
  function goToNext() {
    // bina section create kare 3rd form me nhi  ja sakte atleast one section create karna padega
    if (course.courseContent.length === 0) {
      toast.error("please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section Name");
      return;
    }
    // all ok so go form no.3
    dispatch(setStep(3));
  }

  // navigate the previous form if you in 2nd form so its navigate to form number 1
  function goBack() {
    dispatch(setStep(1));
    // if i go from step no2 to step no. tab me course ko edit karunga na ki course ko dubara create karunga
    // thatswhy we use here setEditCourse()
    dispatch(setEditCourse(true));
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      {/* handle submit ke andar onsubmit ko call karna hai  */}
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            name="sectionName"
            id="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section Name is required
            </span>
          )}
        </div>

        {/* add section button */}
        <div className="flex items-end gap-x-4">
          <IconBtnC
            type="sumbit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            active="true"
            customClasses={" mt-4"}
          >
            {/* add icon + vala mark */}
            <GrAddCircle className="text-black-50" />
          </IconBtnC>

          {/* candition ke base me cancle ka button bhi show karna hai
          agar editSection true hai to cancle ka button show hoga basically 
          vo edit section ko cancle kar dega  */}
          {editSectionName && (
            <button
              type="button"
              onClick={cancleEditHandler}
              className="text-sm text-richblack-300 underline"
            >
              Cancle Edit
            </button>
          )}
        </div>
      </form>
      {/* nestedview vala component 
      yha par multiple section honge and har section ke andar 
      multiple subsection honge or ye sab content name ke array me 
      present hai section modal ke andar  */}

      {/* jab mere content ke andar section kee length 0 se greater hogi tab me 
      nested subsection vala view show karunga create karunga jha par 
      subsection kee sab details denge and opration perform karenge 
       */}

      {course.courseContent?.length > 0 && (
        <NestedViewSubsection
          editChangedSectionNameHandler={editChangedSectionNameHandler}
        />
      )}
      {/* Next Button and Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center 
          gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>

        <IconBtnC disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtnC>
      </div>
    </div>
  );
}

export default AddCourseBuilderForm;
