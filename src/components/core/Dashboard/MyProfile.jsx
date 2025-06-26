import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtnC from "../../commonCodeandPage/IconBtnC";
import { RiEditBoxLine } from "react-icons/ri";
import { FormatedDate } from "../../../UtilsVariable_Function/FormateDate";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 md:p-12 text-center md:text-left">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtnC text="Edit" onClick={() => navigate("/dashboard/settings")}>
          <RiEditBoxLine />
        </IconBtnC>
      </div>

      {/* Section 2 */}
      <div className="my-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 md:p-12">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtnC text="Edit" onClick={() => navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtnC>
        </div>
        <p
          className={`text-sm font-medium ${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 md:p-12 text-center md:text-left">
        <div className="flex flex-col gap-5 mb-4 md:mb-0 md:mr-8">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:ml-8">
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contact ?? "Add Mobile Number"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {FormatedDate(user?.additionalDetails?.dateOfBirth) ??
                "Add Date Of Birth"}
            </p>
          </div>
        </div>
        <IconBtnC text="Edit" onClick={() => navigate("/dashboard/settings")}>
          <RiEditBoxLine />
        </IconBtnC>
      </div>

      {/* Section 4 */}
      <div className="flex items-center justify-evenly rounded-md border border-richblack-700 bg-richblack-800 p-4 mt-6">
        <p className="text-sm text-richblack-200">Account Type</p>
        <p className="text-sm font-medium text-richblack-5">
          {user?.accountType}
        </p>
      </div>
    </div>
  );
}

export default MyProfile;
