import ProductCard from './ProductCard';
import { useLoaderData } from 'react-router-dom';
import { Form } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCartProducts } from '../../store/slices/cart.slice';

const ListProducts = () => {
  const dispatch = useDispatch();
  const { products, categories, category, title } = useLoaderData();

  const [categoryValue, setCategoryValue] = useState(category ?? null);
  const [nameValue, setNameValue] = useState(title ?? '');
  const [categoryToggle, setCategoryToggle] = useState(false);

  const { isLogged, token } = useSelector((state) => state.user);

  const handleChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const handleFilter = () => {
    setCategoryToggle(!categoryToggle);
  };

  useEffect(() => {
    if (isLogged) dispatch(loadCartProducts(token));
  }, [])

  useEffect(() => {
    setCategoryValue(category);
  }, [category]);

  useEffect(() => {
    setNameValue(title);
  }, [title]);

  // console.log(products.map(product => product.id));

  return (
    <div>
      <section className="mt-16">
        <Form className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center w-screen">
            <input
              type="search"
              name="title"
              placeholder="Type product for search"
              value={nameValue}
              onChange={handleChangeName}
              className="border border-gray-300 py-4 w-3/6 text-center"
            />
          </div>
          <div className="flex items-center gap-12">
            <fieldset className="">
              <section
                className={`flex flex-row gap-4 text-gray-400 font-semibold ${
                  !categoryToggle ? 'border-b-2' : ''
                }`}
              >
                <legend>Category</legend>
                <button onClick={handleFilter}>
                  {!categoryToggle ? (
                    <i className="bx bxs-down-arrow"></i>
                  ) : (
                    <i className="bx bxs-up-arrow"></i>
                  )}
                </button>
              </section>
              <div className={categoryToggle ? 'border-b-2' : ' '}>
                {categoryToggle &&
                  categories.map((category) => (
                    <div key={category.id}>
                      <label
                        htmlFor={category.id + category.name}
                        className={
                          categoryValue?.id === category.id ? 'text-orange-600' : ''
                        }
                      >
                        {category.name}
                      </label>
                      <input
                        className="hidden"
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={categoryValue?.id === category.id}
                        id={category.id + category.name}
                        onChange={() => {
                          setCategoryValue(category);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </fieldset>
            <button type="submit" className="text-slate-500 flex justify-end">
              <div className="text-2xl">
                <i className="bx bx-filter-alt"></i>
              </div>{' '}
              Filter{' '}
            </button>
          </div>
        </Form>
      </section>
      <section>
        <ul className="flex flex-wrap justify-center items-center gap-10 mt-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        {!products.length && (
          <div className="text-center text-orange-500">
            {' '}
            <div className="text-7xl">
              <i className="bx bxs-message-alt-error"></i>
            </div>{' '}
            <p className="font-semibold text-2xl">Product "{nameValue}" not found</p>{' '}
          </div>
        )}
      </section>
    </div>
  );
};

export default ListProducts;
