import React from "react"

function container({ children }) {
  return (
    <div className="bg-[url(https://i.postimg.cc/j5KFymrz/background.png)] bg-cover bg-no-repeat relative h-screen w-screen">
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full h-auto mx-16 xl:mx-96 relative">
          {children}
          <div className="xl:flex flex-col hidden items-start justify-center px-8 md:w-1/2 bg-gradient-to-br from-[#27C879] to-[#00A3FF] md:rounded-r-3xl">
            <h1 className="text-white text-[2rem] font-extrabold">
              Lets Make the Job Easier
            </h1>
            <p className="text-white text-[1.8rem]">Join Us!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default container
