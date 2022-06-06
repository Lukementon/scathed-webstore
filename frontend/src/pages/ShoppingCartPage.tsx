import { Button } from '@material-ui/core';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ShoppingCartItem from '../components/ShoppingCartItem';
import { shoppingCartState } from '../state/products/cart';
import { userState } from '../state/user/user';

const ShoppingCartPage = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleCheckoutClick = useCallback(() => {
    if (!user?.email) {
      const urlParams = new URLSearchParams({
        redirect: 'shipping',
      });
      navigate(`/signin?${urlParams.toString()}`);
    }
    navigate('/shipping');
  }, [user?.email, navigate]);

  useEffect(() => {
    if (!shoppingCart.length) navigate('/');
  }, [navigate, shoppingCart]);

  return (
    <ShoppingCartContainer>
      <ShoppingCartLeft>
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
      </ShoppingCartLeft>

      <ShoppingCartRight>
        <h3>
          Subtotal ({shoppingCart.length}) items: <span>€50.00</span>{' '}
        </h3>
        <ProceedToCheckoutButton
          variant='outlined'
          color='secondary'
          onClick={handleCheckoutClick}
        >
          Proceed to checkout
        </ProceedToCheckoutButton>
      </ShoppingCartRight>
    </ShoppingCartContainer>
  );
};

export default ShoppingCartPage;

const ShoppingCartContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ShoppingCartLeft = styled.div`
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

const ShoppingCartRight = styled.div`
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

const ProceedToCheckoutButton = styled(Button)`
  && {
    margin: 1.5rem 0 1rem 0;
    padding: 0.5rem 0;
    width: 80%;
  }
`;
