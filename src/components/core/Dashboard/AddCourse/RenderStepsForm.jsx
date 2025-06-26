import React from "react";
import { FaCheck } from "react-icons/fa";
import PublishCourse from "./PublishCourse/PublishCourse";
import { useSelector } from "react-redux";
import CourseAddInformationForm from "./CourseInformation/CourseAddInformationForm";
import AddCourseBuilderForm from "./CourseBuilder/AddCourseBuilderForm";
// app jis step me hai vo form show karna hai
function RenderStepsForm() {
  const { step } = useSelector((state) => state.course);
  // By default ham step no. 1 me rhte hai that means add course Information form, vala form show karna hai
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    { id: 2, title: "Course Builder" },

    { id: 3, title: "Course Publish Form" },
  ];

  return (
    <div>
      <div className="relative mb-2 flex w-full justify-center">
        {steps?.map((stepForm,index) => {
          return (
            <div key={index}>
              {/* we have to use key here  */}
              <div className="flex flex-col items-center  ml-10">
                {/* step===stepForm.id equal hai to button ko dark kar do yello se  */}
                <button
                  className={`
                flex cursor-default aspect-square w-[34px] rounded-full align-baseline items-center justify-evenly text-center
                ${
                  step === stepForm.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }
            //   first form se aage nikar gay se first form ke icon ko yello kar do 
              ${step > stepForm.id && "bg-yellow-50 text-yellow-50"}}
              `}
                >
                  {/* jaise hee form step no. vala complete ho gya to step kee jagah ek icon lga do 
                nhi to item kee id hee show kar do vha par */}
                  {step > stepForm.id ? (
                    <FaCheck className="font-bold text-richblack-900" />
                  ) : (
                    stepForm.id
                  )}
                </button>
              </div>

              {/* this is used for make the dash border line b/w the forms  */}
              {stepForm.id !== steps.length && (
                <div className=" flex items-center justify-center">
                  <div
                    className={`mt-4  w-full  border-dashed border-b-2 ${
                      step > stepForm.id
                        ? "border-yellow-50"
                        : "border-richblack-500"
                    } `}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* show the heading of form jis form me ham hai  */}
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-25" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>

      {/* step ke according form show karna hai agar ham 1st step me hai to
      Course Information vala form step 2 me hai to CourseBuilder vala form step 
      3 me hai to Course Publish vala form */}
      {step === 1 && <CourseAddInformationForm />}
      {step === 2 && <AddCourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
}

export default RenderStepsForm;
