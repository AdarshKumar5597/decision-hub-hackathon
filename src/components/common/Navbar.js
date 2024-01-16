import { Link } from "react-router-dom"
// import { Link, matchPath, useLocation } from "react-router-dom"
import menu from "./Assets/bars-solid.svg"
import close from "./Assets/xmark-solid.svg"
import { useState } from "react"
import Content from "./Content"
const Navbar = () => {
  //   const location = useLocation()

  //   const matchRoute = (route) => {
  //     return matchPath({ path: route }, location.pathname)
  //   }
  const [isActive, SetIsActive] = useState(false)

  const toggle = () => {
    SetIsActive((prev) => !prev)
  }
  return (
    <>
      <div className="hidden md:flex flex-col justify-between h-[95vh] w-60 py-[1rem] my-5 rounded-xl bg-[#171b2e] transition-all duration-200 ml-5">
        <Content />
      </div>

      <div
        className={`w-[90vw] h-full md:hidden flex flex-row items-center justify-between px-[1rem] py-[1rem] mt-5 m-0 rounded-xl bg-[#171b2e] overflow-hidden transition-all duration-700 ease-in-out`}
      >
        <Link to="/">
          <h1 className="text-[2rem] font-bold tracking-tighter text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text px-1">
            DecisionHub.
          </h1>
        </Link>
        <button onClick={toggle}>
          <img
            src={menu}
            alt=""
            className="outline outline-2 outline-offset-8 h-5 w-5 mr-4 outline-white"
          />
        </button>
        <div
          className={` ${
            isActive
              ? "profile z-10 absolute flex flex-row top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-3xl transition-all duration-700 ease-in-out"
              : "hidden backdrop-blur-none"
          } `}
        >
          <div className="-z-10 w-60 h-[100vh] bg-[#171b2e] flex flex-col justify-between">
            <Content SetIsActive={SetIsActive} />
          </div>
          <div className="w-full">
            <img
              src={close}
              alt=""
              className="h-8 w-8 absolute top-8 right-8"
              onClick={toggle}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
