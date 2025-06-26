import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slice/cartSlice";
import ReactStars from "react-rating-stars-component";
function RenderCartCourses() {
  const dispatch = useDispatch();
  // get the cart data from cartSlice
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className="flex flex-1 flex-col">
      {" "}
      {cart.map((course, index) => {
        return (
          <div
            key={index}
            className={`flex w-full flex-wrap items-start justify-between  ${
              index !== cart.length - 1 &&
              "border-b border-b-richblack-400 pb-6"
            } ${index !== 0 && "mt-6"} `}
          >
            {/* making left part of cart */}

            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img
                src={course.thumbnail}
                alt="cardLogo"
                loading="lazy"
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">
                  {course.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course.category.name}
                </p>
                {/* we make the api call for show the average ratings of course */}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-5">4.8</span>
                  {/* stars ko dikhane ke leaye react stat name ka component ko use kar sakte hai 
                npm i react-rating-stars-component just install add use */}
                  <ReactStars
                    count={5}
                    // onChange={ratingChanged}
                    edit={false}
                    size={24}
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                    activeColor="#ffd700"
                  />
                  <span className="text-richblack-400">
                    {course?.ratingAndReviews?.length} Ratings
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
              >
                <RiDeleteBin5Line />
                <span>remove</span>
              </button>
              <p className="mb-6 text-3xl font-medium text-yellow-100">
                Price ₹ {course.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RenderCartCourses;
