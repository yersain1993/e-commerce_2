import { axiosInstances } from '../api/axiosInstance';

export const createPurchase = async (token) => {
  try {
    await axiosInstances.post('purchases', undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
};
