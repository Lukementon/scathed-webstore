import { Button } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import ShoppingCartItem from '../components/ShoppingCartItem';
import { shoppingCartState } from '../state/products/cart';

const OrderSummaryPage = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  return (
    <OrderSummaryContainer>
      <OrderSummaryLeft>
        <h3>Your shopping cart</h3>
        {!shoppingCart.length && <h3>Your shopping cart is empty</h3>}

        <ShoppingCartItems>
          {shoppingCart.map(cartItem => (
            <ShoppingCartItem
              key={cartItem.product._id + cartItem.size}
              cartItem={cartItem}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          ))}
        </ShoppingCartItems>
      </OrderSummaryLeft>

      <OrderSummaryRight>
        <h3>
          Subtotal ({shoppingCart.length}) items: <span>€50.00</span>{' '}
        </h3>
        <ContinueButton
          variant='outlined'
          color='secondary'
          onClick={() => null}
        >
          Continue
        </ContinueButton>
      </OrderSummaryRight>
    </OrderSummaryContainer>
  );
};

export default OrderSummaryPage;

const OrderSummaryContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const OrderSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  margin-right: 2rem;
`;

const ShoppingCartItems = styled.div`
  width: 100%;
`;

const OrderSummaryRight = styled.div`
  background-color: #181818;
  min-height: 80vh;
  width: 25%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > h3 > span {
    color: #c5c5c5;
  }
`;

const ContinueButton = styled(Button)`
  && {
    margin: 1.5rem 0 1rem 0;
    padding: 0.5rem 0;
    width: 80%;
  }
`;
