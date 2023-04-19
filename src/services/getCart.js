import { axiosInstances } from '../api/axiosInstance';

export const getCart = async (token) => {
  try {
    const res = await axiosInstances.get('cart', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.map((cartProduct) => ({
      ...cartProduct.product,
      cartId: cartProduct.id,
      quantity: cartProduct.quantity,
    }));
  } catch (error) {
    console.log(error);
  }
};
