import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { CHATBOT_RULES_API } = endpoints;

export const fetchChatbotRules = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("GET", CHATBOT_RULES_API, null,  { authorization: "Bearer " + token  });
        console.log("-------------CHAT BOT RULES FETCH RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Chat Bot Rules.");
        }
        toast.success("Rules Fetched Successfully !!");
        result = response?.data?.rules;
    } catch (error) {
        console.log("CHAT BOT RULES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}