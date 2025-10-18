import type { ZodNumberCheck } from "zod/v3";
import { type RecordType } from "../types";

export const generateQueries = (query?: RecordType) => {
  const obj = new URLSearchParams(query);
  if (obj) {
    return "?" + obj.toString();
  }

  return "";
};

export const generateParams = (params?: Array<string | number>) => {
  let paramsString = "";

  if (params) {
    params.forEach((item) => {
      paramsString += `/${item}`;
    });
  }

  return paramsString;
};

export const wait = (time = 2000) => {
  return new Promise((r) => setTimeout(r, time));
};
