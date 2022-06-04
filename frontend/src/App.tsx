import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import SignInPage from './pages/SignInPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

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
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '',
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  return (
    <BrowserRouter>
      <RecoilRoot>
        <AppContainer>
          ;
          <Header />
          <Main>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                <Route path='/cart' element={<ShoppingCartPage />} />
                <Route path='/signin' element={<SignInPage />} />
              </Routes>
            </ThemeProvider>
          </Main>
        </AppContainer>
      </RecoilRoot>
    </BrowserRouter>
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
