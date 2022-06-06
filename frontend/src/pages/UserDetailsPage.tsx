import {
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Alert from '../@scathed-ui/alert/Alert';
import useUpdateUserDetals from '../hooks/auth/useUpdateUserDetails';
import { useSelectStyles } from '../hooks/styles/themes';
import { userState } from '../state/user/user';

const UserDetailsPage: React.FC = () => {
  const user = useRecoilValue(userState);
  const [userName, setUserName] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userPassword, setUserPassword] = useState<string | undefined>();
  const [confirmUserPassword, setConfirmUserPassword] = useState<
    string | undefined
  >();

  const userPasswordsMatch = useMemo(
    () => userPassword === confirmUserPassword,
    [userPassword, confirmUserPassword]
  );
  const isFormLoginSubmitEnabled = useMemo(
    () => !!userName && !!userEmail && !!userPassword && userPasswordsMatch,
    [userEmail, userName, userPassword, userPasswordsMatch]
  );

  const classes = useSelectStyles();
  const navigate = useNavigate();

  const { updateUser, userUpdateError } = useUpdateUserDetals();
  const registrationError = useMemo(() => userUpdateError, [userUpdateError]);

  const handleUpdateUserDetails = useCallback(async () => {
    if (userEmail && userName && userPassword)
      await updateUser({
        email: userEmail,
        name: userName,
        password: userPassword,
      });
  }, [userEmail, userName, userPassword, updateUser]);

  useEffect(() => {
    if (user?.name && user.email) {
      setUserEmail(user.email ?? '');
      setUserName(user.name ?? '');
    }
  }, [user, setUserEmail, setUserName]);

  useEffect(() => {
    if (!user?.email) navigate('/signin');
  }, [user?.email, navigate]);

  return (
    <UserDetailsContainer>
      {registrationError && (
        <Alert
          severity='error'
          variant='filled'
          message={registrationError as string}
        />
      )}
      <UserDetailsCard raised={true}>
        <Typography variant='body1' color='inherit'>
          Hello {user?.name}! Update your details here
        </Typography>
        <FormControl>
          <StyledTextField
            variant='outlined'
            placeholder='Name'
            inputProps={{ className: classes.input }}
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <StyledTextField
            variant='outlined'
            placeholder='Email'
            inputProps={{ className: classes.input }}
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
          <StyledTextField
            type='password'
            variant='outlined'
            placeholder='Password'
            inputProps={{ className: classes.input }}
            onChange={e => setUserPassword(e.target.value)}
          />
          <StyledTextField
            type='password'
            variant='outlined'
            placeholder='Confirm Password'
            inputProps={{ className: classes.input }}
            onChange={e => setConfirmUserPassword(e.target.value)}
          />
          <UpdateUserDetailsButton
            variant='outlined'
            color='secondary'
            disabled={!isFormLoginSubmitEnabled}
            onClick={handleUpdateUserDetails}
          >
            Save
          </UpdateUserDetailsButton>
        </FormControl>
      </UserDetailsCard>
    </UserDetailsContainer>
  );
};

export default UserDetailsPage;

const UserDetailsContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserDetailsCard = styled(Card)`
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

const UpdateUserDetailsButton = styled(Button)`
  && {
    margin-top: 0.5rem;
    padding: 0.5rem 0;
    width: 100%;
  }
`;
