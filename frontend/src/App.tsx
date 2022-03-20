import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:id' element={<ProductDetailsPage />} />
          </Routes>
        </Main>
      </AppContainer>
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
`;
