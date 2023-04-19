import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addProductToCart,
  updateQuantityProductCart,
} from '../../store/slices/cart.slice';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLogged } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [counter, setCounter] = useState(1);
  const [changeImage, setChangeImage] = useState(0);

  const cartProduct = cart.products.find(
    (productsCart) => productsCart.id === product.id,
  );

  const handleAddCart = () => {
    if (!isLogged) navigate('/login');
    else if (cartProduct) {
      const sumPorducts = cartProduct.quantity + counter;
      dispatch(
        updateQuantityProductCart({
          token,
          cartProductId: cartProduct.cartId,
          quantity: sumPorducts,
        }),
      );
      setCounter(1);
    } else {
      dispatch(addProductToCart({ token, productId: product.id, quantity: counter }));
      setCounter(1);
    }
  };

  const handleDecrease = () => {
    const newCounter = counter - 1;
    if (newCounter >= 1) setCounter(newCounter);
  };

  const handleChangeImageIncrease = () => {
    if (changeImage < 2) setChangeImage(changeImage + 1);
  };

  const handleChangeImageDecrease = () => {
    if (changeImage > 0) setChangeImage(changeImage - 1);
  };

  return (
    <div>
      <section className="flex flex-col items-center max-sm:w-[3rem] max-sm:items-center max-sm:ml-28">
        <div className="flex flex-row items-center justify-center h-96 max-sm:w-40">
          <button
            className="text-white bg-orange-500 max-h-6 rounded-xl px-1"
            onClick={handleChangeImageDecrease}
          >
            <i className="bx bxs-chevron-left"></i>
          </button>
          <div className="w-[27.8rem] flex felx-row justify-center">
            <img
              className="max-h-[22rem] max-sm:max-h-[16rem] max-w-[27.5rem] max-sm:max-w-[19rem]"
              src={product.images[changeImage]?.url}
              alt={product.brand}
            />
          </div>
          <button
            className="text-white bg-orange-500 max-h-6 rounded-xl px-1"
            onClick={handleChangeImageIncrease}
          >
            <i className="bx bxs-chevron-right"></i>
          </button>
        </div>
        <div>
          <p className="font-semibold text-[#c7c7c7] text-lg">{product.brand}</p>
          <h1 className="ml-3 font-bold text-[#4f4f4f] text-2xl">{product.title}</h1>
          <section className="flex flex-row justify-between w-full">
            <div>
              <h2 className="font-semibold text-[#c7c7c7] text-lg">Price</h2>
              <p className="ml-3 font-bold text-[#4f4f4f] text-xl">$ {product.price}</p>
            </div>
            <div className="ml-60 max-sm:ml-40">
              <h2 className="font-semibold text-[#c7c7c7] text-lg">Quantity</h2>
              <div className="flex-row justify-center items-center border">
                <button
                  onClick={() => setCounter(counter + 1)}
                  className="border-r-2 text-center px-2  max-sm:px-1"
                >
                  +
                </button>
                <span className="px-4 max-sm:px-2">{counter}</span>
                <button
                  onClick={handleDecrease}
                  className="border-l-2 text-center px-3 max-sm:px-2"
                >
                  -
                </button>
              </div>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-orange-400 text-xl font-semibold mt-4">Description</h2>
            <p className="font-normal text-s text-justify">{product.description}</p>
          </section>
          <button
            className="bg-orange-500 w-full flex flex-row justify-center items-center gap-3 text-white py-2 mt-8"
            onClick={handleAddCart}
            disabled={cart.loading}
          >
            <p className="font-semibold">Add to cart</p>
            <i className="bx bx-cart-add"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;
