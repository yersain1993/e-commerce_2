import { axiosInstances } from '../api/axiosInstance';

export const categoriesServices = async () => {
  try {
    const res = await axiosInstances.get('/categories');
    //array de objetos de categorias
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
