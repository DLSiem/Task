import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";

export const Home = () => {
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">MY DAY</h1>
      <div className="list">
        <div>{todayDate}</div>
        <ul className="mt-2">
          <li className="border space-between  flex mt-1 h-9">
            <label className="text-xl font-bold leading-8 grid gap-2 p-2">
              <input type="checkbox" />
            </label>

            <div className="p-1">
              <p className="">Work One</p>
            </div>

            <IconContext.Provider
              value={{
                className: "absolute right-2 h-9 z-0",
              }}
            >
              <SlOptionsVertical />
            </IconContext.Provider>
          </li>
          <li className="border space-between  flex mt-1 h-9">
            <label className="text-xl font-bold leading-8 grid gap-2 p-2">
              <input type="checkbox" />
            </label>

            <div className="p-1">
              <p className="">Work two</p>
            </div>

            <IconContext.Provider
              value={{
                className: "absolute right-2 h-9 z-0",
              }}
            >
              <SlOptionsVertical />
            </IconContext.Provider>
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <div className="border bg-slate-300 flex w-fit px-2 hover:bg-slate-200 cursor-pointer">
          <IconContext.Provider value={{ className: "h-6" }}>
            <IoIosArrowDown />
          </IconContext.Provider>
          <p className="px-1">Completed (2)</p>
        </div>
        <ul>
          <li className="border space-between bg-slate-300 flex mt-1 h-9">
            <label className="text-xl font-bold leading-8 grid gap-2 p-2">
              <input type="checkbox" checked />
            </label>

            <div className="p-1">
              <p className="line-through">Reading</p>
            </div>

            <IconContext.Provider
              value={{
                className: "absolute right-2 h-9 z-0",
              }}
            >
              <SlOptionsVertical />
            </IconContext.Provider>
          </li>
          <li className="border space-between bg-slate-300 flex mt-1 h-9">
            <label className="text-xl font-bold leading-8 grid gap-2 p-2">
              <input type="checkbox" checked />
            </label>

            <div className="p-1">
              <p className="line-through">IoT Devel</p>
            </div>

            <IconContext.Provider
              value={{
                className: "absolute right-2 h-9 z-0",
              }}
            >
              <SlOptionsVertical />
            </IconContext.Provider>
          </li>
        </ul>
      </div>
    </div>
  );
};
