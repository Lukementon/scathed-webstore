import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';
import useGetQuantityForSpecificItemSize from '../hooks/products/useGetQuantityForSpecificItemSize';
import { useSelectStyles } from '../hooks/styles/themes';
import { ShoppingCartItem as CartItemType } from '../state/products/cart';
import { truncateString } from '../utils/text';

interface Props {
  cartItem: CartItemType;
  shoppingCart: CartItemType[];
  setShoppingCart: SetterOrUpdater<CartItemType[]>;
}

const ShoppingCartItem: React.FC<Props> = ({
  cartItem,
  shoppingCart,
  setShoppingCart,
}) => {
  const quantityArray = useGetQuantityForSpecificItemSize(
    cartItem.product.countInStock,
    cartItem.size
  );

  const [selectedQuantity, setSelectedQuantity] = useState<number | string>(
    cartItem.quantity
  );

  const classes = useSelectStyles();

  const updateItemQuantityInShoppingCart = useCallback(
    (selectedQuantity: number) => {
      setSelectedQuantity(selectedQuantity);

      const productExistsInCart = shoppingCart.find(
        (item: CartItemType) =>
          item.product._id === cartItem.product._id &&
          item.size === cartItem.size
      );

      if (!!productExistsInCart) {
        setShoppingCart(
          shoppingCart.map((cartItem: CartItemType) =>
            cartItem.product._id === productExistsInCart.product._id &&
            cartItem.size === productExistsInCart.size
              ? { ...productExistsInCart, quantity: selectedQuantity }
              : cartItem
          )
        );
      }
      return;
    },
    [cartItem, shoppingCart, setShoppingCart]
  );

  const removeItemFromShoppingCart = useCallback(
    (itemId: string, itemSize: string) => {
      const indexOfItemToRemove = shoppingCart.findIndex(
        item => item.product._id === itemId && item.size === itemSize
      );
      setShoppingCart(
        shoppingCart.filter((_, index) => index !== indexOfItemToRemove)
      );
    },
    [shoppingCart, setShoppingCart]
  );

  return (
    <ShoppingCartCard elevation={2}>
      <InnerProductCard>
        <ProductImage src={cartItem.product.image} />
        <ProductDetailsContainer>
          <h3>{cartItem.product.name}</h3>
          <p>{truncateString(cartItem.product.description, 120)}</p>
          <p>Size: {cartItem.size}</p>
          <ProductModificationContainer>
            <StyledFormControl variant='outlined'>
              <InputLabel
                className={classes.root}
                id='demo-simple-select-outlined-label'
              >
                Qty
              </InputLabel>
              <Select
                value={selectedQuantity}
                onChange={e =>
                  updateItemQuantityInShoppingCart(e.target.value as number)
                }
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
                {quantityArray?.map(num => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <Wrapper>
              <DeleteButton
                onClick={() =>
                  removeItemFromShoppingCart(
                    cartItem.product._id,
                    cartItem.size
                  )
                }
              >
                Delete
              </DeleteButton>
              <p>Price: €{cartItem.product.price.toFixed(2)}</p>
            </Wrapper>
          </ProductModificationContainer>
        </ProductDetailsContainer>
      </InnerProductCard>
    </ShoppingCartCard>
  );
};

export default ShoppingCartItem;

const ShoppingCartCard = styled(Paper)`
  && {
    background-color: #2f2f2f;
    color: white;
    min-width: 100%;
    margin: 1.5rem 0;
    padding: 1rem;
  }
`;

const InnerProductCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 10%;
  object-fit: contain;
  margin-right: 2rem;
`;

const ProductDetailsContainer = styled.div`
  width: 100%;
  > p {
    margin: 0.25rem 0;
  }
`;

const ProductModificationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;

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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.p`
  margin-right: 0.5rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
