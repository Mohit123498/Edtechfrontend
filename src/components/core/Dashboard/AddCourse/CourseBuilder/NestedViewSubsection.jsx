import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import AddSubSectionModal from "./AddSubSectionModal";
import { setCourse } from "../../../../../slice/courseSlice";
import ConfirmationModal from "../../../../commonCodeandPage/ConfirmationModal";
import { deleteSection } from "../../../../../services/operations/coursesApis";
import { deleteSubSection } from "../../../../../services/operations/coursesApis";
function NestedViewSubsection({ editChangedSectionNameHandler }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  // delete the section
  async function deleteSectionHandler(sectionId) {
    // console.log("secion id is are ", sectionId);
    // console.log(" your course id is ", course._id);
    let result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );
    if (result) {
      // update the course
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  }

  // delete subsection
  async function deleteSubSectionHandler(subSectionId, sectionId) {
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
      },
      token
    );
    if (result) {
      /*updated subsection vala api response me updated section return kar rhi hai course return nhi kar rhi hai
      that why hamne updated section ko niklker ke course me set keaya hai direct course set nhi kar sakte hai
      so hame updates section ka use karke course banana padega*/

      // update the course
      // tnink some extra thing hamne backend kee api me response me data ko retunr nhi karaya tha thats why hamari ui render nhi ho rhi thi
      // subsection delete hue to hame filter data ko hee set karna hai course ke andar

      //  course.courseContent ye hamara slice vala data hai
      const updateResult = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      // create the updated course
      const updatedCourse = { ...course, courseContent: updateResult };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  }

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          <details  open key={section._id}>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2" >
              <div className="flex items-center gap-x-3" >
                {/* sectionName ke aage jo button hai */}
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              {/* edit vale icons and button */}
              <div className="flex items-center gap-x-3">
                {/* Section ka name edit karta hai */}
                <button
                  onClick={() =>
                    editChangedSectionNameHandler(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <BiSolidEditAlt className="text-xl text-richblack-300" />
                </button>
                {/* section ko delete karta hai  */}
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete This Section?",
                      text2: "All the Lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancle",
                      btn1Handler: () => deleteSectionHandler(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>

                {/* button ke beech me line  */}
                <span className="font-medium text-richblack-300">|</span>
                {/* section ke andar subsection ko dekhne ke leaye ya create karne ke leaye  */}
                <AiFillCaretDown className="text-xl text-richblack-300" />
              </div>
            </summary>

            {/* Add the subsection details  */}
            <div className="px-6 pb-4">
              {section.subSection.map((data) => (
                // es div me click karne par ek modal open hota hai
                <div
                  key={data?.id}
                  // yha par mene direct call keaya tha to ye infinite loop me chala gya
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  {/* ye section ka name or uske side me dropdown  */}
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>

                  {/* hamne pure div me onclick par setViewSubSection(data) ko
                  ko set keaya hai but hamne ye edit and delete ke vali button ke case me nhi chaheaye thatswhy we did here  
                  e.stopPropagation() */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    {/* edit button */}
                    <button
                      onClick={() =>
                        setEditSubSection({
                          ...data,
                          sectionId: section._id,
                        })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>

                    {/* delete button which open confirmataion modal */}
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete This SubSection",
                          text2: "Current Lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancle",
                          btn1Handler: () => {
                            deleteSubSectionHandler(data._id, section._id);
                          },
                          btn2Handler: () => {
                            setConfirmationModal(null);
                          },
                        });
                      }}
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Lecture in subsection Button */}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
        {/* addsection ke andar koi data hai to add subsection modal show karna hai
        whenever we click on section so subsection modal form aata hai and edit
        me clik karne me edit subsection ka form aata hai and delete me clcik
        karne par delete vala modal aata hai addsection ke andar koi data hai to
        add subsection modal show karna hai nhi hai to viewsubsection ke andar
        check karo if data available so so uska subsection vala modal dikha do
        vala modal dikha do agar vo bhi nhi to edit subsection ko dekha usme
        data hai to uska subsection modal dikha do nhi to simple ek div show kar */}
        {addSubSection ? (
          <AddSubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />
        ) : viewSubSection ? (
          <AddSubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />
        ) : editSubSection ? (
          <AddSubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        ) : (
          <div></div>
        )}
        {confirmationModal ? (
          <ConfirmationModal modalData={confirmationModal} />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default NestedViewSubsection;
