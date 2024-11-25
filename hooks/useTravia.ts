import { fetcher } from "@/api/fetcher";
import { TraviaFormSchemaType } from "@/components/get-travia-form";
import { decodeHtmlEntities } from "@/lib/htmlDecoder";
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

const decodeTravia = (travia: Travia): Travia => ({
  ...travia,
  question: decodeHtmlEntities(travia.question),
  correct_answer: decodeHtmlEntities(travia.correct_answer),
  incorrect_answers: travia.incorrect_answers.map(decodeHtmlEntities),
});

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

  const decodedTravias = data ? data?.results.map(decodeTravia) : undefined;

  return {
    traviaData: decodedTravias,
    error,
    isLoading,
    response_code: data?.response_code,
  };
};
export default useTravia;
