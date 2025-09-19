import { defineStore } from "pinia";
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export const useProductsStore = defineStore('products', function () {
  const products = ref([]);
  const router = useRouter();

  async function loadProducts() {
    const allProductsQuery = gql`
      query Products {
        products {
          id
          title
          price
          description
          category
          image
          rating {
            rate
            count
          }
        }
      }
    `;

    const { result } = useQuery(allProductsQuery);

    watch(result, value => {
      products.value = value.products;
    });
  }

  function findProduct(productId) {
    const data = products.value.filter(item => item.id == productId);
    const product = data.length > 0 ? data[0] : null;
    return product;
  }

  function findProductsByIds(ids) {
    const data = products.value.filter((item) => ids.includes(item.id));
    return data;
  }

  function addProduct(data) {
    const product = {
      id: products.value.length,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: {
        rate: data.rate,
        count: data.count,
      },
    };
    products.value.push(product);
    router.push('/');
  }

  return { products, loadProducts, findProduct, findProductsByIds, addProduct };
});