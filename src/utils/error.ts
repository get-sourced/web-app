import { toast } from "@/components/Toaster/Toast";
import { ErrorClass } from "./errorClass";

export const catchErrorWithToast = <Args, T>(
  fn: (args: Args) => Promise<T>
) => {
  return async (args: Args) => {
    try {
      const data = await fn(args);
      return data;
    } catch (error) {
      if (error instanceof ErrorClass) {
        toast.error(error.message);
      } else {
        toast.error("Oops something went wrong");
        console.log("Error", error);
      }
      return null;
    }
  };
};
export const catchErrorWithOutToast = <Args, T>(
  fn: (args: Args) => Promise<T>
) => {
  return async (args: Args) => {
    try {
      const data = await fn(args);
      return data;
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  };
};
