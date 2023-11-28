import useSwrApiNew from '@/api';
import { useEffect, useState } from 'react';

export const ApiCallSample = () => {
  const [key, setKey] = useState<string>();

  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 7);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 8);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 9);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 10);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 11);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 12);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 13);

  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 15);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 16);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 17);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 18);
  // const { data: result } = useSwrApiNew('http://192.168.0.200:8080/query', 19);
  // const data5 = result5;
  const {
    data: result,
    isLoading,
    isError,
  } = useSwrApiNew('http://192.168.0.200:8080/query', {
    Command: 7,
    Channel: 1,
  });
  const handleClick = async () => {
    console.log(result);
  };

  return (
    <>
      <button onClick={handleClick}>API 호출하기</button>
    </>
  );
};
