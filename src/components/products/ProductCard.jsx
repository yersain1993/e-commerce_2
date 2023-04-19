import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../store/slices/cart.slice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const isPorductInCart = cart.products.some(
    (cartPorduct) => cartPorduct.id === product.id,
  );

  const handleAddProductBtn = (e) => {
    e.stopPropagation();
    if (isLogged) {
      dispatch(addProductToCart({ token, quantity: 1, productId: product.id }));
    } else navigate('/login');
  };

  return (
    <article
      key={product.id}
      className="text-black border-2 bg-white w-64 h-[25rem] rounded-lg cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative flex flex-row justify-center items-center object-sclae-down h-[9.9rem]">
        <img
          src={product.images[0].url}
          alt={product.title}
          className="absolute mt-2 max-w-[14rem] max-h-[9.5rem] hover:opacity-0 duration-1000"
        />
        <img
          src={product.images[1].url}
          alt={product.title}
          className="mt-2 max-w-[14rem] max-h-[7.7rem] hover:opacity-10 transition-all duration-1000 ease-in-out"
        />
      </div>
      <section className="relative mt-4 border-t-2">
        <h2 className="mt-3 ml-3 font-bold text-[#c7c7c7]">{product.brand}</h2>
        <p className="mt-1 ml-6 font-bold text-[#4f4f4f]">{product.title}</p>
        <h2 className="mt-3 ml-3 font-bold text-[#c7c7c7]">Price</h2>
        <p className="mt-1 ml-6 font-bold text-[#4f4f4f]">$ {product.price}</p>
        <div className="absolute ml-52">
          {!isPorductInCart && (
            <button
              className="bg-orange-500 px-3 py-2 rounded-full text-lg text-white"
              onClick={handleAddProductBtn}
              disabled={cart.loading}
            >
              <i className="bx bx-cart-add"></i>
            </button>
          )}
          {isPorductInCart && (
            <p className="text-orange-400 text-center text-3xl px-3 py-2 ">
              <i className="bx bx-check-circle"></i>
            </p>
          )}
        </div>
      </section>
    </article>
  );
};

export default ProductCard;
