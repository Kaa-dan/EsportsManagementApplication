import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery, 
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});






// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
//   try {
//     const response = await fetch("your-api-endpoint");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// });

// const initialState = {
//   userData: null,
//   loading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userData = action.payload;
//       })
//       .addCase(fetchUserData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default userSlice.reducer;
