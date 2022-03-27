import styled from 'styled-components';
import EmptyState from '../emptyState/EmptyState';
const ProductLoader = () => {
  return (
    <Container>
      <EmptyState icon='tilegrid' title='Loading...' />
    </Container>
  );
};

export default ProductLoader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
