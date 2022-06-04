import {
  Button,
  Card,
  Divider,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useCallback } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useSelectStyles } from '../hooks/styles/themes';

const SignInPage: React.FC = () => {
  const classes = useSelectStyles();

  const onSuccess = useCallback(async (res: any) => {
    try {
      await axios.post('/api/auth/', {
        token: res?.tokenId,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const onFailure = useCallback((res: any) => {
    console.log('failed', res);
  }, []);

  return (
    <SignInContainer>
      <SignInCard raised={true}>
        <Typography variant='body1' color='inherit'>
          Sign in
        </Typography>
        <FormControl>
          <StyledTextField
            variant='outlined'
            placeholder='Email'
            inputProps={{ className: classes.input }}
          />
          <StyledTextField
            variant='outlined'
            placeholder='Password'
            inputProps={{ className: classes.input }}
          />
          <SignInButton variant='outlined' color='secondary'>
            Sign in
          </SignInButton>
        </FormControl>
        <GoogleSection>
          <DividerSection>
            <StyledDivider orientation='horizontal' />
            <Typography variant='subtitle1' color='inherit'>
              Or
            </Typography>
            <StyledDivider orientation='horizontal' />
          </DividerSection>
          <GoogleLogin
            clientId='198030412686-r0sbk82tcl7cjjkvtngegs8vs5usvh82.apps.googleusercontent.com'
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </GoogleSection>
      </SignInCard>
    </SignInContainer>
  );
};

export default SignInPage;

const SignInContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignInCard = styled(Card)`
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

const SignInButton = styled(Button)`
  && {
    margin: 0.5rem 0;
    padding: 0.5rem 0;
    width: 100%;
  }
`;

const GoogleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DividerSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDivider = styled(Divider)`
  && {
    margin: 0 0.5rem;
    width: 5%;
    background-color: white;
  }
`;
