import { setLoading } from "../../slice/authSlice";
import { apiConnector } from "../apiConnector";
import { contactEndPoints } from "../../services/api";
import toast from "react-hot-toast";

export function ContactUs(
  firstName,
  lastName,
  email,
  message,
  phone,
  countrycode
) {
  return async (dispatch) => {
    const toastid = toast.loading("Sending email");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        contactEndPoints.CONTACT_API,
        {
          firstName,
          lastName,
          email,
          message,
          phone,
          countrycode,
        }
      );
      // console.log("Sent User Query, Contact API Response=>", response);
      // console.log(response.data.message);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // console.log(
      //   "response successs for Contact Confirmation",
      //   response.data.success
      // );

      toast.success(" Message sent Successfully");
      //   navigate("/");
    } catch (error) {
      // console.log("Error occured while sending Contact msg ");
      // console.log(error);
      toast.dismiss(toastid);
      if (!error.response.success) {
        toast.error(`Can't Sent Message`);
      }
    }
    toast.dismiss(toastid);

    dispatch(setLoading(false));
  };
}
