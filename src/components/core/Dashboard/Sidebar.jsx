import React, { useState } from "react";
import Loader from "../../commonCodeandPage/Loader";
import Sidebarlink from "./Sidebarlink";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../commonCodeandPage/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authApis";
import { sidebarLinks } from "../../../data/dashboard-links";
import { VscSignOut, VscMenu,VscClose } from "react-icons/vsc";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // way of given name of specific loading var of slices
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  // at the starting we dont have data of confirmationModal so normally we set null
  const [confirmationModal, setConfirmationModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   jab bhi or authloading and profile loading kee value true hogi i have to see loader on UI
  if (authLoading || profileLoading) {
    return (
      <div className="mt-18">
        <Loader />
      </div>
    );
  }

  return (
    <>
       <button
        className="absolute top-4 left-4 z-10 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <VscMenu className="text-2xl text-richblack-300" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-20 md:relative md:block h-[calc(100vh-3.5rem)] w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 md:flex`}
      >
        {/* Close Button for Mobile Sidebar */}
        {isSidebarOpen && (
          <button
            className="absolute top-4 right-4 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <VscClose className="text-2xl text-richblack-300" />
          </button>
        )}

        <div className="flex flex-col px-4">
          {sidebarLinks.map((link) => {
            if (link?.type && user?.accountType !== link?.type) return null;
            return (
              <Sidebarlink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-auto mt-8 mb-10 h-[1px] w-11/12 bg-richblack-600"></div>

        {/* Settings and Logout */}
        <div className="flex flex-col">
          <Sidebarlink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be Logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  dispatch(logout(navigate));
                },
                btn2Handler: () => {
                  setConfirmationModal(null);
                },
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-3">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default Sidebar;
