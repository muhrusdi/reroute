import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const fetchQuery = queryClient.fetchQuery;
