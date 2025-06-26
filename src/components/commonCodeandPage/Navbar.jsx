import React, { useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
// import Logo from "../../assets/Logo/StudyAddaLogoLarge.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart,AiOutlineClose } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { categories } from "../../services/api";
import { apiConnector } from "../../services/apiConnector";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // To define the color of navlinks
  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  // console.log("In home cart total Items in Cart", totalItems);
  async function getAllCategory() {
    try {
      setLoading(true);

      const response = await apiConnector(
        "GET",
        categories.SHOW_ALL_CATEGORIES
      );
      // console.log("Our api Response for get all category ", response.data.data);
      setSubLinks(response?.data?.data);
    } catch (error) {
      // console.log(
      //   "Found error while fetching the getAll courses Category api",
      //   error
      // );
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllCategory();
  }, []);



  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setCatalogOpen(false); // Close the catalog dropdown when the menu is toggled
    }
  };

  const toggleCatalog = () => {
    setCatalogOpen(!catalogOpen);
  };

  return (
    <div className="relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <h1 id="brand" className="text-lg md:text-2xl">StudyAdda</h1>
        </Link>

        {/* Navigation Links for large screens */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link?.title === "Catalog" ? (
                  <div
                    className={`group relative flex items-center gap-2 cursor-pointer
                      ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                  >
                    {link?.title}
                    <IoIosArrowDropdown />
                    <div
                      className="invisible absolute left-[50%] top-[50%] z-[100] flex w-[220px] translate-x-[-50%] translate-y-[2.9em]
                        flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900
                        opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[250px]"
                    >
                      <div
                        className="absolute left-[50%] top-0
                          -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%]
                          rotate-45 select-none rounded bg-richblack-5"
                      ></div>
                      {loading ? (
                        <p className="text-center">loading ...</p>
                      ) : (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length >= 0)
                          .map((subLink, index) => (
                            <Link
                              to={`catalog/${subLink?.name
                                .split(" ")
                                .join("")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={index}
                            >
                              <p>{subLink?.name}</p>
                            </Link>
                          ))
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login, Signup, Dashboard */}
        <div className="flex items-center gap-x-4">
          {user && user?.accountType !== "Instructor" && (
            <Link to="dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-white text-2xl" />
              {totalItems > 0 && (
                <span className="absolute bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login" className="hidden md:block">
                <button
                  className="bg-richblack-800 px-[12px] py-[8px] text-richblack-25 rounded-full border-none lg:border-richblack-700"
                >
                  Login
                </button>
              </Link>
              <Link to="/signup" className="hidden md:block">
                <button className="bg-richblack-800 px-[12px] py-[8px] text-richblack-25 rounded-full border-none lg:border-richblack-700">
                  SignUp
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* Mobile Menu Button */}
        <button className="mr-4 md:hidden" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose fontSize={24} fill="#AFB2BF" /> : <AiOutlineMenu fontSize={24} fill="#AFB2BF" />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <nav className="block md:hidden absolute top-14 left-0 w-full bg-richblack-800 z-50">
          <ul className="flex flex-col gap-y-4 text-richblack-25 p-4">
            {NavbarLinks.map((link, index) => (
              <li key={index} onClick={toggleMenu}>
                {link?.title === "Catalog" ? (
                  <div
                    className={`group relative flex items-center gap-2 cursor-pointer
                      ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                  >
                    <span onClick={toggleCatalog}>
                      {link?.title}
                      <IoIosArrowDropdown />
                    </span>
                    {catalogOpen && (
                      <div
                        className="flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 mt-2"
                      >
                        {loading ? (
                          <p className="text-center">loading ...</p>
                        ) : (
                          subLinks
                            ?.filter((subLink) => subLink?.courses?.length >= 0)
                            .map((subLink, index) => (
                              <Link
                                to={`catalog/${subLink?.name
                                  .split(" ")
                                  .join("")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={index}
                              >
                                <p>{subLink?.name}</p>
                              </Link>
                            ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
            {/* Login, Signup for mobile screens */}
            {token === null && (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <button
                    className="w-full bg-richblack-800 px-[12px] py-[8px] text-richblack-25 rounded-full border-none lg:border-richblack-700"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <button className="w-full bg-richblack-800 px-[12px] py-[8px] text-richblack-25 rounded-full border-none lg:border-richblack-700">
                    SignUp
                  </button>
                </Link>
              </>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
