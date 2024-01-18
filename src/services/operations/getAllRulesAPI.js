import { toast } from "react-hot-toast"

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis"
import { apiConnector } from "../apiconnector"

const { GET_ALL_RULES_API, GET_ALL_PARAMETERS, GET_ALL_STRATEGIES } = endpoints

export const getAllRules = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("GET", GET_ALL_RULES_API, null, {
      authorization: "Bearer " + token,
    })
    console.log("-------------GET ALL RULES RESPONSE------------------")
    if (!response?.data?.success) {
      throw new Error("Could Not Get All Rules.")
    }
    toast.success("All Rules Fetched Successfully !!")
    result = response?.data?.message
  } catch (error) {
    console.log("GET ALL RULES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getAllParameters = async () => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("GET", GET_ALL_PARAMETERS)
    console.log("-------------GET ALL PARAMETERS RESPONSE------------------")
    if (!response?.data?.success) {
      throw new Error("Could Not Get All Parameters.")
    }
    toast.success("All Parameters Fetched Successfully !!")
    result = response?.data?.parameterList
  } catch (error) {
    console.log("GET ALL PARAMETERS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getAllStrategy = async () => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("GET", GET_ALL_STRATEGIES)
    console.log("-------------GET ALL Strategies RESPONSE------------------")
    if (!response?.data?.success) {
      throw new Error("Could Not Get All Strategies.")
    }
    toast.success("All Strategies Fetched Successfully !!")
    result = response?.data?.strategies
  } catch (error) {
    console.log("GET ALL Strategies API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}