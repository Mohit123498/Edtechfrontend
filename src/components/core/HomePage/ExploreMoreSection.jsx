import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';
import HighLightText from './HighLightText';
const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];
function ExploreMoreSection() {

    const [currentTab, setCuurentTab] = useState(tabName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    function setCard(value) {
        setCuurentTab(value);
        const result = HomePageExplore.filter((course) =>
            course.tag === value
        );
        setCourses(result[0].courses);

        setCurrentCard(result[0].courses[0].heading);
    }
    return (
        <div>
            <div>
                <div className="text-4xl font-semibold text-center my-10">
                    Unlock The <HighLightText text={"Power of code "} />
                    <p className="text-center text-richblack-300 text-lg font-semibold mt-1">Learn to Build Anything You Can Imagine
                    </p>
                </div>
            </div>
            {/* Navigation Tab section */}
            <div className="max-sm:flex-col max-sm:mb-10   lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 lg:rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] ">
                {tabName.map((element, index) => {
                    return (<div className={`
                    text-[14px] flex flex-row items-center gap-2 
                    ${currentTab === element ? " bg-richblack-900 text-richblack-5 font-medium" :
                            " text-richblack-200"} px-4 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `}
                        key={index}
                        onClick={() => setCard(element)}
                    >
                        {element}
                    </div>)
                })}
            </div>
            <div className="hidden lg:block lg:h-[50px]"></div>

            {/* Group the cards  */}
            <div className=' w-11/12 flex flex-row gap-5 -mb-14 max-sm:flex max-sm:flex-col md:flex max-sm:mb-10 md:mb-10 max-sm:items-center'>
                {courses.map((card, index) => {
                    return (<CourseCard
                        cardData={card}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        key={index}
                    />)
                })}
            </div>


        </div>
    )
}
export default ExploreMoreSection;
