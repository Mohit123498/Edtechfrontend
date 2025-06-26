import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../commonCodeandPage/RatingStars";
import getAvgRating from "../../../UtilsVariable_Function/avgRating";
import { useEffect } from "react";
function CourseCard({ course, height }) {
  // for showing the stars
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = getAvgRating(course?.ratingAndReviews);
    // console.log("Ratings ", count);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
    <Link to={`/courses/${course?._id}`}>
      <div className="flex flex-col lg:flex-row lg:items-start p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <img
            src={course?.thumbnail}
            alt="thumbnail"
            className={`${height} w-full rounded-xl  object-fill `}
            />
        </div>
        <div className="flex flex-col gap-2 px-4 py-3 w-full lg:w-2/3">
          <p className="text-xl font-semibold text-richblack-5">{course?.courseName}</p>
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-yellow-500">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
          </div>
          <p className="text-xl font-bold text-richblack-5">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  </div>
  
  );
}

export default CourseCard;
