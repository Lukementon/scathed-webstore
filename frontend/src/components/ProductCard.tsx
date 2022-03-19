import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<Props> = ({
  name,
  image,
  category,
  price,
  description,
}) => {
  const [size, setSize] = useState('');
  const handleSelectChange = () => setSize('m');
  return (
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
          color='inherit'
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
        <FormControl variant='outlined'>
          <InputLabel id='demo-simple-select-outlined-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={size}
            onChange={handleSelectChange}
            label='Age'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
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

const StyledProductMedia = styled(CardMedia)`
  height: 30rem;
  width: 100%;
`;
