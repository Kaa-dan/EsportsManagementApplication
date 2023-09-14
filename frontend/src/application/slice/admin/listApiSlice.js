// Import the API slice created using Redux Toolkit
// import { adminApiSlice } from "./adminApiSlice";
import { apiSlice } from "../user/apiSlice";
// Define the base URL for user-related API endpoints
const USERS_URL = "/api/admin";

// Create a user API slice by injecting endpoints
export const listApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getFans: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/fans`,
        method: "GET",
        body: data,
      }),
    }),
    blockFan: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/fans`,
        method: "PATCH",
        body: data,
      }),
    }),

  }),
});

// Export hooks for each mutation endpoint for use in components
export const { useGetFansMutation, useBlockFanMutation } = listApi;
