import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../feathers/coursesSlice';
import ordersReducer from '../feathers/ordersSlice';
import usersReducer from '../feathers/usersSlice';

const store = configureStore({
  reducer: { courses: coursesReducer, users: usersReducer, orders: ordersReducer },
});

export default store;
