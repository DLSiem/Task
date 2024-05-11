import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaCircleUser, FaInbox } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { CiSearch } from "react-icons/ci";
import { IconContext } from "react-icons";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProMenu, setShowProMenu] = useState(false);

  const promenuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        promenuRef.current &&
        !promenuRef.current.contains(event.target as Node) &&
        avatarRef.current && // Add null check here
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowProMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleAvatarClick = () => {
    console.log(showProMenu);
    if (showProMenu === true) {
      setShowProMenu(false);
    } else {
      setShowProMenu(true);
    }
  };

  const handleOptionClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseEnter = () => {
    setShowMenu(true);
  };
  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const menuitemsstyles =
    "font-medium mx-1 content-center px-1 sm:px-4 flex sm:text-xl  hover:font-bold cursor-pointer hover:border-green-900";
  return (
    <header className="text-blue-950 sm:min-h-12 h-10 bg-blue-300 p-1 justify-between flex">
      <h1 className="text-xl hidden sm:text-2xl sm:block font-bold content-center">
        Task
      </h1>
      <div className="text-xl sm:hidden">Menu</div>

      <div className="content-center flex sm:h-10">
        {/* <button className="p-1 rounded-md border">Login</button>
        <button className="p-1 rounded-md border">Signup</button> */}
        <h1 className="text-xl sm:hidden font-bold content-center">Task</h1>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="content-center"
        >
          <div className={`${menuitemsstyles} hidden sm:block`}>
            <p className="mr-0.5 inline-block" onClick={handleOptionClick}>
              categories
            </p>
            <div className="inline-block font-bold relative inset-y-1">
              <IconContext.Provider
                value={{ className: "text-xl hover:font-bold font-bold" }}
              >
                <FaAngleDown />
              </IconContext.Provider>
            </div>
          </div>
          {showMenu && (
            <div className="absolute  sm:top-10 top-9 bg-blue-200 sm:w-56">
              <p className="p-2 hover:cursor-pointer whitespace-nowrap hover:bg-blue-300 hover:border">
                Web Development
              </p>
              <p className="p-2 hover:cursor-pointer hover:bg-blue-300 hover:border">
                Mobile Development
              </p>
              <p className="p-2 hover:cursor-pointer hover:bg-blue-300 hover:border">
                Data Science
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="content-center pr-3">
          <IconContext.Provider
            value={{ className: "text-2xl cursor-pointer" }}
          >
            <CiSearch />
          </IconContext.Provider>
        </div>
        <div className="content-center">
          <div
            ref={avatarRef}
            onClick={handleAvatarClick}
            className="p-1 hover:cursor-pointer"
          >
            <IconContext.Provider value={{ className: "text-2xl" }}>
              <FaCircleUser />
            </IconContext.Provider>
          </div>

          {showProMenu && (
            <div
              ref={promenuRef}
              className="absolute right-0 z-10 bg-blue-200 w-44 sm:w-56"
            >
              <div className="text-sm whitespace-nowrap flex p-2 hover:bg-blue-300 hover:cursor-pointer hover:border-separate hover:border">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <FaCircleUser />
                </IconContext.Provider>
                <p className="pl-2">Account</p>
              </div>
              <div className="text-sm whitespace-nowrap flex p-2 hover:bg-blue-300 hover:cursor-pointer hover:border-separate hover:border">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <FaTasks />
                </IconContext.Provider>
                <p className="pl-2">My Task</p>
              </div>
              <div className="text-sm whitespace-nowrap flex p-2 hover:bg-blue-300 hover:cursor-pointer hover:border-separate hover:border">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <FaInbox />
                </IconContext.Provider>
                <p className="pl-2">Inbox</p>
              </div>

              <div className="text-sm whitespace-nowrap flex p-2 text-red-600 hover:bg-red-300 hover:cursor-pointer hover:text-red-800 hover:border">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <MdLogout />
                </IconContext.Provider>
                <p className="pl-2">Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
