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
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../types/types';
import { truncateString } from '../utils/text';

const ProductCard: React.FC<Product> = ({
  name,
  image,
  category,
  price,
  description,
  countInStock,
  id,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const classes = useStyles();
  const navigate = useNavigate();

  const redirectToProductDetailsPage = (id: string) =>
    navigate(`/product/${id}`);

  return (
    <StyledProductCard>
      <StyledProductHeader>
        <ProductNameTypography
          variant='h6'
          color='inherit'
          children={name}
          onClick={() => redirectToProductDetailsPage(id)}
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
          <AddToCartButton variant='outlined' color='secondary'>
            Add to cart
          </AddToCartButton>
        </StyledFormControl>
      </CardActions>
    </StyledProductCard>
  );
};

export default ProductCard;

const useStyles = makeStyles({
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
  root: {
    color: 'white',
  },
});

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

const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
`;

const AddToCartButton = styled(Button)`
  && {
    margin: 1rem 0;
    padding: 0.5rem 0;
  }
`;
