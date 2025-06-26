import React, { useState } from "react";

//1 npm charts website se ham pi chart create karenge npm i chart.js
import { Chart, registerables } from "chart.js";

//2 install pie by npm i react-chartjs-2
import { Pie } from "react-chartjs-2";
// 3 after install you have to register
Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // kon sa chart so karn ahai  student ka income ka
  const [currentChart, setCurrentChar] = useState("student");

  // get Random color for chart when open student or income chart that time every time come diff color
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      // r color ke combination ke leaye 3 bar call keaye hai
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.totalStudentEnrolled),
        backgroundColor: generateRandomColors(courses?.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course?.totalCourseAmountOfSellingCourse),
        backgroundColor: generateRandomColors(courses?.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p  className="text-lg font-bold text-richblack-5">Visualize</p>
      <div>
        <button onClick={()=>setCurrentChar("student")}
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "student"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}>Student</button>
        <button onClick={()=>setCurrentChar("earning")}
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "earning"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >Earning</button>
        <div>
          <Pie
            data={
              currentChart === "student" ? chartDataStudents : chartIncomeData
            }
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
