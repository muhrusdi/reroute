import { APIs } from "./endpoints";
import { axios } from "./axios";
import { AxiosHeaders, AxiosRequestConfig } from "axios";
import { generateParams, generateQueries } from "../utils";

type Options = {
  params?: Array<string | number>;
  query?: Record<string, any>;
  options?: RequestInit;
} & AxiosRequestConfig<string | FormData>;

export type PathsType = typeof APIs;

export type PathsKeyType = {
  [K in keyof PathsType]: string;
};

export const getData = async <TData>(
  path: keyof PathsKeyType,
  options?: Pick<Options, "options" | "params" | "query">
) => {
  const paramsString = generateParams(options?.params);
  const queriesString = generateQueries(options?.query);

  const headers: AxiosHeaders = new AxiosHeaders();

  // if (accessToken) {
  //   headers.set("Authorization", `Bearer ${accessToken}`)
  // }

  const res = axios(APIs[path] + paramsString + queriesString, {
    headers,
  }).then((d) => d.data);

  return res as TData;
};

export const postData = async <TData>(
  path: keyof PathsKeyType,
  options?: Options
) => {
  const paramsString = generateParams(options?.params);

  const res = await axios({
    url: APIs[path] + paramsString,
    method: "post",
    ...options,
  }).then((d) => d.data);

  return res as TData;
};
