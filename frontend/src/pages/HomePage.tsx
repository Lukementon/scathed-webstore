import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../types/types';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <HomePageContainer>
      {products.map(
        ({ name, image, category, price, description, countInStock, id }) => (
          <ProductCard
            key={name}
            id={id}
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 5rem;
  grid-row-gap: 3rem;

  @media (max-width: 431px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;
