// Success Response Handler
const handleSuccess = (res, data, message = "", code = 200) => {

  const responseData = data; 

  res.status(code).json({
    code: String(code),
    data: responseData, 
    description: "", 
    execution: true,
    message: message || "",
    status: "success",
    time: new Date().toISOString()
  });
};

// Error Response Handler
const handleError = (res, error, message = "An error occurred", code = 500) => {
  // 'error' object theke details ber kora
  const errorDetails = error instanceof Error ? error.message : (typeof error === 'string' ? error : "Internal server error");

  res.status(code).json({
    code: String(code),
    data: [], // Error-er shomoy data empty array (Standard)
    description: errorDetails,
    execution: false,
    message: message,
    status: "error",
    time: new Date().toISOString()
  });
};

// Main middleware function
export const responseHandler = (req, res, next) => {
  res.apiSuccess = (data, message, code) => handleSuccess(res, data, message, code);
  res.apiError = (error, message, code) => handleError(res, error, message, code);
  
  next();
};