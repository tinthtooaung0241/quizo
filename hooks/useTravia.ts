import { fetcher } from "@/api/fetcher";
import { TraviaFormSchemaType } from "@/components/get-travia-form";
import { useFormParams } from "@/providers/api-params-store-provider";
import { Travia, TraviaApiResponse } from "@/types/travia";
import useSWR from "swr";

const constructUrl = (data: TraviaFormSchemaType) => {
  const baseUrl = "https://opentdb.com/api.php";
  const params = new URLSearchParams();

  if (data.amount) params.append("amount", data.amount.toString());
  if (data.category) params.append("category", data.category.toString());
  if (data.difficulty) params.append("difficulty", data.difficulty);
  if (data.type) params.append("type", data.type);

  const apiUrl = `${baseUrl}?${params.toString()}`;

  return apiUrl;
};

const useTravia = () => {
  const formParams = useFormParams((state) => state.formParams);

  const apiUrl = constructUrl(formParams);

  const serializedData = JSON.stringify(formParams);

  const { data, error, isLoading } = useSWR<TraviaApiResponse>(
    [apiUrl, serializedData],
    ([url]) => fetcher(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    traviaData: data?.results ?? [],
    error,
    isLoading,
    response_code: data?.response_code,
  };
};
export default useTravia;
