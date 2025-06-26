import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

function TagAddInputChip({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [tags, setTag] = useState([]);

  //   add tag
  useEffect(() => {
    if (editCourse) {
      setTag(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name,tags);
    // tag kee value jab bhi change hoga tab ye set karega
  }, [tags]);

  function addTagEnterAndCommaHandler(event) {
    // Check if user presses "Enter" or "," so add tag

    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event

      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const tagValue = event.target.value.trim();
      // Check if the input Tagvalue exists and is not already in the tag array

      if (tagValue && !tags.includes(tagValue)) {
        const netTagArray = [...tags, tagValue];
        setTag(netTagArray);
        event.target.value = "";
      }
    }
  }

  function removeTag(tagIndex) {
    const newTag = tags.filter((_, singleTag) => singleTag !== tagIndex);
    setTag(newTag);
  }
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the chips and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the chips array and render each chip */}
        {tags.map((singleTag, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {singleTag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 focus:outline-none"
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          // jab bhi key ko press karenge ye function call hoga 
          onKeyDown={addTagEnterAndCommaHandler}
          className="form-style w-full"
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}

export default TagAddInputChip;
