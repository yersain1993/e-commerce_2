import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user.slice';
import cart from './slices/cart.slice';

const store = configureStore({
  reducer: {
    user,
    cart,
  },
});

export default store;
