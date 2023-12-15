import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { RULE_HAS_PARAMETERS_API, TEST_RULE_API } = endpoints;

export const ruleHasParameters = async (id) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("GET", RULE_HAS_PARAMETERS_API, params = id);
        console.log("------------- RULE HAS PARAMETERS RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Rule does not has parameters.");
        }
        toast.success("Rule has parameters !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("RULE HAS PARAMETERS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const testRule = async (id, parameters) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", TEST_RULE_API, bodyData = parameters,  params = id);
        console.log("-------------TEST RULE RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Rule Testing Failed.");
        }
        toast.success("Rule Tested !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("TEST RULE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}