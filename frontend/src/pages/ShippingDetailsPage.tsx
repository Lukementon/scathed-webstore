import {
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ShippingNavigation from '../components/ShippingNavigation';
import useGetUserShippingAddress from '../hooks/shipping/useGetUserShippingAddress';
import useSaveUserShippingAddress from '../hooks/shipping/useSaveUserShippingAddress';
import { useSelectStyles } from '../hooks/styles/themes';

const ShippingDetailsPage: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState<string | undefined>();
  const [shippingCity, setShippingCity] = useState<string | undefined>();
  const [shippingPostCode, setShippingPostCode] = useState<
    string | undefined
  >();
  const [shippingCountry, setShippingCountry] = useState<string | undefined>();

  const isShippingContinueButtonEnabled = useMemo(
    () =>
      !!shippingAddress &&
      !!shippingCity &&
      !!shippingPostCode &&
      !!shippingCountry,
    [shippingAddress, shippingCity, shippingCountry, shippingPostCode]
  );

  const classes = useSelectStyles();
  const navigate = useNavigate();
  const { saveUserShippingAddress } = useSaveUserShippingAddress();
  const { getUserShippingAddress } = useGetUserShippingAddress();

  const handleSubmit = useCallback(() => {
    saveUserShippingAddress({
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingPostCode,
    });
    navigate('/summary');
  }, [
    shippingAddress,
    shippingCity,
    shippingCountry,
    shippingPostCode,
    navigate,
    saveUserShippingAddress,
  ]);

  useEffect(() => {
    const { shippingAddress, shippingCity, shippingCountry, shippingPostCode } =
      getUserShippingAddress();
    setShippingAddress(shippingAddress);
    setShippingCity(shippingCity);
    setShippingCountry(shippingCountry);
    setShippingPostCode(shippingPostCode);
  }, [
    getUserShippingAddress,
    setShippingAddress,
    setShippingCity,
    setShippingCountry,
    setShippingPostCode,
  ]);

  return (
    <ShippingDetailsContainer>
      <ShippingNaviagationContainer>
        <ShippingNavigation signIn shipping />
      </ShippingNaviagationContainer>
      <ShippingDetailsCard raised={true}>
        <Typography variant='body1' color='inherit'>
          Shipping Details
        </Typography>
        <FormControl>
          <StyledTextField
            variant='outlined'
            label='Address'
            inputProps={{ className: classes.input }}
            value={shippingAddress}
            onChange={e => setShippingAddress(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='City'
            inputProps={{ className: classes.input }}
            value={shippingCity}
            onChange={e => setShippingCity(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='Post Code'
            inputProps={{ className: classes.input }}
            value={shippingPostCode}
            onChange={e => setShippingPostCode(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='Country'
            inputProps={{ className: classes.input }}
            value={shippingCountry}
            onChange={e => setShippingCountry(e.target.value)}
          />
          <ContinueButton
            variant='outlined'
            color='secondary'
            disabled={!isShippingContinueButtonEnabled}
            onClick={handleSubmit}
          >
            Continue
          </ContinueButton>
        </FormControl>
      </ShippingDetailsCard>
    </ShippingDetailsContainer>
  );
};

export default ShippingDetailsPage;

const ShippingDetailsContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ShippingNaviagationContainer = styled.div`
  && {
    width: 40%;
  }
`;

const ShippingDetailsCard = styled(Card)`
  && {
    width: 40%;
    margin-top: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    background-color: #2e2e2e;
    color: white;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem 0;
  }
`;

const ContinueButton = styled(Button)`
  && {
    margin-top: 0.5rem;
    padding: 0.5rem 0;
    width: 100%;
  }
`;
