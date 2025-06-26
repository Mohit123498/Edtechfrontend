import React, { useState } from "react";
// for making the table by react table this is responsive one
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
// style of react table
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formateDate";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { COURSE_STATUS } from "../../../../UtilsVariable_Function/constanst_var_fun";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../commonCodeandPage/ConfirmationModal";
import { deleteCourse } from "../../../../services/operations/coursesApis";
import { getInstructorCourses } from "../../../../services/operations/coursesApis";
function CourseTable({ courses, setCourses }) {
  const TRUNCATE_LENGTH = 30;
  // const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  // delete the course
  async function deleteCourseHandler(courseId) {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await getInstructorCourses(token);
    if (result) {
      // ye hamara Mycourses ke anadr se jo send keaya tha vonvala array hai
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  }

  return (
    <div className="overflow-x-auto p-4 md:p-8">
    <Table className="min-w-full bg-richblack-900 rounded-xl border border-richblack-800 shadow-md">
      <Thead>
        <Tr className="bg-richblack-800 rounded-t-md border-b border-b-richblack-800">
          <Th className="text-left text-sm font-medium uppercase text-richblack-100 px-6 py-4">
            Courses
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100 px-6 py-4">
            Duration
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100 px-6 py-4">
            Price
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100 px-6 py-4">
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses.length === 0 ? (
          <Tr>
            <Td
              className="py-10 text-center text-2xl font-medium text-richblack-100"
              colSpan="4"
            >
              No courses found
            </Td>
          </Tr>
        ) : (
          courses?.map((course) => (
            <Tr key={course._id} className="border-b border-richblack-800">
              <Td className="flex items-center gap-4 px-6 py-4">
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className="h-[148px] w-[220px] rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300 mt-1">
                    {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                      ? course.courseDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : course.courseDescription}
                  </p>
                  <p className="text-[12px] text-white mt-1">
                    Created: {formatDate(course.createdAt)}
                  </p>
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100 mt-2">
                      <HiClock size={14} /> Drafted
                    </p>
                  ) : (
                    <div className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100 mt-2">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                        <FaCheck size={8} />
                      </div>
                      Published
                    </div>
                  )}
                </div>
              </Td>
              <Td className="text-sm font-medium text-richblack-100 px-6 py-4">
                2.30
              </Td>
              <Td className="text-sm font-medium text-richblack-100 px-6 py-4">
                ₹{course.price}
              </Td>
              <Td className="text-sm font-medium text-richblack-100 px-6 py-4 space-x-2 flex items-center">
                <button
                  disabled={loading}
                  onClick={() =>
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }
                  className="transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Do you want to delete this course?",
                      text2:
                        "All the data related to this course will be deleted",
                      btn1Text: !loading ? "Delete" : "Loading...",
                      btn2Text: "Cancel",
                      btn1Handler: !loading
                        ? () => deleteCourseHandler(course._id)
                        : () => {},
                      btn2Handler: !loading
                        ? () => setConfirmationModal(null)
                        : () => {},
                    });
                  }}
                  className="transition-all duration-200 hover:scale-110 hover:text-red-500"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  
    {/* Render the confirmation modal if data exists */}
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </div>
  
  );
}

export default CourseTable;
