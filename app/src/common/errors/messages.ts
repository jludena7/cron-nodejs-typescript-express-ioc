import { HTTP } from "../constants/app";

export const ERROR_500 = {
  UNKNOWN: {
    success: false,
    status: HTTP.STATUS_500,
    body: "Unknown error",
  },
};

export const ERROR_404 = {
  NOT_FOUND: {
    success: false,
    status: HTTP.STATUS_404,
    body: "Not found resource",
  },
  COLLECTION_NOT_FOUND: {
    success: false,
    status: HTTP.STATUS_404,
    body: "Collection not found",
  },
  COLLECTION_NOT_UPDATED: {
    success: false,
    status: HTTP.STATUS_404,
    body: "Collection not found, was not updated",
  },
  UNKNOWN_VALIDATION: {
    success: false,
    status: HTTP.STATUS_404,
    body: "Unknown error validation",
  },
};

export const MESSAGES = {
  OK: "Ok",
  PRODUCT_STOCK_NOT_UPDATED: "Does not require updating stock",
  USER_ALREADY_DEACTIVATED: "The user is already deactivated",
  USER_NOT_REQUIRED_DEACTIVATE: "Does not require deactivate",
};
