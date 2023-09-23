// Import the API slice created using Redux Toolkit
// import { adminApiSlice } from "./adminApiSlice";
import { apiSlice } from "../user/apiSlice";
// Define the base URL for user-related API endpoints
const USERS_URL = "/api/admin";

// Create a user API slice by injecting endpoints
export const adminApi = apiSlice.injectEndpoints({
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
    createTeam: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/team`,
        method: "POST",
        body: data,
      }),
    }),
    getTeam: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/team`,
        method: "GET",
        body: data,
      }),
    }),
    recruitPlayer: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/recruit`,
        method: "POST",
        body: data,
      }),
    }),
    onGoingRecruit: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/recruit`,
        method: "GET",
        body: data,
      }),
    }),
    getAcceptedRecruitment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getAcceptedRecruitment`,
        method: "GET",
        body: data,
      }),
    }),
    createPlayer: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createPlayer`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for each mutation endpoint for use in components
export const {
  useGetFansMutation,
  useBlockFanMutation,
  useCreateTeamMutation,
  useGetTeamMutation,
  useRecruitPlayerMutation,
  useOnGoingRecruitMutation,
  useGetAcceptedRecruitmentMutation,
  useCreatePlayerMutation,
} = adminApi;
