import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { MODIFY_RULE_API } = endpoints;

export const modifyRule = async (oldRuleDesc, newRuleDesc) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", MODIFY_RULE_API, { oldRuleDescription : oldRuleDesc , newRuleDescription : newRuleDesc});
        console.log("-------------MODIFY RULE RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Modify Rule.");
        }
        toast.success("Rule Modified Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("MODIFY RULE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}