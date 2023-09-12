import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const fetcher = ({ queryKey }: any) => {
  return api.get(queryKey[0]).then(({ data }) => data);
};

//기본 axios , 외부 api 사용할 때 활용
const dApi = axios.create();

export { api, dApi, fetcher };
