import clientAxios from "@/lib/axios/client";

export const swrFetcher = (url: string) =>
  clientAxios.get(url).then((res) => res.data);
