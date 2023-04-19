import React from 'react';
import LoginForm from '../components/login/LoginForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const isUserLogged = useSelector((state) => state.user.isLogged);

  return (
    <div className="absolute flex flex-col items-center justify-center w-80 bg-white p-6 rounded-md h">
      <div className="top-4">
        <p className="font-semibold text-lg text-center">
          Welcome! Enter your email and password to continue
        </p>
        <div className="mt-2 bg-[#d8f5fd] text-black rounded-sm px-16">
          <h2 className="text-center">Test Data</h2>
          <p className="mt-2">yercas93@gmail.com</p>
          <p>yersa1234</p>
        </div>
        <LoginForm />
        {isUserLogged && <Navigate to={'/profile'} replace />}
      </div>
    </div>
  );
};

export default Login;
