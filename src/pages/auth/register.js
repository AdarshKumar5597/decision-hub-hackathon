import React from "react"
import Container from "./container"
import Logo from "./auth_assets/Logo.png"
function register() {
  return (
    <>
      <Container>
        <form
          action=""
          method="post"
          className="flex flex-col justify-center items-center md:w-1/2 w-full md:rounded-l-3xl rounded-3xl shadow-md text-white bg-black/20"
        >
          {/* <div className="absolute top-[6.5rem] left-[380px] h-16 w-16 rounded-full bg-[#e84949]"></div>
            <div className="absolute h-60 w-60 rounded-full bg-white bottom-6 right-[300px] z-10"></div> */}
          <img
            src={Logo}
            alt=""
            className="w-[5rem] h-[5rem] rounded-full p-5 bg-white mt-12 mb-6"
          />
          <h1 className="font-pop text-white text-2xl font-semibold tracking-widest">
            REGISTER
          </h1>
          <p className="font-pop">Register Here</p>
          <div className="flex flex-col mt-10 gap-y-4">
            <div className="flex flex-col space-y-2">
              <label for="" className="">
                Full name
              </label>
              <input
                type="text"
                name="name"
                className="h-10 w-60 rounded-lg bg-[#233446] p-2 text-white-700 font-bold border-none"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label for="" className="">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="h-10 w-60 rounded-lg bg-[#233446] p-2 text-white-700 font-bold border-none"
                required
              />
            </div>

            <div className="flex flex-col space-y-2 mb-8">
              <label for="" className="">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="h-10 w-60 rounded-lg bg-[#233446] p-2 text-white-700 font-bold border-none"
                required
              />
            </div>
          </div>
          {/* <div className="text-white flex flex-col items-center gap-y-2 my-8">
            <div className="flex flex-row items-center gap-x-2">
              {" "}
              <input type="checkbox" name="remember" value="remember" />
              Remember Me?
            </div>
            <p className="text-[#00ff84] font-extrabold">Forgot Password?</p>
          </div> */}
          <button
            type="submit"
            className="w-[15rem] p-4 bg-[#27C879] rounded-lg shadow-[#27C879] shadow-lg text-white font-bold"
          >
            Submit
          </button>

          <div className="flex gap-x-2 my-6 ">
            <p>Have an account?</p>
            <a href="/auth/login" className="font-bold">
              Login
            </a>
          </div>
        </form>
      </Container>
    </>
  )
}

export default register
