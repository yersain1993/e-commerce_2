import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCart, loadCartProducts } from '../../store/slices/cart.slice';
import CartProduct from './CartProduct';

const Cart = ({ isVsible }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart);
  const togleTransform = isVsible ? 'translate-x-0' : 'translate-x-full';

  const total = cart.products.reduce(
    (sum, product) => sum + product.quantity * Number(product.price),
    0,
  );

  useEffect(() => {
    if (isVsible) dispatch(loadCartProducts(token));
  }, [isVsible]);

  return (
    <div
      className={
        'fixed z-[1] flex flex-col h-full top-10 inset-x-0 bg-[rgba(0,0,0,0.45)] transition-transform duration-300 backdrop-blur-sm ' +
        togleTransform
      }
    >
      <section className="absolute flex flex-col justify-between right-0 h-full bg-white w-80 p-5">
        <section className="overflow-auto">
          <h2 className="mt-1 font-bold text-xl text-[#4f4f4f] fixed bg-white w-full top-0">
            Cart
          </h2>
          {cart.loading && <p className="mt-6">Loading cart products...</p>}

          {!cart.loading && !cart.products.length && (
            <p className="text-center text-orange-400 mt-6">Your cart is empty</p>
          )}

          {!cart.loading && cart.products.length && (
            <div className="mt-10">
              <ul className="mt-5 flex-grow">
                {cart.products.map((product) => (
                  <li key={product.id}>
                    <CartProduct product={product} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <section className="flex flex-col border-t-2 pt-2">
          <p className="flex flex-row justify-between mt-4">
            <span className="text-[#c7c7c7] ">Total</span>
            <span className="text-[#4f4f4f] font-semibold">{total}</span>
          </p>
          <button
            className="w-full bg-orange-500 py-2 text-white font-semibold mt-4 mb-10"
            disabled={!cart.products.length}
            onClick={() => dispatch(buyCart(token))}
          >
            Buy product
          </button>
        </section>
      </section>
    </div>
  );
};

export default Cart;
