import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../../services/getCart';
import { addProduct } from '../../services/addProduct';
import { deleteFromCart } from '../../services/deleteProductCart';
import { updateQuantityCart } from '../../services/updateQuantityCart';
import { createPurchase } from '../../services/createPurchase';

const initialState = {
  products: [],
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProduct(state, action) {
      state.products = action.payload;
    },
    setCartLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const { setCartLoading, setCartProduct } = cartSlice.actions;
//thunks
export const loadCartProducts = (token) => async (dispatch) => {
  dispatch(setCartLoading(true));

  const cart = await getCart(token);
  dispatch(setCartProduct(cart));
  dispatch(setCartLoading(false));
};

export const addProductToCart =
  ({ token, quantity, productId }) =>
  async (dispatch) => {
    dispatch(setCartLoading(true));
    await addProduct({ token, quantity, productId });

    dispatch(loadCartProducts(token));
  };

export const deleteProductFromCart =
  ({ token, cartProductId }) =>
  async (dispatch) => {
    dispatch(setCartLoading(true));
    await deleteFromCart({ token, cartProductId });

    dispatch(loadCartProducts(token));
  };

export const updateQuantityProductCart =
  ({ token, cartProductId, quantity }) =>
  async (dispatch) => {
    dispatch(setCartLoading(true));
    await updateQuantityCart({ token, cartProductId, quantity });

    dispatch(loadCartProducts(token));
  };

export const buyCart = (token) => async (dispatch) => {
  dispatch(setCartLoading(true));
  await createPurchase(token);

  dispatch(loadCartProducts(token));
};

// export const purchasesPorducts = (token) => async (dispatch) => {
//   const purchases = await getPurchases(token);
//   dispatch(setPurchasesProducts(purchases));
// };

export default cartSlice.reducer;
