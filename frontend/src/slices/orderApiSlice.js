import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/order/${id}`,
      }),
    }),
    getEsewaFormData: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/order/pay/${id}`,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
      }),
    }),
    deliverOrder: builder.mutation({
      query:(id)=>({
        url:`${ORDER_URL}/${id}/deliver`,
        method:'PUT'
      })
    })
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetEsewaFormDataQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation
} = orderApiSlice;
