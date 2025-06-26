import { Link } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import HighLightText from "../components/core/HomePage/HighLightText";
import ReUseButton from "../components/core/HomePage/ReUseButton";
import HomePageVideo from "../assets/Images/HomePageVideo.mp4";
import CodeBox from "../components/core/HomePage/CodeBox";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearngLanguageSection from "../components/core/HomePage/LearngLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/commonCodeandPage/Footer";
import ExploreMoreSection from "../components/core/HomePage/ExploreMoreSection";
import ReviewSlider from "../components/commonCodeandPage/ReviewSlider";
function Home() {
  return (
    <div>
      {/* section1 one Blue part  */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">
        {/* button */}
        <Link to="/signup">
          <div
            className="group mt-16 mx-auto rounded-full bg-richblack-800 text-richblack-100
                transition-all duration-200 hover:scale-95 w-fit "
          >
            <div
              className="flex flex-row items-center px-12 py-2 gap-4
                    group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <ImArrowRight2 />
            </div>
          </div>
        </Link>
        {/* heading  */}
        <div className="text-4xl font-semibold text-center mt-7">
          <p>
            Build Your Future with
            <HighLightText text={"Coding Skills"} />{" "}
          </p>
        </div>
        {/* subheading */}
        <div className=" mt-[1.2rem] w-[90%] text-center text-lg font-bold text-richblack-400">
          <p>
            {" "}
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.Our courses are designed and taught by industry experts
            who have years of experience in coding and are passionate about
            sharing their knowledge with you.
          </p>
        </div>
        {/* buttons color one  */}
        <div className=" mt-7 flex flex-row gap-7">
          <ReUseButton active={true} linkto={"/signup"}>
            Learn More
          </ReUseButton>
          <ReUseButton active={false} linkto={"/login"}>
            Book a Demo
          </ReUseButton>
        </div>

        {/* Add Video on home page */}
        <div className="mx-3 my-12 shadow-[10px_-5px_50px_-5px] w-[68%] shadow-blue-200 ">
          <video
            className=" shadow-[14px_14px_rgba(255,255,255)] rounded-md"
            muted
            loop
            autoPlay
          >
            <source src={HomePageVideo} type="video/mp4" />
          </video>
        </div>

        {/* code section 1  */}
        <div>
          <CodeBox
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighLightText text={" coding potential "} />
                with our online courses.
              </div>
            }
            subheading={`With our online coding courses, you can learn at your own pace, from
                        anywhere in the world, and get access to a wealth of resources,
                        including hands-on projects, quizzes, and personalized feedback from
                        instructors`}
            codeBtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            codeBtn2={{
              btnText: "Learn More",
              link: "/login",
              active: false,
            }}
            CodeColor={" text-yellow-500  font-bold"}
            codeContent={`<!DOCTYPE html>\n<html lang="en">\n <head>\n<meta charset="UTF-8">\n <meta name="viewport" content="width=device-width">\n<body>\n<h2>HTML Table</h2>\n<table style="Width:50% margin:0 auto">\n<tr>\n<th>Company</th>\n</tr>\n<tr style="border: 1px solid #dddddd">\n<td>Alfreds Futterkiste</td>\n</tr>\n</table>\n</body>\n</html>\n`}
            backgraoundGradiant={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBox
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighLightText text={" coding potential "} />
                with our online courses.
              </div>
            }
            subheading={`With our online coding courses, you can learn at your own pace, from
                        anywhere in the world, and get access to a wealth of resources,
                        including hands-on projects, quizzes, and personalized feedback from
                        instructors`}
            codeBtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            codeBtn2={{
              btnText: "Learn More",
              link: "/login",
              active: false,
            }}
            CodeColor={" text-yellow-400  font-bold"}
            codeContent={`#include <iostream>\n using namespace std;\n int BinarySearch(int arr[],int size, int target)\n{\n int start=0,end=size;\n int mid=start+(end-start)/2;\n while(start<=end) { \n if(target==arr[mid]) return mid;\n else if(target<arr[mid]) end=mid-1;\n else start=mid+1;\n mid=start+(end-start)/2; } \n return -1; }\n int main(){\n  int arr[]= {1,2,4,5,6,7};\n int isFound=BinarySearch(arr,6-1,5); \n cout<<"target found at index=> "<<isFound;  return 0;\n }\n`}
            backgraoundGradiant={<div className="codeblock2 absolute"></div>}
          />
        </div>
        <ExploreMoreSection />
      </div>

      {/* section 2 white part  */}

      {/* catelog white of home page  */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[340px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-6">
            <div className="lg:h-[150px]"></div>
            {/* Catelog Button */}
            <div className="flex flex-row gap-7 text-white lg:-mt-14 md:mt-4">
              <ReUseButton active={true} linkto={"/signup"}>
                <div className="flex flex-row items-center gap-3">
                  Explore Full Catalog
                  <ImArrowRight2 />
                </div>
              </ReUseButton>
              <ReUseButton active={false} linkto={"/login"}>
                <div className="flex flex-row items-center gap-3">
                  Learn More
                </div>
              </ReUseButton>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-7 ">
          {/*Top trending Jobs in Market  */}
          <div className="mb-8 mt-[-10px] flex flex-col justify-evenly gap-1 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighLightText text={"Job that is in trending"} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <p className="text-[16px]">
                The modern Study Adda is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <ReUseButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </ReUseButton>
            </div>
          </div>
        </div>

        {/* Time Line section */}
        <TimeLineSection />
        {/* Learnig Language rotate img part of home page  */}
        <LearngLanguageSection />
      </div>

      {/* section 3 again blue part  */}
      <InstructorSection />

      {/* Review Slider */}
      <h1 className="text-center text-4xl font-semibold mt-8 text-richblack-100">
        Reviews from our learners
      </h1>
      <ReviewSlider/>

      {/* section 5 footer */}
      <Footer />
    </div>
  );
}
export default Home;
