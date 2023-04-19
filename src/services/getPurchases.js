import { axiosInstances } from '../api/axiosInstance';

export const getPurchases = async (token) => {
  try {
    const res = await axiosInstances.get('purchases', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data.map((purchaseProduct) => ({
      ...purchaseProduct.product,
      quantity: purchaseProduct.quantity,
    }));
    return data;
  } catch (error) {
    console.log(error);
  }
};
