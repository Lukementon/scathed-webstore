import {
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Alert from '../@scathed-ui/alert/Alert';
import useFormRegistration from '../hooks/auth/useFormRegistration';
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
  const { registerWithForm, formRegistrationError } = useFormRegistration();
  const registrationError = useMemo(
    () => formRegistrationError,
    [formRegistrationError]
  );

  const handleFormRegistration = useCallback(async () => {
    if (shippingAddress && shippingCity && shippingCountry && shippingPostCode)
      await registerWithForm({
        email: shippingCity,
        name: shippingAddress,
        password: shippingPostCode,
      });
  }, [
    shippingAddress,
    shippingCity,
    shippingCountry,
    shippingPostCode,
    registerWithForm,
  ]);

  return (
    <ShippingDetailsContainer>
      {registrationError && (
        <Alert
          severity='error'
          variant='filled'
          message={registrationError as string}
        />
      )}
      <ShippingDetailsCard raised={true}>
        <Typography variant='body1' color='inherit'>
          Shipping Details
        </Typography>
        <FormControl>
          <StyledTextField
            variant='outlined'
            label='Address'
            inputProps={{ className: classes.input }}
            onChange={e => setShippingAddress(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='City'
            inputProps={{ className: classes.input }}
            onChange={e => setShippingCity(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='Post Code'
            inputProps={{ className: classes.input }}
            onChange={e => setShippingPostCode(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='Country'
            inputProps={{ className: classes.input }}
            onChange={e => setShippingCountry(e.target.value)}
          />
          <ContinueButton
            variant='outlined'
            color='secondary'
            disabled={!isShippingContinueButtonEnabled}
            onClick={handleFormRegistration}
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

const ShippingDetailsCard = styled(Card)`
  && {
    width: 40%;
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
