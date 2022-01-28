import { configureStore } from '@reduxjs/toolkit';
import assignmentsReducer from '../feathers/assignmentsSlice';
import coursesReducer from '../feathers/coursesSlice';
import ordersReducer from '../feathers/ordersSlice';
import usersReducer from '../feathers/usersSlice';

const store = configureStore({
  reducer: { courses: coursesReducer, users: usersReducer, orders: ordersReducer, assignments: assignmentsReducer },
});

export default store;
