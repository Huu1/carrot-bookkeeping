import Taro from '@tarojs/taro';
import React, { useEffect, useReducer, useState } from "react";
import http from "./http";

interface IState {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useRequest = (initUrl: string, methods = 'GET', initialParam: any): { state: IState, setParam: React.Dispatch<any>, setUrl: React.Dispatch<string> } => {
  const [param, setParam] = useState(initialParam);
  const [url, setUrl] = useState(initUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: {},
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await http(url, methods, param);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          Taro.showToast({
            title: error.msg
          })
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, param, methods]);

  return { state, setParam, setUrl };
};