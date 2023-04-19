import { axiosInstances } from '../api/axiosInstance';

export const addProduct = async ({ token, quantity, productId }) => {
  try {
    const data = { quantity, productId };

    await axiosInstances.post('cart', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
};
