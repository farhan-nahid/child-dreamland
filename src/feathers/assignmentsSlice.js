import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  assignmentsState: [],
  status: { loadAssignment: '', deleteAssignment: '' },
};

export const postAssignmentAsync = createAsyncThunk('assignments/postAssignmentAsync', async (payload) => {
  const response = await axios.post(`https://e--pathshala.herokuapp.com/add-assignment`, payload);
  return response.data;
});

export const loadAssignmentAsync = createAsyncThunk('assignments/loadAssignmentAsync', async () => {
  const response = await axios.get(`https://e--pathshala.herokuapp.com/all-assignments`);
  return response.data;
});

export const deleteAssignmentAsync = createAsyncThunk('assignments/deleteAssignmentAsync', async (payload) => {
  // const response = await axios.get(`https://e--pathshala.herokuapp.com/?id=${payload}`);
  // return response.data;
});

export const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    emptyPrev: (state, action) => {
      state.assignmentsState = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAssignmentAsync.pending, (state, action) => {
      toast.loading('Adding Assignment... Please Wait!');
    });
    builder.addCase(postAssignmentAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
    });
    builder.addCase(postAssignmentAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
    builder.addCase(loadAssignmentAsync.pending, (state, action) => {
      state.status.loadAssignment = 'Pending';
    });
    builder.addCase(loadAssignmentAsync.fulfilled, (state, { payload }) => {
      state.status.loadAssignment = 'Success';
      state.assignmentsState = payload;
    });
    builder.addCase(loadAssignmentAsync.rejected, (state, { error: { message } }) => {
      state.status.loadAssignment = 'Rejected';
      toast.error(message);
    });
    builder.addCase(deleteAssignmentAsync.pending, (state, action) => {
      state.status.deleteAssignment = 'Pending';
    });
    builder.addCase(deleteAssignmentAsync.fulfilled, (state, { payload }) => {
      state.status.deleteAssignment = 'Success';
      state.assignmentsState = payload;
    });
    builder.addCase(deleteAssignmentAsync.rejected, (state, { error: { message } }) => {
      state.status.deleteAssignment = 'Rejected';
      toast.error(message);
    });
  },
});

export const { emptyPrev } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
