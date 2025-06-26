import React from "react";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import UpdatePasswordFromProfile from "./UpdatePasswordFromProfile";
import ChangeProfileImage from "../Settings/ChangeProfileImage";
function AllEditOprationHere() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* change the profile user image */}
      <ChangeProfileImage />
      {/* update name lastname and dob and gender*/}
      <EditProfile />

      {/* Update the user password  */}
      <UpdatePasswordFromProfile />

      {/* Delete the user account  */}
      <DeleteAccount />
    </>
  );
}

export default AllEditOprationHere;
