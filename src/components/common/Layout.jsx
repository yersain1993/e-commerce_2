import React from 'react';
import { Outlet } from 'react-router-dom';
import Cart from './Cart';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const [cartVsible, setCartVsible] = useState(false);

  const navigate = useNavigate();

  const isUserLogged = useSelector((state) => state.user.isLogged);

  const userLoggedHandle = () => {
    if (isUserLogged) {
      return '/profile';
    } else {
      return '/login';
    }
  };

  const cartHandleClick = () => {
    if (isUserLogged) setCartVsible(!cartVsible);
    else navigate('/login');
  };

  const purchasesHnadleClick = () => {
    if (isUserLogged) navigate('/purchases');
    else navigate('/login');
  };

  return (
    <div>
      <div className="flex flex-col bg-stone-100 h-screen">
        <div className="fixed w-screen z-10">
          <header className="flex flex-row items-center h-10 bg-white">
            <div className="w-40">
              <button onClick={() => navigate('/')} className="ml-2">
                <h2 className="text-orange-400 font-bold text-2xl">e-commerce</h2>
              </button>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => navigate(userLoggedHandle(), { replace: true })}
                className="border-l-2 w-16 sm:w-24 h-10 text-2xl text-slate-500"
              >
                <i className="bx bx-user"></i>
              </button>
              <button
                className="border-l-2 w-16 sm:w-24 h-10 text-2xl text-slate-500"
                onClick={purchasesHnadleClick}
              >
                <i className="bx bx-box"></i>
              </button>
              <button
                className="border-l-2 w-16 sm:w-24 h-10 text-2xl text-slate-500"
                onClick={cartHandleClick}
              >
                <i className="bx bx-cart"></i>
              </button>
            </div>
          </header>
        </div>
        <Cart isVsible={cartVsible} />
        <div>
          <main className="flex flex-col items-center justify-center min-h-screen">
            <Outlet />
          </main>
          <footer className="inset-x-0 bottom-full p-[3.75rem] text-center bg-[#3c3c3b] text-white">
            e-commerce project
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
