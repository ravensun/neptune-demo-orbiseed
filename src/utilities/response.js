"use strict";

const makeResponse = (
  res,
  httpCode,
  message = null,
  data = null,
  debug = null
) => {
  return res.status(httpCode).json({
    status: httpCode,
    message: message,
    data: data,
    debug:
      process.env.NODE_ENV == "development"
        ? debug
          ? debug.toString()
          : null
        : false
  });
};

export default makeResponse;
