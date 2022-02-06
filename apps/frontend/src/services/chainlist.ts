import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Chain } from '../types/chain';

const baseUrl = 'https://chainid.network';

export const chainListApi = createApi({
  reducerPath: 'chainListApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getChainList: builder.query<Chain[], void>({
      query: () => `/chains.json`,
    }),
  }),
});

export const { useGetChainListQuery } = chainListApi;
