import { toast } from "react-hot-toast";

//import { setCreateRuleData, setLoading } from "../../slices/createRuleSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { UPLOAD_DBFILE_API, DBFILE_QUERY_API } = endpoints;

export const uploaddbfile = async (file) => {
    const toastId = toast.loading("Uploading file...");
    let result = null;

    try {
        // Create form data to send the file
        const formData = new FormData();
        formData.append('file', file[0]);
        console.log(file)
        console.log("formData - ", formData.file)

        // Make the API request using the apiConnector
        const response = await apiConnector("POST", UPLOAD_DBFILE_API, formData);
        console.log(response)

        console.log("-------------UPLOAD DB FILE RESPONSE------------------");

        if (!response?.data?.success) {
            throw new Error("Could Not Upload File.");
        }

        toast.success("File Uploaded Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.error("UPLOAD DB FILE API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const dbfilequery = async (ruleDesc) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", DBFILE_QUERY_API, { ruleDescription : ruleDesc });
        console.log("-------------DBFILE RULE RESPONSE------------------");
        if (!response?.data?.success) {
            throw new Error("Could Not Execute Rule.");
        }
        toast.success("Rule Executed Successfully !!");
        result = response?.data?.message;
    } catch (error) {
        console.log("DBFILE QUERY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}