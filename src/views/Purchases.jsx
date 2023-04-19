import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPurchases } from '../services/getPurchases';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const token = useSelector((state) => state.user.token);

  const productsPurchases = async (token) => {
    try {
      const products = await getPurchases(token);
      setPurchases(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productsPurchases(token);
  }, []);

  return (
    <div className="bg-white h-screen w-full flex flex-col item p-16 items-center">
      <h2 className="text-2xl text-[#4f4f4f] font-semibold mt-10">My purchases</h2>
      <section className="">
        <ul className="mt-2">
          {purchases &&
            purchases.map((product) => (
              <li
                key={product.id}
                className="grid sm:grid-cols-[1fr_240px_2fr_50px] grid-cols-[1fr_140px_2fr_50px] items-end gap-x-3"
              >
                <img
                  className="max-w-[60px] mt-6"
                  src={product.images[0].url}
                  alt={product.title}
                />
                <p className="text-[#4f4f4f] text-sm">{product.title}</p>
                <p className="text-[#4f4f4f] text-sm border-2 px-6 text-center">
                  {product.quantity}
                </p>
                <p className="text-[#4f4f4f] text-sm">
                  $ {product.price * product.quantity}
                </p>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Purchases;
