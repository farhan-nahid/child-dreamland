import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  coursesState: [],
  singleCourseState: {},
  status: 'idle',
};

export const postCoursesAsync = createAsyncThunk('courses/postCoursesAsync', async (payload) => {
  const response = await axios.post(`https://e--pathshala.herokuapp.com/add-course`, payload);
  return response.data;
});

export const loadCoursesAsync = createAsyncThunk('courses/loadCoursesAsync', async () => {
  const response = await axios.get('https://e--pathshala.herokuapp.com/all-courses');
  return response.data;
});

export const loadSingleCoursesAsync = createAsyncThunk('courses/loadSingleCoursesAsync', async (payload) => {
  const response = await axios.get(`https://e--pathshala.herokuapp.com/course/${payload}`);
  return response.data;
});

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCoursesAsync.pending, (state, action) => {
      toast.loading('Adding... Please Wait!!');
    });
    builder.addCase(postCoursesAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
      toast.success('Added Successfully...');
    });
    builder.addCase(postCoursesAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
    builder.addCase(loadCoursesAsync.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(loadCoursesAsync.fulfilled, (state, { payload }) => {
      state.status = 'Success';
      state.coursesState = payload;
    });
    builder.addCase(loadCoursesAsync.rejected, (state, { error: { message } }) => {
      state.status = 'Rejected';
      toast.error(message);
    });
    builder.addCase(loadSingleCoursesAsync.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(loadSingleCoursesAsync.fulfilled, (state, { payload }) => {
      state.status = 'Success';
      state.singleCourseState = payload;
    });
    builder.addCase(loadSingleCoursesAsync.rejected, (state, { error: { message } }) => {
      state.status = 'Rejected';
      toast.error(message);
    });
  },
});

export default coursesSlice.reducer;
