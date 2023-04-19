import { axiosInstances } from '../api/axiosInstance';

export const deleteFromCart = async ({ token, cartProductId }) => {
  try {
    await axiosInstances.delete(`cart/${cartProductId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
};
