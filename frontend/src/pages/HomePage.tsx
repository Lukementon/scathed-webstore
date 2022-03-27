import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Alert from '../@scathed-ui/alert/Alert';
import ProductLoader from '../@scathed-ui/loading/ProductLoader';
import ProductCard from '../components/ProductCard';
import useGetAllProducts from '../hooks/products/useGetAllProducts';
import { shoppingCartState } from '../state/products/cart';
import { Product } from '../types/types';

const HomePage = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);
  const { products, productsLoading, productsError } = useGetAllProducts();

  return (
    <HomePageContainer>
      {productsLoading && <ProductLoader />}
      {productsError && (
        <Alert
          severity='error'
          variant='filled'
          message={productsError as string}
        />
      )}
      {products?.map((product: Product) => (
        <ProductCard
          key={product._id}
          product={product}
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
      ))}
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 5rem;
  grid-row-gap: 3rem;

  @media (max-width: 431px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;
