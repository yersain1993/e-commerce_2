import { productsServices } from '../../services/productsServices';
import { categoriesServices } from '../../services/categoriesServices';

export const productsLoader = async ({ request }) => {
  const categories = await categoriesServices();
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  const categoryId = url.searchParams.get('category');

  let products;

  if (categoryId && title) {
    products = await productsServices({ categoryId, title });
  } else if (title) {
    products = await productsServices({ title });
  } else if (categoryId) {
    products = await productsServices({ categoryId });
  } else {
    products = await productsServices();
  }

  return {
    products,
    categories,
    category: categories.find((x) => x.id.toString() === categoryId),
    title,
  };
};
