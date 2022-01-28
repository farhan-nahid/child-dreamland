import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  normalUsersState: {},
  status: 'idle',
};

export const postUsersAsync = createAsyncThunk('users/postUsersAsync', async (payload) => {
  const response = await axios.post(`https://e--pathshala.herokuapp.com/user`, payload);
  return response.data;
});

export const loadSingleUsersAsync = createAsyncThunk('users/loadSingleUsersAsync', async (payload) => {
  const response = await axios.get(`https://e--pathshala.herokuapp.com/normal-users/${payload}`);
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

    builder.addCase(loadSingleUsersAsync.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(loadSingleUsersAsync.fulfilled, (state, { payload }) => {
      state.status = 'Success';
      state.normalUsersState = payload;
    });
    builder.addCase(loadSingleUsersAsync.rejected, (state, { error: { message } }) => {
      state.status = 'rejected';
      toast.error(message);
    });
  },
});

export default usersSlice.reducer;
