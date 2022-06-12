import { useMemo } from 'react';
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
  const isSignInActive = useMemo(() => signIn, [signIn]);
  const isShippingActive = useMemo(
    () => signIn && shipping,
    [signIn, shipping]
  );
  const isSummaryActive = useMemo(
    () => signIn && shipping && payment,
    [signIn, shipping, payment]
  );
  const isPlaceOrderActive = useMemo(
    () => signIn && shipping && payment && placeOrder,
    [signIn, shipping, payment, placeOrder]
  );

  return (
    <Container>
      <StyledBreadcrumbs>
        <StyledNode
          isActive={isSignInActive}
          onClick={() => isSignInActive && navigate('/signin')}
        >
          Sign in
        </StyledNode>
        <StyledDivider isActive={isSignInActive}> - </StyledDivider>
        <StyledNode
          color='secondary'
          isActive={isShippingActive}
          onClick={() => isShippingActive && navigate('/shipping')}
        >
          Shipping
        </StyledNode>
        <StyledDivider isActive={isShippingActive}> - </StyledDivider>
        <StyledNode
          color='secondary'
          isActive={isSummaryActive}
          onClick={() => isSummaryActive && navigate('/summary')}
        >
          Summary
        </StyledNode>
        <StyledDivider isActive={isSummaryActive}> - </StyledDivider>
        <StyledNode
          color='secondary'
          isActive={isPlaceOrderActive}
          onClick={() => isPlaceOrderActive && navigate('/placeorder')}
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

const StyledBreadcrumbs = styled.div`
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

const StyledDivider = styled.span<{ isActive: boolean }>`
  display: inline-block;
  margin: 0rem 1rem;
  color: ${({ isActive }) => (isActive ? 'white' : 'gray')};
`;
