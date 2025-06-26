import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../../../services/operations/authApis";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // password ko dikhana hai ya nhi uske leaye variable
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  function formDataHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(Login(email, password, navigate));
    // console.log(formData);
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex  flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={formDataHandler}
          placeholder="Enter email id"
          className="bg-richblack-800 rounded-[0.5rem]
           text-richblack-5 w-full px-20 py-[0.5rem]"
        />
      </label>

      {/* password ko show karna hai ya nhi uske leaye ek variable banakar ke
          usme dependent kar dete hai us variable kee value agar flase hai to 
          password hide rahega nhi to password show hoga text feild ke andar  */}

      {/* variable kee value false hone par ham use text jaise dikha denge that means
          visible kra denge nhi to password jaise dot dot dikha denge */}
      <label className="w-full relative">
        <p className="text-[0.9rem] text-richblack-5 mb-1 leading-[1.385rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          name="password"
          value={formData.password}
          onChange={formDataHandler}
          placeholder="Enter password"
          className="bg-richblack-800 rounded-[0.5rem]
          text-richblack-5 w-full px-20 py-[0.5rem]"
        />

        {/* icon ke click hone par password show ho rha hai ya nhi uske leaye ek
          onclick() event hoga jo setShowPassword() vale function se showPassword
          kee value ko true ya false karega  that means value true hai to false
          kar do or false hai to true kar do */}

        <span
          className="absolute top-[38px] right-3 cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {/* do icon hai ek eye vala hai or dusra eye ke upar cross pada hai
            in icon kee value showPassword name ke variable par depend karegi 
            agar showPassword variable kee value true hui to eye vala icon
             dikhana  hai nhi to cross vala icon dikhana hai */}
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={20} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="text-xs mt-1 text-blue-400 max-w-max ml-auto ">
            Forgot password
          </p>
        </Link>
      </label>

      <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 py-2 mt-6 ">
        Log In{" "}
      </button>
      <p className="text-white">Are you new? <span className="ml-[2px]  text-medium font-semibold text-blue-600 cursor-pointer" onClick={()=>navigate("/signup")}>Register Here</span></p>
    </form>
  );
}
export default LoginForm;
