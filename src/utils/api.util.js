import { API_CONFIG } from "../configs/api.config.js";
import { CommonUtils } from "./common.util.js";

async function executeHttpRequest(
  url,
  method,
  payload = {},
  optional = API_CONFIG.DEFAULT_API_OPTION
) {
  const requestOptions = {
    ...optional,
    method,
  };

  if (
    !CommonUtils.checkNullOrUndefine(method) &&
    method !== "GET" &&
    !CommonUtils.checkNullOrUndefine(payload)
  ) {
    requestOptions.body = JSON.stringify(payload);
  
  }

  const response = await fetch(url, requestOptions);

  return response.json();
}

export const ApiUtils = {
  executeHttpRequest,
};
