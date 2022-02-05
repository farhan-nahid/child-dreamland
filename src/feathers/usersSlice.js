import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  normalUsersState: {},
  allUsers: [],
  status: { isAdmin: 'idle', loadUser: 'idle', loadAllUser: 'idle' },
  isAdmin: false,
};

export const postUsersAsync = createAsyncThunk('users/postUsersAsync', async (payload) => {
  const response = await axios.post(`https://child-dreamland.herokuapp.com/user`, payload);
  return response.data;
});

export const loadUsersAsync = createAsyncThunk('users/loadUsersAsync', async (payload) => {
  const response = await axios.get(`https://child-dreamland.herokuapp.com/all-users?position=${payload}`);
  return response.data;
});

export const loadSingleUsersAsync = createAsyncThunk('users/loadSingleUsersAsync', async (payload) => {
  const response = await axios.get(`https://child-dreamland.herokuapp.com/users?email=${payload}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('child_dreamland_token')}`,
    },
  });
  return response.data;
});

export const checkAdminUsersAsync = createAsyncThunk('users/checkAdminUsersAsync', async (payload) => {
  const response = await axios.get(`https://child-dreamland.herokuapp.com/user?email=${payload}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('child_dreamland_token')}`,
    },
  });
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
      state.status.loadUser = 'Pending';
    });

    builder.addCase(loadSingleUsersAsync.fulfilled, (state, { payload }) => {
      state.status.loadUser = 'Success';
      state.normalUsersState = payload;
    });

    builder.addCase(loadSingleUsersAsync.rejected, (state, { error: { message } }) => {
      state.status.loadUser = 'rejected';
      toast.error(message);
    });

    builder.addCase(loadUsersAsync.pending, (state, action) => {
      state.status.loadAllUser = 'Pending';
    });

    builder.addCase(loadUsersAsync.fulfilled, (state, { payload }) => {
      state.status.loadAllUser = 'Success';
      state.allUsers = payload;
    });

    builder.addCase(loadUsersAsync.rejected, (state, { error: { message } }) => {
      state.status.loadAllUser = 'rejected';
      toast.error(message);
    });

    builder.addCase(checkAdminUsersAsync.pending, (state, action) => {
      state.status.isAdmin = 'Pending';
    });

    builder.addCase(checkAdminUsersAsync.fulfilled, (state, { payload }) => {
      state.status.isAdmin = 'Success';
      state.isAdmin = payload.admin;
    });

    builder.addCase(checkAdminUsersAsync.rejected, (state, { error: { message } }) => {
      state.status.isAdmin = 'rejected';
      toast.error(message);
    });
  },
});

export default usersSlice.reducer;
