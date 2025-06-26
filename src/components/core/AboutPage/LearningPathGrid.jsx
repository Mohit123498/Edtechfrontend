import React from "react";
import HighLightText from "../HomePage/HighLightText";
import ReUseButton from "../HomePage/ReUseButton";

const LearningPathArray = [
  {
    // order-1 means i have to span this data in  2 columns
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Study Adda partners with more than 75+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Study Adda partners with more than 75+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Study Adda partners with more than 75+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Study Adda partners with more than 75+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Study Adda partners with more than 75+ leading universities and companies to bring",
  },
];

function LearningPathGrid() {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningPathArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[296px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[296px]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0 sm:gap-2">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighLightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <ReUseButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </ReUseButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default LearningPathGrid;
