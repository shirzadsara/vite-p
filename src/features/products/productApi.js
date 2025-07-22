import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi=createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:9001/"}),
    tagTypes: ["Products", "Cart"],
    endpoints:(builder) =>({
     getProducts:builder.query({
      query: () => "DrillingMachines",
      providesTags: ["Products"]
     }),
updateCart: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"]
    }),
    addToCart: builder.mutation({
  query: (item) => ({
    url: 'cart',
    method: 'POST',
    body: item,
  }),
  invalidatesTags: ['Cart'],
}),

    getCart: builder.query({
      query: () => "cart",
      providesTags: ["Cart"]
    }),
    deleteCart: builder.mutation({
  query: (id) => ({
    url: `cart/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Cart"],
}),

  }),
});

export const {
    useGetProductsQuery,
    useUpdateCartMutation,useAddToCartMutation,
  useGetCartQuery,useDeleteCartMutation} = productApi;