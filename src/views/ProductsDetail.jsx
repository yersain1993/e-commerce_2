import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productByIdServices } from '../services/productByIdServices';
import { productsServices } from '../services/productsServices';
import ProductCard from '../components/products/ProductCard';
import { categoriesServices } from '../services/categoriesServices';
import ProductInfo from '../components/productDetail/ProductInfo';

const ProductsDetail = () => {
  const { id } = useParams();
  const [product, setPorduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const productData = await productByIdServices(id);
      const categoryId = productData.categoryId;

      const similarProducts = await productsServices({ categoryId });
      const similarProductWithoutTargetProduct = similarProducts.filter(
        (product) => product.id !== productData.id,
      );

      setPorduct(productData);
      setSimilarProducts(similarProductWithoutTargetProduct);
    };

    loadData();
  }, [id]);

  return (
    <div className="p-20 bg-white">
      {!product ? <p>Loading product...</p> : <ProductInfo product={product} />}

      <aside className="mt-8">
        <h2 className="text-xl font-semibold text-orange-400">Discover similar items</h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-6">
          {similarProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default ProductsDetail;
