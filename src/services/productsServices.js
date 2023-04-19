import { axiosInstances } from '../api/axiosInstance';

export const productsServices = async (params) => {
  try {
    const res = await axiosInstances.get('products', { params });
    //array de objetos de productos
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
