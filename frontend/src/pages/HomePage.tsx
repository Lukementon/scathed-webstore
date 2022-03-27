import styled from 'styled-components';
import Alert from '../@scathed-ui/alert/Alert';
import ProductLoader from '../@scathed-ui/loading/ProductLoader';
import ProductCard from '../components/ProductCard';
import useGetAllProducts from '../hooks/products/useGetAllProducts';

const HomePage = () => {
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
      {products?.map(
        ({ name, image, category, price, description, countInStock, _id }) => (
          <ProductCard
            key={name}
            _id={_id}
            name={name}
            category={category}
            price={price}
            image={image}
            description={description}
            countInStock={countInStock}
          />
        )
      )}
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
