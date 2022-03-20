import {
  Button,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Product } from '../types/types';

const ProductCard: React.FC<Product> = ({
  name,
  image,
  category,
  price,
  description,
  countInStock,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <StyledProductCard>
        <StyledProductHeader>
          <Typography
            variant='h6'
            color='inherit'
            children={name}
            component='p'
          />
          <Typography
            variant='body2'
            color='primary'
            children={category}
            component='p'
          />
        </StyledProductHeader>
        <StyledProductMedia image={image} title={name} />
        <CardContent>
          <Typography variant='body2' color='inherit' component='p'>
            {description}
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
              onChange={(e: any) => setSelectedSize(e.target.value)}
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
    </ThemeProvider>
  );
};

export default ProductCard;

const theme = createTheme({
  palette: {
    primary: {
      main: '#696969',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

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
