// src/utils/apiUtils.ts
import toast from "react-hot-toast";

export function handleApiResponse(response : any) {
  if (response?.data?.code === 200 && (response?.data?.status === 'Success' || response?.data?.status==='Sucess')) {
    toast.success(response?.data.data);
  } else if (response?.data?.status === 'Failed' || response?.data?.status === 'Error') {
    if (response?.data.data) {
      toast.error(response?.data.data);
    }else{
      toast.error(response?.data?.status);
    }
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }

  return response.data;
}
