import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { authEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { LOGIN_API, REGISTER_API } = authEndpoints;

export const LoginUser = async (formValues) => {
    const toastId = toast.loading("Logging In...");
    let result = null;
    let success = false;
    let token = null;
    try {
        const response = await apiConnector("POST", LOGIN_API, formValues);
        console.log("------------- LOGIN RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Login Unsuccessful.");
        }
        toast.success("Logged In Successfully !!");
        success = response?.data?.success;
        result = response?.data?.message;
        token = response?.data?.token;
    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return {result: result, token: token, success: success};
}

export const RegisterUser = async (formValues) => {
    const toastId = toast.loading("Registering...");
    let result = null;
    let success = false;
    try {
        const response = await apiConnector("POST", REGISTER_API, formValues);
        console.log("------------- REGISTER RESPONSE------------------");
        if (!response?.data?.success) {
            toast.error(response?.data?.message)
            throw new Error("Register Unsuccessful.");
        }
        toast.success("Registered Successfully !!");
        success = response?.data?.success;
        result = response?.data?.message;
    } catch (error) {
        console.log("REGISTER API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return {result: result, success: success};
}