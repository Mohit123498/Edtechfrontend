import React from "react";
// dashboard link me sabhi link me prefix vsc hai
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";
// if i have the name of the icon so i can use by import all the icon of react
function Sidebarlink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className="flex">
      <NavLink
        to={link.path}
        // onClick={}homework
        className={`relative px-8 py-2 text-sm font-medium${
          matchRoute(link.path)
            ? " bg-yellow-600 text-yellow-50"
            : " bg-opacity-0  text-richblack-300"
        } transition-all duration-200`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-[0.3rem] bg-yellow-200
        ${matchRoute(link.path) ? " opacity-100" : "opacity-0"} `}
        ></span>
        <div className="flex items-center gap-x-3">
          {/* Icon make a variable above and get the icon name Icon=icon[iconName] */}
          <Icon className="text-lg" />
          <span>{link.name}</span>
        </div>
      </NavLink>
    </div>
  );
}

export default Sidebarlink;
