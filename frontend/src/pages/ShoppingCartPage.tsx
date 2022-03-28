import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useSelectStyles } from '../hooks/styles/themes';
import { ShoppingCartItem, shoppingCartState } from '../state/products/cart';
import { truncateString } from '../utils/text';

const ShoppingCartPage = () => {
  const [shoppingCart] = useRecoilState(shoppingCartState);

  const classes = useSelectStyles();
  return (
    <ShoppingCartContainer>
      <ShoppingCartLeft>
        <h3>Your shopping cart</h3>
        {!shoppingCart.length && <h3>Your shopping cart is empty</h3>}

        <ShoppingCartItems>
          {shoppingCart.map((cartItem: ShoppingCartItem) => (
            <ShoppingCartCard elevation={2}>
              <InnerProductCard>
                <ProductImage src={cartItem.product.image} />
                <div>
                  <h3>{cartItem.product.name}</h3>
                  <p>{truncateString(cartItem.product.description, 120)}</p>
                  <ProductModificationButton>
                    <StyledFormControl variant='outlined'>
                      <InputLabel
                        className={classes.root}
                        id='demo-simple-select-outlined-label'
                      >
                        Qty
                      </InputLabel>
                      <Select
                        className={classes.select}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                            root: classes.root,
                          },
                        }}
                        variant='outlined'
                        color='primary'
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Size'
                      >
                        {cartItem.product.countInStock?.map(({ stock }) => (
                          <MenuItem key={stock} value={stock}>
                            {stock}
                          </MenuItem>
                        ))}
                      </Select>
                    </StyledFormControl>
                    <p>Delete</p>
                  </ProductModificationButton>
                </div>
              </InnerProductCard>
            </ShoppingCartCard>
          ))}
        </ShoppingCartItems>
      </ShoppingCartLeft>

      <ShoppingCartRight>
        <h3>
          Subtotal ({shoppingCart.length}) items: <span>€50.00</span>{' '}
        </h3>
        <ProceedToCheckoutButton variant='outlined' color='secondary'>
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

const ShoppingCartCard = styled(Paper)`
  && {
    background-color: #363636;
    color: white;
    width: 100%;
    margin: 1.5rem 0;
    padding: 1rem;
  }
`;

const InnerProductCard = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 10%;
  object-fit: contain;
  margin-right: 2rem;
`;

const ProductModificationButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  > p {
    cursor: pointer;
    :hover {
      text-decoration: underline;
      color: #c5c5c5;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  && {
    width: 10%;
    margin-right: 1rem;
    text-align: left;
  }
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
