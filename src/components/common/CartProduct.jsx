import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductFromCart,
  updateQuantityProductCart,
} from '../../store/slices/cart.slice';

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.cart.loading);

  const deleteHandleClick = () => {
    dispatch(deleteProductFromCart({ token, cartProductId: product.cartId }));
  };

  const updateHandleClick = () => {
    dispatch(
      updateQuantityProductCart({ token, cartProductId: product.cartId, quantity }),
    );
  };

  const decrease = () => {
    const newQuantity = quantity - 1;
    if (quantity >= 1) setQuantity(newQuantity);
  };

  return (
    <div>
      <article className="mt-6">
        <div className="flex flex-row gap-10">
          <div className="w-1/4">
            <img src={product.images[0].url} alt={product.titlt} />
          </div>
          <div className="flex flex-col text-xl">
            <h3 className="text-[#4f4f4f] text-xs font-bold">{product.title}</h3>
            <div className="flex flex-row border w-24 justify-center items-center">
              <button
                className="text-[#4f4f4f] px-[7px] border-r-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
              <span className="text-[#4f4f4f] px-3">{quantity}</span>
              <button className="text-[#4f4f4f] px-[10px] border-l-2" onClick={decrease}>
                -
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 text-2xl" onClick={updateHandleClick}>
              <i className="bx bxs-cart-add"></i>
            </button>
            <button
              className="text-red-500 text-xl"
              onClick={deleteHandleClick}
              disabled={loading}
            >
              <i className="bx bxs-trash"></i>
            </button>
          </div>
        </div>
        <div>
          <p className="text-right mt-2 text-[#4f4f4f]">
            <span className="text-[#c7c7c7] text-xs">Total:</span> $
            {product.quantity * Number(product.price)}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CartProduct;
