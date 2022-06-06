import { createTheme, ThemeProvider } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import useAutoLogin from './hooks/auth/useAutoLogin';
import useInitGoogleClient from './hooks/auth/useInitGoogleClient';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RegisterUserPage from './pages/RegisterUserPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import SignInPage from './pages/SignInPage';

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

const App = () => {
  useAutoLogin();
  useInitGoogleClient();

  return (
    <AppContainer>
      <Header />
      <Main>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:id' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<ShoppingCartPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/register' element={<RegisterUserPage />} />
          </Routes>
        </ThemeProvider>
      </Main>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  background-color: #1d1d1d;
  min-height: 100vh;
`;

const Main = styled.main`
  max-width: 1450px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  padding-bottom: 3rem;
  color: white;

  @media (max-width: 1500px) {
    width: 100%;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
