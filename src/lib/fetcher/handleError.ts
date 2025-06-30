import { toast } from "react-toastify";

export const handleAxiosError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        toast.error(
          "Bad Request: " +
            (error.response.data.errors ||
              error.response.data.message ||
              "Invalid input."),
          { theme: "colored" },
        );
        break;
      case 401:
        toast.error(
          "Unauthorized: " +
            (error.response.data.errors ||
              error.response.data.message ||
              "You are not authorized."),
          { theme: "colored" },
        );
        break;
      case 403:
        toast.error(
          "Forbidden: " +
            (error.response.data.errors ||
              error.response.data.message ||
              "Access denied."),
          { theme: "colored" },
        );
        break;
      case 404:
        toast.error(
          "Not Found: " +
            (error.response.data.errors ||
              error.response.data.message ||
              "The requested resource was not found."),
          { theme: "colored" },
        );
        break;
      case 500:
        toast.error(
          "Internal Server Error: " +
            (error.response.data.message ||
              error.response.data.message ||
              "Something went wrong on the server."),
          { theme: "colored" },
        );
        break;
      default:
        toast.error(
          "An error occurred: " +
            (error.response.data.message ||
              error.response.data.message ||
              "Unknown error"),
          { theme: "colored" },
        );
        break;
    }
  } else if (error.request) {
    toast.error("No response received from the server.", { theme: "colored" });
  } else {
    toast.error("Error: " + error.message, { theme: "colored" });
  }
};
