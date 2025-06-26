import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/api";
import getCatalogPageData from "../services/operations/getCatalogPageData.js";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage.jsx";
import Footer from "../components/commonCodeandPage/Footer.jsx";
import CourseSlider from "../components/core/CatalogComponent/CourseSlider.jsx";
import CourseCard from "../components/core/CatalogComponent/CourseCard.jsx";
function Catalog() {
  const { catalogName } = useParams();
  const [catlogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const { loading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);
  //   get all categories
  useEffect(() => {
    async function getCategories() {
      const result = await apiConnector("GET", categories.SHOW_ALL_CATEGORIES);
      // console.log("All the category and there courses inside that category are=> ", result);
      const category_id = result?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("").toLowerCase() === catalogName
      )[0]._id;

      // console.log("We got the category id is ", category_id);
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    async function getCategoryPageInfo() {
      try {
        const response = await getCatalogPageData(categoryId);
        // console.log("Category ke andar courses : ", response);
        setCatalogPageData(response);
      } catch (error) {
        // console.log("Getting this error");
      }
    }
    if (categoryId) {
      getCategoryPageInfo();
    }
  }, [categoryId]);

  if (loading || !catlogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catlogPageData.success) {
    return <ErrorPage />;
  }
  return (
    <>
      {/* Top level */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-white ">
            {`Home/Catalog/`}
            <span className="text-yellow-25">
              {catlogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catlogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catlogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* category courses */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        {/* section1 */}
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm max-sm:flex-col">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Trending Now
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="py-8">
          <CourseSlider
            courses={catlogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          <p>Top Courses in {catlogPageData?.data?.selectedCategory?.name} </p>
          <div className="py-8">
            <CourseSlider
              courses={catlogPageData?.data.selectedCategory?.courses}
            />
          </div>
        </div>
      </div>

      {/* section 3  */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid max-sm:grid-cols-1 gap-6 lg:grid-cols-2 max-sm:flex-col max-sm: pr-10 max-sm:pl-2">
 
            {catlogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, index) => (
                <CourseCard course={course} key={index} height="h-[420px]" />
              ))}
          </div>
        </div>
      </div>



       {/* section 2 */}
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          <p>Other Courses </p>
          <div className="py-8">
            <CourseSlider
              courses={catlogPageData?.data.differentCategory?.courses}
            />
          </div>
        </div>
      </div>

      {/* at the end our footer */}
      <Footer />
    </>
  );
}

export default Catalog;
