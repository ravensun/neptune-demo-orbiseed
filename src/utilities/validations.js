"use strict";

import validator from "validator";
import moment from "moment";

const validateInteger = (num) => {
  return validator.isInt(num.toString());
};

const strIsEmpty = (str) => {
  return validator.isEmpty(str);
};

const validateDate = (date) => {
  date = moment(date);
  return date.isValid();
};

export { validateInteger, strIsEmpty, validateDate };
