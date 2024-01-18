import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const TestRule = () => {
  const { isLoggedIn } = useSelector((state) => state.authReducer)
  const [parametersList, setParametersList] = useState([])

  useEffect(() => {
    //yaha se await likhna
    let response = [
      {
        id: 1,
        name: "Parameter1",
      },
      {
        id: 2,
        name: "Parameter2",
      },
      {
        id: 3,
        name: "Parameter3",
      },
      {
        id: 4,
        name: "Parameter4",
      },
    ]

    setParametersList(response)
  }, [])
  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" />
  }

  return (
    <div className="text-white flex flex-col justify-center items-center w-full h-full space-y-16">
      <h1 className="font-semibold">Testing</h1>
      <div className="space-y-8">
        {parametersList.map((item) => (
          <div key={item.id} className="flex flex-row space-x-4 items-center">
            <p>{item.name}</p> :{" "}
            <input type="text" className="text-black rounded-xl h-12" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="text-blue-500 p-4 bg-white cursor-pointer mt-8 rounded-xl">
          submit
        </button>
      </div>
    </div>
  )
}

export default TestRule
