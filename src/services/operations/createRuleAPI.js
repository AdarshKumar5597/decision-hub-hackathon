import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { CREATE_RULE_API, ADD_PARAMETERS_API } = endpoints;

export const createRule = async (ruleName, ruleDesc, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_RULE_API, { ruleName: ruleName, ruleDescription : ruleDesc }, { authorization: "Bearer " + token  });
        console.log("-------------CREATE RULE RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Create New Rule.");
        }
        toast.success("New Rule Created Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("CREATE RULE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const addParameters = async (paramlist) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", ADD_PARAMETERS_API, { paramsArray: paramlist });
        console.log("-------------ADD PARAMETERS API RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Add New Parameter.");
        }
        toast.success("New Parameter Created Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("ADD PARAMETERS API RESPONSE ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}