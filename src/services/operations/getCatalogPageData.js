import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories } from "../api";

export default async function getCatalogPageData(categoryId) {
  // console.log("receiver category id is ", categoryId);
  let result = [];
  const toastId = toast.loading("loading");
  try {
    const response = await apiConnector(
      "POST",
      categories.SHOW_ALL_CATEGORIES_PAGE_INFO,
      { categoryId:categoryId }
    );
    // console.log("we got the response is",response);
    if (!response?.data?.success) {
      throw new Error("Geting error while fetching category page details. ");
    }
    toast.success(response?.data?.message);
    result = response?.data;
  } catch (error) {
    // console.log("CATALOG PAG DETAILS API ERROR");
    toast.error(error.response.data.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}
