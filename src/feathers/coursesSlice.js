import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  coursesState: [],
  status: 'idle',
};

export const postCoursesAsync = createAsyncThunk('courses/postCoursesAsync', async (payload) => {
  const response = await axios.post(`http://localhost:5000/add-course`, payload);
  return response.data;
});

export const loadCoursesAsync = createAsyncThunk('courses/loadCoursesAsync', async () => {
  const response = await axios.get('http://localhost:5000/all-course');
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
      toast.loading('Processing... Please Wait!!');
    });
    builder.addCase(loadCoursesAsync.fulfilled, (state, { payload }) => {
      state.coursesState = payload;
      toast.dismiss();
    });
    builder.addCase(loadCoursesAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
  },
});

export default coursesSlice.reducer;
