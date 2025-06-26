import React from "react";
import { useSelector } from "react-redux";
import IconBtnC from "../../../commonCodeandPage/IconBtnC";
import { buyCourse } from "../../../../services/operations/studentFeactureApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  function handleBuyCourse() {
    const courses = cart.map((course) => course._id);
    // console.log("our courses id are", courses);
    // h/w payment integration gateway

    buyCourse(token, courses, user, navigate, dispatch);
  }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">{total}</p>
      <IconBtnC
        text="Buy Now"
        customClasses="w-full justify-center"
        onclick={handleBuyCourse}
      />
    </div>
  );
}

export default RenderTotalAmount;
