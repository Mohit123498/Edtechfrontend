import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ACCOUNT_TYPE } from "../../../UtilsVariable_Function/constanst_var_fun";
// npm i copy-to-clipbord install karo its a library by  which we can copy the link
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { FaShareSquare } from "react-icons/fa";
import { addToCart } from "../../../slice/cartSlice";

export default function CourseDetailsCard({
  course,
  findCourse,
  setConfirmationModal,
  handleBuyCourse,
}) {
  // get data from course so we can use here no need to write chaining syntex

  // console.log("finded courses ", findCourse);
  const { thumbnail, price } = course;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //   add course in card only student can add to card the course
  function handleAddToCard() {
    // only student can add items in card
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are Instructor, can't add the courses in card");
      return;
    }

    // only student can add
    if (token) {
      dispatch(addToCart(course));
      return;
    }

    // if user is not login so he/she can not add the item in card
    if (!token) {
      setConfirmationModal({
        text1: "You are not Logged In !!",
        text2: "Please Login In to Add course in WishList",
        btn1Text: "Login",
        btn2Text: "Cancle",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });

      return;
    }

    // other wise set the confirmation modal

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(navigate("/login")),
      btn2Handler: () => setConfirmationModal(null),
    });
  }

  //   If you wanna share the course so use
  const handleShare = () => {
    // copy ko install kar lo react me uski help se url copy kar sakte hai

    // jo bhi link ko copy karna hai use copy()function ke andar de do
    // window.location.href es se current page ka url nikal sakte hai
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* thumbnail of course  */}
        <img
          src={thumbnail}
          alt={`${course.courseName}`}
          className="max-h-[280px] min-h[160px] w-[370px] rounded-xl"
        />

        {/* price  */}

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {price}
          </div>
          {/* buttons */}
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton"
              onClick={
                user && course?.studentEnrolled.includes(user?._id)
                  ? () => dispatch(navigate("/dashboard/enrolled-courses"))
                  : () => handleBuyCourse()
              }
            >
              {/* agar mere user schema ke andar jo enrolled courses ka array hai
            uske andar user kee id hai to it means user already buy the course
            so use go to cart me le jao nhi to buy karao */}
              {user && course?.studentEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {/* add to card tabhi show karnege jab user course me enroll na ho  */}
            {!user ||
              (!course?.studentEnrolled.includes(user?._id) && (
                <button onClick={handleAddToCard} className="blackButton">
                  Add to Cart
                </button>
              ))}
          </div>

          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              7 Days Money back Guarantee
            </p>
          </div>

          {/* Give the breif about course  */}
          <div>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>

            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {/* {findCourse?.tag?.map((item, index) => {
                return ( */}
                  <p className={`flex gap-2`}>
                    <BsFillCaretRightFill />
                    <span>{findCourse.courseDetails?.tag}</span>
                  </p>
                {/* ); */}
              {/* })} */}
            </div>
          </div>

          {/* share the link of course  */}
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
