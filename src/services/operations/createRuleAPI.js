import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { CREATE_RULE_API } = endpoints;

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