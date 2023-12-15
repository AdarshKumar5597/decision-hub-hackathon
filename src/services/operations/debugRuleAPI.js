import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { DEBUG_RULE_API } = endpoints;

export const debugRule = async (ruleDesc) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", DEBUG_RULE_API, { ruleDescription : ruleDesc });
        console.log("-------------DEBUG RULE RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Debug Rule.");
        }
        toast.success("Rule Debugged Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("DEBUG RULE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}