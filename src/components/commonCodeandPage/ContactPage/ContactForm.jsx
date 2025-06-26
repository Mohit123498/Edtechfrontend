import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { ContactUs } from "../../../services/operations/contactForm";
function ContactForm() {
  const [loading] = useState(false);
  // we did not use here auth slice loading variable bcs vo only authentications ke leaye use hogi
  // register flag chack our data submit or not
  // handleSumbit flag is used to what operation we have to
  // perform after submission of form
  // reset flag is used to after submit the form we have to reset all the input feilds

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    dispatch(
      ContactUs(
        data.firstName,
        data.lastName,
        data.email,
        data.message,
        data.phone,
        data.countrycode
      )
    );
    // console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          firstName: " ",
          lastName: " ",
          email: " ",
          message: " ",
          phone: " ",
          countrycode: " ",
        },
        // reset () function functionality provide react thatswhy we pass reset here
        [reset, isSubmitSuccessful]
      );
    }
  });
  return (
    <div className="w-[70%] max-md:w-[80%] mx-auto mt-4">
      <form onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex flex-col gap-4 mb-20">
          <div className="flex flex-col gap-5 lg:flex-row ">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[16px] text-pink-100 font-semibold opacity-90 ">
                  Please Enter Your First Name
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder=" Enter Last Name"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                {...register("lastName", { required: false })}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-[16px] text-pink-100 font-semibold opacity-90">
                Please enter email
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="lable-style">
              Phone Number
            </label>

            <div className="flex gap-5">
              <div className="flex w-[81px] flex-col gap-2">
                <select
                  name="countrycode"
                  id="countrycode"
                  className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                  {...register("countrycode", { required: true })}
                >
                  {countrycode.map((country, index) => {
                    return (
                      <option key={index}>
                        {country.code} -{country.country}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="1234 6578 8873"
                  className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Please enter your Phone Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Phone Number" },
                    minLength: { value: 8, message: "Invalid Phone Number" },
                  })}
                />
                 {errors.phone && (
              <span className="-mt-1 text-[16px] text-pink-100 font-semibold opacity-90">
                Please enter Mobile Number
              </span>
            )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="message">Message</label>
            <textarea
              cols={30}
              rows={10}
              id="message"
              name="message"
              placeholder="Enter your message"
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="-mt-1 text-[16px] text-pink-100 font-semibold opacity-90 ">
                Please enter your message
              </span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
