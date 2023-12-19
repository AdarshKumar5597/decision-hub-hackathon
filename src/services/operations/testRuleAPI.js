import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { RULE_HAS_PARAMETERS_API, TEST_RULE_API } = endpoints;

export const ruleHasParameters = async (id) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("GET", RULE_HAS_PARAMETERS_API + id, null, null, { id : id });
        console.log("------------- RULE HAS PARAMETERS RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Rule does not has parameters.");
        }
        toast.success("Rule has parameters !!");
        let resString = response?.data?.parameters;
        console.log(resString);
        let resStringArray = response?.data?.parameters[0].slice(1, response?.data?.parameters[0].length -1).replace(" ", "").split(",");
        console.log(resStringArray);
        result = resStringArray.length > 1 ? resStringArray : resString;
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
        const response = await apiConnector("POST", TEST_RULE_API + id, parameters , null, { id :  id });
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