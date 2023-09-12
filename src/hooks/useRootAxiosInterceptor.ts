import { useEffect } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import { api } from '@plugins/axios/api';

/**
 * api 요청과 응답의 처리 방법을 구현하는 hook
 *
 * 기타
 * - plugin:axios 활용 hook
 * - RootLayout 에서 1회만 선언하여 활용
 */
export const useRootAxiosInterceptor = () => {
  //200번대 응답 처리 핸들러
  const responseHandler = (response: any) => {
    return response;
  };

  //200번대 이외의 응답 처리 핸들러
  const errorHandler = (error: any) => {
    // 사용 예시)
    // 토큰의 기간이 만료된 케이스
    // if (
    //   'message' in error &&
    //   error.message ==
    //     `User is not authorized to access this resource with an explicit deny`
    // ) {
    // }
    return Promise.reject(error);
  };

  //api 요청의 heaer 를 수정 핸들러
  const requestHandler = (config: InternalAxiosRequestConfig<any>) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
      config.headers!['x-budibase-api-key'] = apiKey;
    }
    config.withCredentials = true;
    return config;
  };

  const responseInterceptor = api.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error.response.data),
  );

  const requestInterceptor = api.interceptors.request.use(requestHandler);

  // 하위 컴포넌트에 설정 적용을 위한 useEffect
  useEffect(() => {
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};
