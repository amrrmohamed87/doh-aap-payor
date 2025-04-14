export const handleApiCallError = (status: number, responseMsg: string) => {
  switch (status) {
    //! Client Errors
    case 400:
      return (
        responseMsg ||
        "There was an issue with your request. Please check your input and try again."
      );
    case 401:
      return responseMsg || "Unauthorized access. Please log in to continue.";
    case 403:
      return (
        responseMsg ||
        "Access denied. You do not have permission to access this resource."
      );
    case 404:
      return responseMsg || "The requested resource was not found.";
    case 405:
      return (
        responseMsg ||
        "The requested action is not allowed. Please try again with a different action."
      );
    case 408:
      return (
        responseMsg ||
        "The request timed out. Please check your connection and try again."
      );

    //! Server Errors
    case 500:
      return (
        responseMsg ||
        "The server encountered an error. Please try again later. If the problem persists, contact support."
      );
    case 501:
      return (
        responseMsg ||
        "The requested functionality is not supported. Please contact support if you need assistance."
      );
    case 502:
      return (
        responseMsg ||
        "Bad Gateway. The server is temporarily unavailable. Try again later."
      );
    case 503:
      return (
        responseMsg ||
        "The service is currently unavailable. Please try again later. If the issue continues, contact support."
      );
    case 504:
      return (
        responseMsg ||
        "The server took too long to respond. Please try again in a few moments."
      );
    default:
      return (
        responseMsg ||
        "An unexpected error occurred. Please try again. If the issue persists, contact support."
      );
  }
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};
