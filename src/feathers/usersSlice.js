import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  usersState: [],
  normalUsersState: {},
};

export const postUsersAsync = createAsyncThunk('users/postUsersAsync', async (payload) => {
  const response = await axios.post(`https://e--pathshala.herokuapp.com/user`, payload);
  return response.data;
});

// export const loadAllUsersAsync = createAsyncThunk('users/loadAllUsersAsync', async () => {
//   const response = await axios.get('https://e--pathshala.herokuapp.com/all-courses');
//   return response.data;
// });

export const loadSingleUsersAsync = createAsyncThunk('users/loadSingleUsersAsync', async (payload) => {
  const response = await axios.get(`http://localhost:5000/normal-users/${payload}`);
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUsersAsync.pending, (state, action) => {});
    builder.addCase(postUsersAsync.fulfilled, (state, action) => {});
    builder.addCase(postUsersAsync.rejected, (state, { error: { message } }) => {
      toast.error(message);
    });
    // builder.addCase(loadAllUsersAsync.pending, (state, action) => {
    //   toast.loading('Courses are loading... Please Wait!!');
    // });
    // builder.addCase(loadAllUsersAsync.fulfilled, (state, { payload }) => {
    //   toast.dismiss();
    //   state.usersState = payload;
    //   toast.success('All Courses are loaded Successfully !!!');
    // });
    // builder.addCase(loadAllUsersAsync.rejected, (state, { error: { message } }) => {
    //   toast.dismiss();
    //   toast.error(message);
    // });
    builder.addCase(loadSingleUsersAsync.fulfilled, (state, { payload }) => {
      state.normalUsersState = payload;
    });
    builder.addCase(loadSingleUsersAsync.rejected, (state, { error: { message } }) => {
      toast.error(message);
    });
  },
});

export default usersSlice.reducer;
