import { defineStore } from "pinia";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import apolloClient from '../apollo/client';

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

    const { data } = await apolloClient.query({ query: allProductsQuery });
    products.value = data.products;
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

  async function addProduct(data) {
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
    products.value = [...products.value, product];

    const addProductQuery = gql`
      mutation AddProduct($productInput: ProductInput!) {
        addProduct(product: $productInput) {
          id
          title
        }
      }
    `;
    const params = { productInput: data };
    await apolloClient.mutate({ mutation: addProductQuery, variables: params});

    router.push('/');
  }

  return { products, loadProducts, findProduct, findProductsByIds, addProduct };
});