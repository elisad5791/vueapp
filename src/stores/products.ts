import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import apolloClient from '../apollo/client';
import { Product, ProductFormData, ProductInput, ProductsQueryResponse, AddProductMutationResponse } from '@/types';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const router = useRouter();

  async function loadProducts(): Promise<void> {
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

    const { data } = await apolloClient.query<ProductsQueryResponse>({ query: allProductsQuery });
    products.value = data.products;
  }

  function findProduct(productId: number): Product|null {
    const data: Product[] = products.value.filter((item: Product): boolean => item.id == productId);
    const product: Product = data.length > 0 ? data[0] : null;
    return product;
  }

  function findProductsByIds(ids: number[]): Product[] {
    const data: Product[] = products.value.filter((item: Product): boolean => ids.includes(item.id));
    return data;
  }

  async function addProduct(data: ProductFormData): Promise<void> {
    const product: Product = {
      id: products.value.length + 1,
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
        }
      }
    `;
    const params: ProductInput = { productInput: data };
    await apolloClient.mutate<AddProductMutationResponse>({ mutation: addProductQuery, variables: params});

    router.push('/');
  }

  return { products, loadProducts, findProduct, findProductsByIds, addProduct };
});
