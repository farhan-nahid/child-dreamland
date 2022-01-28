import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  ordersState: [],
  status: 'idle',
  clientSecret: '',
};

export const postOrdersAsync = createAsyncThunk('orders/postOrdersAsync', async (payload) => {
  const response = await axios.post(`https://e--pathshala.herokuapp.com/add-order`, payload);
  return response.data;
});

export const createPaymentIntent = createAsyncThunk('orders/createPaymentIntent', async (payload) => {
  const response = await axios.post('https://e--pathshala.herokuapp.com/create-payment-intent', payload);
  return response.data;
});

export const loadOrdersAsync = createAsyncThunk('orders/loadOrdersAsync', async (payload) => {
  const response = await axios.get(`https://e--pathshala.herokuapp.com/orders?email=${payload}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ePATHSHALA_token')}`,
    },
  });
  return response.data;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    emptyPrev: (state, action) => {
      state.clientSecret = '';
    },
    emptyOrder: (state, action) => {
      state.ordersState = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrdersAsync.pending, (state, action) => {
      toast.loading('Confirming...Please Wait');
    });
    builder.addCase(postOrdersAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
    });
    builder.addCase(postOrdersAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
    builder.addCase(createPaymentIntent.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(createPaymentIntent.fulfilled, (state, { payload }) => {
      state.status = 'Success';
      state.clientSecret = payload.clientSecret;
    });
    builder.addCase(createPaymentIntent.rejected, (state, { error: { message } }) => {
      state.status = 'Rejected';
      toast.error(message);
    });
    builder.addCase(loadOrdersAsync.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(loadOrdersAsync.fulfilled, (state, { payload }) => {
      state.status = 'Success';
      state.ordersState = payload;
    });
    builder.addCase(loadOrdersAsync.rejected, (state, { error: { message } }) => {
      state.status = 'Rejected';
      toast.error(message);
    });
  },
});

export const { emptyPrev, emptyOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
