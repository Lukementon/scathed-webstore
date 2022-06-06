import {
  Button,
  Card,
  Divider,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Alert from '../@scathed-ui/alert/Alert';
import useFormLogin from '../hooks/auth/useFormLogin';
import useGoogleLogin from '../hooks/auth/useGoogleLogin';
import useUrlParams from '../hooks/routing/useUrlParams';
import { useSelectStyles } from '../hooks/styles/themes';
import { userState } from '../state/user/user';

const SignInPage: React.FC = () => {
  const user = useRecoilValue(userState);
  const [loginEmail, setLoginEmail] = useState<string | undefined>();
  const [loginPassword, setLoginPassword] = useState<string | undefined>();

  const urlParams = useUrlParams();
  const classes = useSelectStyles();
  const navigate = useNavigate();
  const { googleLoginError, loginWithGoogle, setGoogleLoginError } =
    useGoogleLogin();
  const { loginWithForm, formLoginError } = useFormLogin();

  const loginError = useMemo(
    () => googleLoginError || formLoginError,
    [googleLoginError, formLoginError]
  );
  const redirectToShipping = useMemo(
    () => urlParams.get('redirect') === 'shipping',
    [urlParams]
  );
  const isFormLoginSubmitEnabled = useMemo(
    () => !!loginEmail && !!loginPassword,
    [loginEmail, loginPassword]
  );

  const handleRedirectOnSignin = useCallback(
    (urlPath: string) => navigate(urlPath),
    [navigate]
  );

  const handleFormLogin = useCallback(async () => {
    if (loginEmail && loginPassword)
      await loginWithForm({
        email: loginEmail,
        password: loginPassword,
      });
  }, [loginEmail, loginPassword, loginWithForm]);

  const onSuccess = useCallback(
    async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      await loginWithGoogle(googleData as GoogleLoginResponse);
    },
    [loginWithGoogle]
  );

  const onFailure = useCallback(
    error => {
      setGoogleLoginError(`Error logging in ${error}`);
    },
    [setGoogleLoginError]
  );

  useEffect(() => {
    if (redirectToShipping && user?.email) {
      handleRedirectOnSignin('/shipping');
      return;
    }
    if (user?.email) {
      handleRedirectOnSignin('/');
      return;
    }
  }, [redirectToShipping, user?.email, handleRedirectOnSignin]);

  return (
    <SignInContainer>
      {loginError && (
        <Alert
          severity='error'
          variant='filled'
          message={loginError as string}
        />
      )}
      <SignInCard raised={true}>
        <Typography variant='body1' color='inherit'>
          Sign in
        </Typography>
        <FormControl>
          <StyledTextField
            variant='outlined'
            label='Email'
            inputProps={{ className: classes.input }}
            onChange={e => setLoginEmail(e.target.value)}
          />
          <StyledTextField
            type='password'
            variant='outlined'
            label='Password'
            inputProps={{ className: classes.input }}
            onChange={e => setLoginPassword(e.target.value)}
          />
          <SignInButton
            variant='outlined'
            color='secondary'
            disabled={!isFormLoginSubmitEnabled}
            onClick={handleFormLogin}
          >
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
        <NoAccountSection>
          <Typography variant='body2'>Dont have an account?</Typography>
          <Signup variant='body2' onClick={() => navigate('/register')}>
            Sign up here
          </Signup>
        </NoAccountSection>
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
    margin-top: 0.5rem;
    padding: 0.5rem 0;
    width: 100%;
  }
`;

const GoogleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const DividerSection = styled.div`
  width: 100%;
  margin: 1rem 0;
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

const NoAccountSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Signup = styled(Typography)`
  && {
    cursor: pointer;
  }
`;
