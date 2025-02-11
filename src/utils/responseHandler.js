// src/utils/responseHandler.js

/**
 * Sends a standardized success response.
 *
 * @param {object} res - The Express response object.
 * @param {string} message - A message describing the response.
 * @param {object} [data] - (Optional) The data payload to include in the response.
 * @param {number} [status=200] - (Optional) HTTP status code.
 */
export const sendSuccess = (res, message, data = null, status = 200) => {
    return res.status(status).json({
      success: true,
      status,
      message,
      data,
    });
  };
  
  /**
   * Sends a standardized error response.
   *
   * @param {object} res - The Express response object.
   * @param {string} message - A message describing the error.
   * @param {object|string} [error] - (Optional) Error details.
   * @param {number} [status=500] - (Optional) HTTP status code.
   */
  export const sendError = (res, message, error = null, status = 500) => {
    return res.status(status).json({
      success: false,
      message,
      error: error ? error.toString() : null,
    });
  };