import styled from 'styled-components';
import ProductLoader from '../components/@scathed-ui/ProductLoader';
import ProductCard from '../components/ProductCard';
import useGetAllProducts from '../hooks/products/useGetAllProducts';

const HomePage = () => {
  const { products, loading } = useGetAllProducts();

  return (
    <HomePageContainer>
      {loading && <ProductLoader />}
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
