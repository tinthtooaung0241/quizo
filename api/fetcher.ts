export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const results = await response.json();
  return results;
};
