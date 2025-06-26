import React, { useEffect, useRef, useState } from "react";
// file upload icon
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
// this is for play mp3 video
import "video-react/dist/video-react.css"
import { Player } from "video-react"
function UploadThumnail({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  // const { course } = useSelector((state) => state.course);
  const [selectFile, setSelectFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const inputRef = useRef(null);

  // drag the image  yha par function ka name onDrop hee dena padega bcs error de rha hai dusra name dene par
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file);
      setSelectFile(file);
    }
  }

  //   we use  useDropzone() for upload image also need to pass below things inside it
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
      onDrop,
  });
  //   this is for check the preview view of an image
  function previewFile(file) {
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  //   set  the name property
  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectFile);
  }, [selectFile, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
        {!viewData && <span className="text-pink-200">*</span>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
          {!video ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            // yha par me aspectRatio ka value galt deaya tha to me fas gya tha yha par 
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancle
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            {/* this is for select the file from computer */}
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              {/*agar video me false so hame only image ko hee upload karna hao */}
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            {/* give the info about image so image should have these 2 things */}
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}

export default UploadThumnail;
