import { toast } from "react-hot-toast"

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis"
import { apiConnector } from "../apiconnector"

const { ADD_STRATEGY_API, ADD_PARAMETERS_API } = endpoints

export const createStrategy = async (name, rules) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      ADD_STRATEGY_API,
      { strategyName: name, strategyRules: rules },
    )
    console.log("-------------CREATE STRATEGY RESPONSE------------------")
    if (!response?.data?.success) {
      throw new Error("Could Not Create New Strategy.")
    }
    toast.success("New Strategy Created Successfully !!")
    result = response?.data?.message
  } catch (error) {
    console.log("CREATE STRATEGY API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const addParameters = async (paramlist) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", ADD_PARAMETERS_API, {
      paramsArray: paramlist,
    })
    console.log("-------------ADD PARAMETERS API RESPONSE------------------")
    if (!response?.data?.success) {
      throw new Error("Could Not Add New Parameter.")
    }
    toast.success("New Parameter Created Successfully !!")
    result = response?.data?.message
  } catch (error) {
    console.log("ADD PARAMETERS API RESPONSE ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


