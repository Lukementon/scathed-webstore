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
import Alert from '../components/@scathed-ui/alert/Alert';
import ProductLoader from '../components/@scathed-ui/loading/ProductLoader';
import useSingleProduct from '../hooks/products/useSingleProduct';
import { useSelectStyles } from '../hooks/styles/themes';

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantityArray, setQuantityArray] = useState<number[] | undefined>();
  const [selectedQuantity, setSelectedQuantity] = useState<number | string>('');

  const navigate = useNavigate();
  const classes = useSelectStyles();
  const params = useParams();
  const productIdFromUrlParams = params.id ?? '';

  const { product, productLoading, productError } = useSingleProduct(
    productIdFromUrlParams
  );

  const totalProductStock = product?.countInStock
    .map(({ stock }) => stock)
    .reduce((acc, cur) => acc + cur, 0);

  const availableQuantitiesForEachSize = Object.fromEntries(
    product?.countInStock?.map(el => [el.size, el.stock]) ?? []
  );

  const quantityForSelectedSize = Object.entries(
    availableQuantitiesForEachSize
  ).find(key => key[0] === selectedSize)?.[1];

  const createData = (name: string, count: number) => ({ name, count });
  const rows = [
    createData('Quantity:', selectedQuantity as number),
    createData('In stock;', totalProductStock as number),
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
          <StyledGoBackIcon fontSize='large' onClick={() => navigate('/')} />
        </Tooltip>
      </TooltipContainer>
      {productLoading && <ProductLoader />}
      {productError && (
        <Alert
          severity='error'
          variant='filled'
          message={productError as string}
        />
      )}
      <ProductImageContainer>
        <ProductImage src={product?.image} alt={product?.name} />
      </ProductImageContainer>

      <SummaryContainer>
        <Typography variant='h5' color='inherit' children={product?.name} />
        <Typography variant='h5' color='inherit' children={product?.price} />
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
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                    setSelectedSize(e.target.value as string)
                  }
                  label='Size'
                >
                  {product?.countInStock?.map(({ size }) => (
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

                <AddToCartButton variant='outlined' color='secondary'>
                  Add to cart
                </AddToCartButton>
              </StyledFormControl>
            </FormContainer>
          </CardActions>
        </SummaryCard>
        <StyledDescription
          variant='body1'
          color='inherit'
          children={product?.description}
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

const StyledDescription = styled(Typography)`
  && {
    max-width: fit-content;
    margin-top: 1rem;
  }
`;

const ProductImageContainer = styled.div`
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
