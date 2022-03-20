import React from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import products from '../products';

const HomePage = () => {
  return (
    <HomePageContainer>
      {products.map(
        ({ name, image, category, price, description, countInStock }) => (
          <ProductCard
            key={name}
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
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 5rem;
  grid-row-gap: 3rem;

  @media (max-width: 431px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;
