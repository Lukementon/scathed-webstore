import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelectStyles } from '../hooks/styles/themes';
import products from '../products';
import { Product } from '../types/types';

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantityArray, setQuantityArray] = useState<number[] | undefined>();
  console.log('quantityArray', quantityArray);

  const navigate = useNavigate();
  const classes = useSelectStyles();
  const params = useParams();
  const productIdFromUrlParams = params.id;

  const { name, description, price, image, countInStock } = products.find(
    product => product.id === productIdFromUrlParams
  ) as Product;

  const totalProductStock = countInStock
    .map(({ stock }) => stock)
    .reduce((acc, cur) => acc + cur, 0);

  const availableQuantitiesForEachSize = Object.fromEntries(
    countInStock.map(el => [el.size, el.stock])
  );

  const quantityForSelectedSize = Object.entries(
    availableQuantitiesForEachSize
  ).find(key => key[0] === selectedSize)?.[1];

  const redirectToHomePage = () => navigate('/');

  const createData = (name: string, count: number) => ({ name, count });
  const rows = [
    createData('Quantity:', 0),
    createData('In stock;', totalProductStock),
  ];

  useEffect(() => {
    setQuantityArray(
      Array.from({ length: quantityForSelectedSize as number }, (_, i) => i + 1)
    );
  }, [quantityForSelectedSize]);

  return (
    <ProductDetailsContainer>
      <TooltipContainer>
        <Tooltip title='Back to products'>
          <StyledGoBackIcon fontSize='large' onClick={redirectToHomePage} />
        </Tooltip>
      </TooltipContainer>
      <ProductDetailsMiddle>
        <ProductImage src={image} alt={name} />
      </ProductDetailsMiddle>

      <SummaryContainer>
        <Typography variant='h5' color='inherit' children={name} />
        <Typography variant='h5' color='inherit' children={price} />
        <SummaryCard variant='outlined'>
          <CardContent>
            <TableContainer>
              <Table aria-label='simple table'>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell
                        style={{ color: 'white' }}
                        component='th'
                        scope='row'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, color: 'white' }}
                        align='right'
                      >
                        {row.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                  setSelectedSize(e.target.value as string)
                }
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
        </SummaryCard>
        <StyledDescription
          variant='body1'
          color='inherit'
          children={description}
        />
      </SummaryContainer>
    </ProductDetailsContainer>
  );
};

export default ProductDetailsPage;

const StyledGoBackIcon = styled(KeyboardBackspaceIcon)`
  color: white;
  cursor: pointer;
`;

const ProductDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const TooltipContainer = styled.div`
  @media (max-width: 1100px) {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
`;

const SummaryCard = styled(Card)`
  && {
    margin-top: 1rem;
    background-color: #2e2e2e;
    color: white;
  }
`;

const SummaryContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    width: 50%;
    text-align: center;
  }
  @media (max-width: 800px) {
    width: 70%;
  }
  @media (max-width: 530px) {
    width: 85%;
  }
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

const StyledDescription = styled(Typography)`
  && {
    max-width: fit-content;
    margin-top: 1rem;
  }
`;

const ProductDetailsMiddle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 60%;
  object-fit: contain;
  @media (max-width: 1100px) {
    width: 50%;
    margin-bottom: 2rem;
  }
  @media (max-width: 800px) {
    width: 70%;
  }
  @media (max-width: 530px) {
    width: 85%;
  }
`;
