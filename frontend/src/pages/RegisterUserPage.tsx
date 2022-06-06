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
import useFormRegistration from '../hooks/auth/useFormRegistration';
import useGoogleLogin from '../hooks/auth/useGoogleLogin';
import { useSelectStyles } from '../hooks/styles/themes';
import { userState } from '../state/user/user';

const RegisterUserPage: React.FC = () => {
  const user = useRecoilValue(userState);
  const [registerName, setRegisterName] = useState<string | undefined>();
  const [registerEmail, setRegisterEmail] = useState<string | undefined>();
  const [registerPassword, setRegisterPassword] = useState<
    string | undefined
  >();
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState<
    string | undefined
  >();

  const registrationPasswordsMatch = useMemo(
    () => registerPassword === confirmRegisterPassword,
    [registerPassword, confirmRegisterPassword]
  );
  const isFormLoginSubmitEnabled = useMemo(
    () =>
      !!registerName &&
      !!registerEmail &&
      !!registerPassword &&
      registrationPasswordsMatch,
    [registerEmail, registerName, registerPassword, registrationPasswordsMatch]
  );

  const classes = useSelectStyles();
  const navigate = useNavigate();
  const { googleLoginError, loginWithGoogle, setGoogleLoginError } =
    useGoogleLogin();
  const { registerWithForm, formRegistrationError } = useFormRegistration();
  const registrationError = useMemo(
    () => googleLoginError || formRegistrationError,
    [googleLoginError, formRegistrationError]
  );

  const handleFormRegistration = useCallback(async () => {
    if (registerEmail && registerName && registerPassword)
      await registerWithForm({
        email: registerEmail,
        name: registerName,
        password: registerPassword,
      });
  }, [registerEmail, registerName, registerPassword, registerWithForm]);

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
    user?.email && navigate('/');
  }, [user?.email, navigate]);

  return (
    <RegisterContainer>
      {registrationError && (
        <Alert
          severity='error'
          variant='filled'
          message={registrationError as string}
        />
      )}
      <RegisterCard raised={true}>
        <Typography variant='body1' color='inherit'>
          Register
        </Typography>
        <FormControl>
          <StyledTextField
            variant='outlined'
            label='Name'
            inputProps={{ className: classes.input }}
            onChange={e => setRegisterName(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            label='Email'
            inputProps={{ className: classes.input }}
            onChange={e => setRegisterEmail(e.target.value)}
          />
          <StyledTextField
            type='password'
            variant='outlined'
            label='Password'
            inputProps={{ className: classes.input }}
            onChange={e => setRegisterPassword(e.target.value)}
          />
          <StyledTextField
            type='password'
            variant='outlined'
            label='Confirm Password'
            inputProps={{ className: classes.input }}
            onChange={e => setConfirmRegisterPassword(e.target.value)}
          />
          <RegisterButton
            variant='outlined'
            color='secondary'
            disabled={!isFormLoginSubmitEnabled}
            onClick={handleFormRegistration}
          >
            Register
          </RegisterButton>
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
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterUserPage;

const RegisterContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RegisterCard = styled(Card)`
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

const RegisterButton = styled(Button)`
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
