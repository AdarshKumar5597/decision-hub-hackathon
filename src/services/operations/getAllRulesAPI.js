import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { GET_ALL_RULES_API } = endpoints;

export const getAllRules = async () => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("GET", GET_ALL_RULES_API);
        console.log("-------------GET ALL RULES RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Get All Rules.");
        }
        toast.success("All Rules Fetched Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("GET ALL RULES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}