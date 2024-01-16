import React from "react"
import { Link } from "react-router-dom"
import user from "./Assets/user-regular.svg"
import { NavbarLinks } from "./constants/constants"
import { useState } from "react"

function Content({ SetIsActive }) {
  const [isProfileActive, SetIsProfileActive] = useState(false)
  const toggleProfile = () => {
    SetIsProfileActive((prev) => !prev)
  }
  const toggle = () => {
    SetIsActive((prev) => !prev)
  }
  return (
    <>
      <div className="flex flex-col transition duration-700 ease-in-out">
        <Link to="/">
          <h1 className="text-[2rem] font-bold tracking-tighter text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text px-[2rem] py-[1rem]">
            DecisionHub.
          </h1>
        </Link>
        <div className="bg-[#da10cb] w-full place-content-center h-[1px] my-2"></div>
        <div
          className="mx-8 my-5 flex flex-row items-center rounded-full justify-center space-x-3 transition duration-200 ease-in-out hover:bg-slate-800 px-[2rem] py-[1rem]"
          onClick={toggleProfile}
        >
          <img src={user} alt="user" className="h-5 w-5" />
          <h1 className="text-[#fff] text-[1.3rem] font-semibold">Profile</h1>
        </div>
        <nav className="flex flex-col px-[2rem]">
          <h1 className="text-[#da10cb] text-[1.5rem] font-semibold">
            Features
          </h1>
          <ul className="flex flex-col text-white items-start mt-5 gap-y-2 font-semibold">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path} onClick={toggle}>
                  <p className="w-full flex items-center min-w-[7rem] h-[2.5rem] rounded-md transition-all duration-200 hover:bg-slate-800 px-3">
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button className="text-white mb-4 bg-gradient-to-r from-rose-700 to-pink-600 p-2 mx-8 rounded-xl font-semibold text-[1.2rem]">
        Logout
      </button>
      <div
        className={`${
          isProfileActive
            ? "profile z-40 top-0 left-0 absolute w-full h-screen backdrop-blur-xl transition-all duration-700 ease-in-out"
            : "hidden transition-all duration-700 ease-in-out"
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:h-[30rem] md:w-[30rem] h-[20rem] w-[20rem] bg-gray-900 rounded-xl flex flex-col justify-between shadow-2xl shadow-fuchsia-800">
          <div className="flex flex-col p-8 items-center space-y-6">
            <div className="flex flex-col items-center space-y-8">
              <img
                src={user}
                alt="user"
                className="h-5 w-5 outline outline-2 rounded-sm outline-[#da10cb] outline-offset-[1rem]"
              />
              <h1 className="text-[#fff] text-[1.3rem] font-medium">
                Hello, Himanshu!
              </h1>
            </div>
            <h1 className="text-[#fff] text-[1rem] font-medium text-center flex flex-nowrap">
              Email: himanshunayak2003@gmail.com
            </h1>
          </div>
          <button
            className="text-white mb-4 bg-gradient-to-r from-rose-700 to-pink-600 p-2 mx-4 rounded-xl font-semibold text-[1.2rem]"
            onClick={toggleProfile}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default Content
