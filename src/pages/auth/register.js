import React from "react"
import Logo from "./auth_assets/Logo.png"
import { useForm } from "react-hook-form"
import { FormProvider as Form } from 'react-hook-form';
import * as Yup from 'yup';
import { Alert } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterUser } from "../../services/authOperations/auth";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const RegisterSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string().required("Email is required").email("Email must be a valid Email address"),
    password: Yup.string().required("Password is required")
  })

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
  })

  const { register, reset, setError, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitting } } = methods;


  const onSubmit = async (data) => {
    try {
      // submit data to backend
      let firstName = data.fullname.split(" ")[0];
      let lastName = data.fullname.split(" ")[1] !== null ? data.fullname.split(" ")[1] : "";

      const newData = {
        firstName: firstName,
        lastName: lastName,
        email: data.email,
        password: data.password
      }

      let result = await RegisterUser(newData);
      console.log(result);
      reset();

      if (result.success === true) {
        navigate('/auth/login');
      }

    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      })
    }
  }
  return (
    <>
      <Form methods={methods}>
        <form
          action=""
          method="post"
          className="flex flex-col justify-center items-center md:w-1/2 w-full md:rounded-l-3xl rounded-3xl shadow-md text-white bg-black/20"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

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
                name="fullname"
                className="h-10 w-60 rounded-lg bg-[#233446] p-2 text-white-700 font-bold border-none"
                {...register("fullname", { required: true })}
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
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
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
      </Form>
    </>
  )
}

export default Register
