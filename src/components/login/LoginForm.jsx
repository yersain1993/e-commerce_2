import React, { useState } from 'react';
import { loginService } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { logIn, updateToken, updateUserData } from '../../store/slices/user.slice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [togleType, setTogleType] = useState('password');
  const [changeIcon, setChangeIcon] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const handleClickType = () => {
    if (togleType === 'password') {
      setTogleType('text');
      setChangeIcon(true);
    } else if (togleType === 'text') {
      setTogleType('password');
      setChangeIcon(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const login = async () => {
    const loginData = await loginService(loginFormData);

    const userData = {
      id: loginData.user.id,
      firstName: loginData.user.firstName,
      lastName: loginData.user.lastName,
      email: loginData.user.email,
    };

    const token = loginData.token;

    dispatch(updateUserData(userData));
    dispatch(updateToken(token));
    dispatch(logIn());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <form className="w-72 mt-4" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="flex flex-col">
          <label htmlFor="emailId"> Email:</label>
          <input
            type="email"
            id="emailId"
            placeholder="example@gmail.com"
            name="email"
            value={loginFormData.email}
            required
          />
        </div>
        <div className="relative flex flex-col mt-2">
          <label htmlFor="passwordId">Password</label>
          <div className="flex flex-col">
            <input
              type={togleType}
              id="passwordId"
              name="password"
              value={loginFormData.password}
              required
            />
            <button className="absolute ml-64" type="button" onClick={handleClickType}>
              {!changeIcon ? (
                <i className="bx bxs-show"></i>
              ) : (
                <i className="bx bxs-low-vision"></i>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-72 border bg-orange-400 py-1 rounded text-white"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
