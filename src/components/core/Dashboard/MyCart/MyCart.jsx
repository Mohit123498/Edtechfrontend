import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
function MyCart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  useEffect(() => {
  }, [total, totalItems]);
  // console.log("total and totalItems from slice", total, totalItems);
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart{" "}
      </p>
      {/* check if total zero se grater hai that means cart hai so inthis 
      condition we show the cart along with totalAmmount cart modal */}
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          There is no item in cart
        </p>
      )}
    </>
  );
}

export default MyCart;
