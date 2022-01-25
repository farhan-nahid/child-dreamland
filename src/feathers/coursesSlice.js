import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  coursesState: [],
};

export const postCoursesAsync = createAsyncThunk('courses/postCoursesAsync', async (payload) => {
  const response = await axios.post(`https://e--pathshala.herokuapp.com/add-course`, payload);
  return response.data;
});

export const loadCoursesAsync = createAsyncThunk('courses/loadCoursesAsync', async () => {
  const response = await axios.get('https://e--pathshala.herokuapp.com/all-courses');
  return response.data;
});

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCoursesAsync.pending, (state, action) => {
      toast.loading('Processing... Please Wait!!');
    });
    builder.addCase(postCoursesAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
      toast.success('Your Product is Successfully added!!!');
    });
    builder.addCase(postCoursesAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
    builder.addCase(loadCoursesAsync.pending, (state, action) => {
      toast.loading('Courses are loading... Please Wait!!');
    });
    builder.addCase(loadCoursesAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
      state.coursesState = payload;
      toast.success('All Courses are loaded Successfully !!!');
    });
    builder.addCase(loadCoursesAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
  },
});

export default coursesSlice.reducer;
