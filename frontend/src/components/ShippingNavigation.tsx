import { Breadcrumbs } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  signIn?: boolean;
  shipping?: boolean;
  payment?: boolean;
  placeOrder?: boolean;
}

const ShippingNavigation: React.FC<Props> = ({
  signIn = false,
  shipping = false,
  payment = false,
  placeOrder = false,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledBreadcrumbs separator='-' aria-label='breadcrumb'>
        <StyledNode isActive={signIn} onClick={() => navigate('/signin')}>
          Sign in
        </StyledNode>
        <StyledNode
          color='secondary'
          isActive={signIn && shipping}
          onClick={() => navigate('/shipping')}
        >
          Shipping
        </StyledNode>
        <StyledNode
          color='secondary'
          isActive={signIn && shipping && payment}
          onClick={() => navigate('/payment')}
        >
          Payment
        </StyledNode>
        <StyledNode
          color='secondary'
          isActive={signIn && shipping && payment && placeOrder}
          onClick={() => navigate('/placeorder')}
        >
          Place order
        </StyledNode>
      </StyledBreadcrumbs>
    </Container>
  );
};

export default ShippingNavigation;

const Container = styled.div`
  width: 100%;
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const StyledNode = styled('span')<{ isActive: boolean }>`
  && {
    color: ${({ isActive }) => (isActive ? 'white' : 'gray')};
    cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  }
`;
