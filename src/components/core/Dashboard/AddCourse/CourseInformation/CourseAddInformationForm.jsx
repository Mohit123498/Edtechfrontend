import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import TagAddInputChip from "./TagAddInputChip";
import {
  createCourse,
  fetchAllCategory,
} from "../../../../../services/operations/coursesApis";
import UploadThumnail from "../UploadThumnail";
import AddRequirements from "./AddRequirements";
import { setCourse, setStep } from "../../../../../slice/courseSlice";
import IconBtnC from "../../../../commonCodeandPage/IconBtnC";
import { MdNavigateNext } from "react-icons/md";
import { toast } from "react-hot-toast";
import { editCourseDetails } from "../../../../../services/operations/coursesApis";
import { COURSE_STATUS } from "../../../../../UtilsVariable_Function/constanst_var_fun";
export default function CourseAddInformationForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  //   dropdown se categories select kar rhe hai to unko backend se call karna padega and yha ek variable me set karna padega
  const [courseCategories, setCourseCategories] = useState([]);

  // get all the categories from the backend s
  async function getCategories() {
    try {
      setLoading(true);
      const categories = await fetchAllCategory();
      //   means categories aa gyi hai so set kar do categories ko
      if (categories.length > 0) {
        setCourseCategories(categories);
      }

      setLoading(false);
    } catch (error) {
      // console.log("Getting error while fetching the course categories");
    }
  }

  useEffect(() => {
    getCategories();

    //   if we wanna update the form
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseImage", course.thumbnail);
      setValue("courseTags", course.tag);
      setValue("courseRequirements", course.instructions);
    }
  }, []);

  function isFormUpdated() {
    const currentValues = getValues();
    // it means form update hua hai so we return true
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseImage !== course.thumbnail ||
      // multiple values hai unko string me convert karta hai
      currentValues.courseTags._id !== course.tag._id ||
      // multiple values hai unko string me convert karta hai
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  }
  //jab form submit ho tab next button ko click karne par
  async function onSubmitFormHandler(data) {
    // es function me 2 operation ho sakte hai 1st is edit kar rha hu form kee feilds ko
    // 2nd is data ko input lekar ke next form me ja rha hu

    // 1st case if we edit the form
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        // jis felid kee value change hui hai uski value ko formdata ke andar push kar do
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }
        if (currentValues.courseTags._id !== course.tag._id) {
          formData.append("tag", data.courseTags);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes found");
      }
      return;
    }

    // 2nd case we come the form page 1st time so just set the value
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("thumbnail", data.courseImage);
    formData.append("tag", data.courseTags);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    setLoading(true);
    const response = await createCourse(formData, token);
    if (response) {
      dispatch(setStep(2));
      dispatch(setCourse(response));
    }
    setLoading(false);
    // console.log("All the formData is", formData);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitFormHandler)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        {/* Course Title */}
        <div>
          <label className="text-sm text-richblack-5" htmlFor="courseTitle">
            Course Title
            <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="courseTitle"
            name="courseTitle"
            placeholder="enter course title"
            {...register("courseTitle", { require: true })}
            className="w-full form-style"
          />
          {errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Title is required
            </span>
          )}
        </div>

        {/* Course ka discription  */}
        <div>
          <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
            Course Short Description
            <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            name="courseShortDesc"
            placeholder="Enter Discription"
            {...register("courseShortDesc", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Short Discription is required
            </span>
          )}
        </div>

        {/* course price  */}
        <div>
          <label className="text-sm text-richblack-5" htmlFor="coursePrice">
            Price
            <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              name="coursePrice"
              id="coursePrice"
              placeholder="Enter Price"
              className="form-style w-full !pl-16"
              {...register("coursePrice", {
                required: true,
                //   only numer take
                valueAsNumber: true,
                //   and price can contain 0-9 and $ me
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
            />
            {/* this is for currency logo  */}
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          </div>

          {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is required
            </span>
          )}
        </div>

        {/* course kee category  */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseCategory">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            id="courseCategory"
            name="courseCategory"
            //   by default koi category nhi dena hai
            defaultValue=" "
            {...register("courseCategory", { required: true })}
            className="form-style w-full"
          >
            {/* by default ye option dikhana hai option me  */}
            <option value={" "} disabled>
              Choose Category
            </option>
            {/* agar loding false that means abhi data api call se aa gya hai  */}
            {!loading &&
              courseCategories?.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
        </div>

        {/* for making tag- 1 input feild and enter karne me add ho jayega ya coma dene me 
        uske upar ek cross ka section aaega jisko click karne me me tag remove ho jayega  */}
        {/* imp hai  */}
        <TagAddInputChip
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValue={getValues}
        />

        {/* Course kee image or uska preview show karna hai  */}
        <UploadThumnail
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* benifits */}
        <div>
          <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
            Benifits of the course<sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* Requirements when you click the content is
         added and along with clear button when click on 
         clear button it removes the element from the ui */}

        <AddRequirements
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValue={getValues}
        />

        {/* 2 button  continue without save and goto next step  */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          {/* type=button karne par code fat rha tha  */}

          <IconBtnC
            // type="button"
            disabled={loading}
            text={`${!editCourse ? "Next" : "Save Changes"}`}
          >
            <MdNavigateNext />
          </IconBtnC>
        </div>
      </form>
    </>
  );
}
