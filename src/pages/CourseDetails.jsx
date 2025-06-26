import React, { useState,useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import toast from "react-hot-toast";
import { formatDate } from "../services/formateDate";
import { ACCOUNT_TYPE } from "../UtilsVariable_Function/constanst_var_fun";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeactureApi";
import { getCourseDetails } from "../services/operations/coursesApis";
import getAvgRating from "../UtilsVariable_Function/avgRating";
import ErrorPage from "../pages/ErrorPage";
import RatingStars from "../components/commonCodeandPage/RatingStars";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import ConfirmationModal from "../components/commonCodeandPage/ConfirmationModal";
import Footer from "../components/commonCodeandPage/Footer";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import addToCart from "../slice/cartSlice";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // destructure karke object id ko nikalna hai
  const { courseId } = useParams();
  // console.log("courseId is ", courseId, "token=>", token);

  const [CourseIn, setCourseIn] = useState(null);

  // Declear a state to save the course details
  const [courseData, setcourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        // Calling fetchCourseDetails fucntion to fetch the details
        const res = await getCourseDetails(courseId);
        // console.log("course details response api : ", res);
        setcourseData(res);
        setCourseIn(res?.data);
      } catch (error) {
        // console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId]);

  // console.log("course Data are !!  ", courseData);
  // console.log("course n me ",CourseIn);

  // calculating avg review count
  useEffect(() => {
    const count = getAvgRating(
      courseData?.data?.courseDetails.ratingAndReviews
    );
    setAvgReviewCount(count);
  }, [courseData]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  //get the  Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((section) => {
      lectures += section.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  // abhi loading ho rhi ya courseData nhi aaya to us case me me spineer show karunga
  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // agar course ka data aaya hee nhi to error page show kar denge
  if (!courseData?.success) {
    return <ErrorPage />;
  }

  //   call the buyCourse handler
  function handleBuyCourse() {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are Instructor, can't Buy the courses in card");
      return;
    }
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    // than show the confirmation modal standard way show karenge
    setConfirmationModal({
      text1: "You are not Logged In !!",
      text2: "Please Login In to buy the course",
      btn1Text: "Login",
      btn2Text: "Cancle",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // fetch the data so donot need to write chaning syntex everytime
  const {
    // _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails;

  const course = courseData?.data?.courseDetails;

  // ADD TO CART

  //   add course in card only student can add to card the course
  function handleAddToCard() {
    // only student can add items in card
    // console.log("ERROR GETTING ");

    if (user && user?.accountType === ACCOUNT_TYPE?.INSTRUCTOR) {
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

  // extract the course
  return (
    <>
      <div className={`relative w-full bg-richblack-800 `}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <button
              onClick={() => navigate(-1)}
              className="yellowButton w-fit mt-10 ml-4"
            >
              Back to Category Page
            </button>
            <div className="relative block max-h-[30rem] mt-8">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-lg lg:hidden"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews?.length} reviews)`}</span>
                <span>{`${studentEnrolled?.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By{" "}
                  {`${instructor?.firstName} ${instructor?.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  {/* language icon we hardcoded  */}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <div className="flex flex-col gap-4">
                <button
                  className="yellowButton"
                  onClick={
                    user?.accountType === ACCOUNT_TYPE.STUDENT &&
                    course?.studentEnrolled.includes(user?._id)
                      ? () => navigate("/dashboard/enrolled-courses")
                      : () => handleBuyCourse()
                  }
                >
                  {user?.accountType === ACCOUNT_TYPE.STUDENT &&
                  course?.studentEnrolled.includes(user?._id)
                    ? "Go To Course"
                    : "Buy Now"}
                </button>
                {
                  !(
                    user?.accountType === ACCOUNT_TYPE.STUDENT &&
                    course?.studentEnrolled.includes(user?._id) && (
                      <button onClick={handleAddToCard} className="blackButton">
                        Add to Cart
                      </button>
                    )
                  )
                }
              </div>
            </div>
          </div>

          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              findCourse={CourseIn}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>

        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
            {/* What will you learn section */}
            <div className="my-8 border border-richblack-600 p-8">
              <p className="text-3xl font-semibold">What you'll learn</p>
              <div className="mt-5">
                <Markdown>{whatYouWillLearn}</Markdown>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="max-w-[830px] ">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <span>
                      {courseContent?.length} {`section(s)`}
                    </span>
                    <span>
                      {totalNoOfLectures} {`lecture(s)`}
                    </span>
                    <span>
                      {courseData?.data?.totalDuration} Total Duration
                    </span>
                  </div>
                  <div>
                    <button
                      className="text-yellow-25"
                      onClick={() => setIsActive([])}
                    >
                      Collapse all sections
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Details Accordion */}
              <div className="py-4">
                {courseContent?.map((course, index) => (
                  <CourseAccordionBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>

              {/* Author Details */}
              <div className="mb-12 py-4">
                <p className="text-[28px] font-semibold">Author</p>
                <div className="flex items-center gap-4 py-4">
                  <img
                    src={
                      instructor?.image
                        ? instructor.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                    }
                    alt="Author"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <p className="text-lg">{`${instructor?.firstName} ${instructor?.lastName}`}</p>
                </div>
                {/* this is for about the instructor */}

                <p className="text-richblack-50">
                  {instructor?.additionalDetails?.about}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
}
export default CourseDetails;
