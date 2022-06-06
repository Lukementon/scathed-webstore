import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';
import useGetQuantityForSpecificItemSize from '../hooks/products/useGetQuantityForSpecificItemSize';
import { useSelectStyles } from '../hooks/styles/themes';
import { ShoppingCartItem } from '../state/products/cart';
import { Product } from '../types/types';
import { truncateString } from '../utils/text';

interface Props {
  product: Product;
  shoppingCart: ShoppingCartItem[];
  setShoppingCart: SetterOrUpdater<ShoppingCartItem[]>;
}

const ProductCard: React.FC<Props> = ({
  product,
  shoppingCart,
  setShoppingCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<number | string>('');

  const disabledAddToCartButton = !selectedSize || !selectedQuantity;

  const { _id, category, countInStock, description, image, name, price } =
    product;

  const classes = useSelectStyles();
  const navigate = useNavigate();
  const quantityArray = useGetQuantityForSpecificItemSize(
    countInStock,
    selectedSize
  );

  const redirectToProductDetailsPage = (id: string) =>
    navigate(`/product/${id}`);

  const addItemToShoppingCart = useCallback(
    (product: Product, size: string, quantity: string | number) => {
      const newProduct = {
        product,
        size,
        quantity,
      };

      const productExistsInCart = shoppingCart.find(
        (item: ShoppingCartItem) =>
          item.product._id === product._id && item.size === size
      );

      if (productExistsInCart) {
        setShoppingCart(
          shoppingCart.map((cartItem: ShoppingCartItem) =>
            cartItem.product._id === newProduct.product._id &&
            cartItem.size === newProduct.size
              ? newProduct
              : cartItem
          ) as ShoppingCartItem[]
        );
        return;
      }
      setShoppingCart([...shoppingCart, newProduct as ShoppingCartItem]);

      return;
    },
    [shoppingCart, setShoppingCart]
  );

  return (
    <StyledProductCard>
      <StyledProductHeader>
        <ProductNameTypography
          variant='h6'
          color='inherit'
          children={name}
          onClick={() => redirectToProductDetailsPage(_id)}
        />
        <Typography variant='body2' color='primary' children={category} />
      </StyledProductHeader>
      <StyledProductMedia image={image} title={name} />
      <CardContent>
        <Typography variant='body2' color='inherit' component='p'>
          {truncateString(description, 55)}
        </Typography>
        <Typography variant='body2' color='inherit' component='p'>
          €{price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <FormContainer>
          <StyledFormControl variant='outlined'>
            <InputLabel
              className={classes.root}
              id='demo-simple-select-outlined-label'
            >
              Size
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
              value={selectedSize}
              onChange={(
                e: React.ChangeEvent<{ name?: string; value: unknown }>
              ) => setSelectedSize(e.target.value as string)}
              label='Size'
            >
              {countInStock.map(({ size }) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <StyledFormControl variant='outlined'>
            <InputLabel
              className={classes.root}
              id='demo-simple-select-outlined-label'
            >
              Quantity
            </InputLabel>
            <Select
              className={classes.select}
              inputProps={{
                classes: {
                  icon: classes.icon,
                  root: classes.root,
                },
              }}
              disabled={!selectedSize}
              variant='outlined'
              color='primary'
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={selectedQuantity}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                setSelectedQuantity(e.target.value as number)
              }
              label='Size'
            >
              {quantityArray?.map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>

            <AddToCartButton
              onClick={() =>
                addItemToShoppingCart(product, selectedSize, selectedQuantity)
              }
              disabled={disabledAddToCartButton}
              variant='outlined'
              color='secondary'
            >
              Add to cart
            </AddToCartButton>
          </StyledFormControl>
        </FormContainer>
      </CardActions>
    </StyledProductCard>
  );
};

export default ProductCard;

const StyledProductCard = styled(Card)`
  && {
    width: 100%;
    height: 100%;
    background-color: #2e2e2e;
    color: white;
  }
`;

const StyledProductHeader = styled.div`
  && {
    padding: 1rem;
    color: white;
  }
`;

const ProductNameTypography = styled(Typography)`
  && {
    cursor: pointer;
  }
`;

const StyledProductMedia = styled(CardMedia)`
  height: 30rem;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    margin: 0.5rem 0;
    text-align: left;
  }
`;

const AddToCartButton = styled(Button)`
  && {
    margin: 1rem 0;
    padding: 0.5rem 0;
  }
`;
