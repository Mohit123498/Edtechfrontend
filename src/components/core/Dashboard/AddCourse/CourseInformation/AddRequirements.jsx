// Interview question hai ye  todo app add item and remove from ui when you click on button

import React, { useEffect, useState } from "react";

export default function AddRequirements({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  //   we have to register and check whether its empty or not
  useEffect(() => {
    register(name, {
      required: true,
      // for some reason we have to comment this
      // validate: (value) => value.length > 0,
    });
  }, []);

  //   //   set value
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  // add requirements
  function addRequirement() {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  }

  //removeRequirements
  function removeRequirements(index) {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  }

  //Most Imp Todo app hai ye click karke list add karo or clear karke remove karo
  return (
    <div>
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
        <span className="text-pink-200">*</span>
      </label>
      <input
        type="text"
        id={name}
        placeholder="Enter Requirements"
        value={requirement}
        onChange={(event) => setRequirement(event.target.value)}
        className="form-style w-full"
      />
      <button
        type="button"
        onClick={addRequirement}
        className="font-semibold text-yellow-50"
      >
        Add
      </button>

      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((itemRequirement, index) => {
            return (
              <li key={index} className="flex items-center text-richblack-5">
                <span className="text-white">{itemRequirement}</span>
                <button
                  type="button"
                  onClick={() => removeRequirements(index)}
                  className="text-xs text-pure-greys-300"
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required{" "}
        </span>
      )}
    </div>
  );
}
