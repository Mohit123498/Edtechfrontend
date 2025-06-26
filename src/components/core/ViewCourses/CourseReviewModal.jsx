import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import IconBtnC from "../../commonCodeandPage/IconBtnC";
import { createRating } from "../../../services/operations/coursesApis";
function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  // we need course data so 1st we have to fetch
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  // es function se rating kee entry db me store karenge
  // setReview modal ko close kar dunga
  async function onSubmitRating(data,e) {
    e.preventDefault();
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data?.courseRating,
        review: data?.courseExperience,
      },
      token
    );


    // after add review we have to close the reviewModal
    setReviewModal(false);
  }

  function ratingChanged(newRating) {
    // console.log("New Rating is ",newRating);
    setValue("courseRating", newRating);
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* modal header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
        <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 />
            close
          </button>
        </div>
        {/* modal body */}
        <div className="p-6">
        <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt="user_image"
              className=" aspect-square w-[40px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Post Publically</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitRating)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                htmlFor="courseExperience"
                className="text-sm text-richblack-5"
              >
                Add Your Experience
              </label>
              <textarea
                id="courseExperience"
                placeholder="Enter your feedback"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors?.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please add your feedback
                </span>
              )}
            </div>
            {/* cancle and save buttons */}
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button onClick={() => setReviewModal(false)}>Cancle</button>
              <IconBtnC text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseReviewModal;
