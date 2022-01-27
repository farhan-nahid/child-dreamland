// import ordersReducer from '..feathers/ordersSlice';
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../feathers/coursesSlice';
import usersReducer from '../feathers/usersSlice';

const store = configureStore({
  reducer: { courses: coursesReducer, users: usersReducer },
});

export default store;
