import { axiosInstances } from '../api/axiosInstance';

export const productByIdServices = async (id) => {
  try {
    const res = await axiosInstances.get(`products/${id}`);
    //array de objetos de categorias
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
