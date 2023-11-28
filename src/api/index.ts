// swrApi.ts
import useSWR from 'swr';
import axios from 'axios';

// Fetcher function using Axios
const fetcher = async (url: string, fetchOption?: Object) => {
  try {
    const response = await axios.post(url, fetchOption);

    return response.data;
  } catch (error) {
    throw error;
  }
};

interface SwrApiResult {
  data: any;
  isLoading: boolean;
  isValidating: boolean;
  isError: boolean;
  mutate: any;
}

const useSwrApiNew = (url: string, fetchOption?: Object): SwrApiResult => {
  const swrOption = {
    revalidateOnFocus: false,
    // refreshInterval: 1000,
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    (api) => fetcher(api, fetchOption),
    swrOption,
  );

  return {
    data,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: !!error,
    mutate,
  };
};

export default useSwrApiNew;
