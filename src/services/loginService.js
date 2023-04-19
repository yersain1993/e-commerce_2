import { axiosInstances } from '../api/axiosInstance';

export const loginService = async (data) => {
  try {
    const res = await axiosInstances.post('users/login', data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
