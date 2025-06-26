import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import IconBtnC from "../../../commonCodeandPage/IconBtnC";
import { FiUpload } from "react-icons/fi";
import { updateProfileImageOfUser } from "../../../../services/operations/profileApis";
function ChangeProfileImage() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  /*The useRef Hook allows you to persist values between renders.
  It can be used to store a mutable value that does not cause a re-render when updated.
  It can be used to access a DOM element directly.
  */ 
 const fileInputRef = useRef(null);
  function handleClick() {
    fileInputRef.current.click();
    // console.log("upload");
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  // for check the preview of the profile

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // upload the image file  in cloudinary
  function handleFileUpload() {
    try {
      setLoading(true);
      const formData = new FormData();
      // updateProfileImage is name in postman se photo ko
      // ko upload kar rhe hai same name yha par bhi use karna padega  by which we get the photo from form
      
      formData.append("updateProfileImage", imageFile);
      // console.log("Uploading Image");
      // console.log("formdata is ", formData);
      // console.log("image has some values are ",imageFile);
      dispatch(updateProfileImageOfUser(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      // console.log("getting error while upload an image ", error.message);
    }
  }
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[48px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p>Change Profile Picture</p>
          <div className="flex gap-3 max-md:flex-col">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtnC
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtnC>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfileImage;
