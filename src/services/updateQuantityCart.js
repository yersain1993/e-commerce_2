import { axiosInstances } from '../api/axiosInstance';

export const updateQuantityCart = async ({ token, cartProductId, quantity }) => {
  try {
    const data = { quantity };

    await axiosInstances.put(`cart/${cartProductId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
};
