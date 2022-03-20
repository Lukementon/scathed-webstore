import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <AppContainer>
          <Header />
          <Main>
            <Route path='/' element={<HomePage />} />
          </Main>
        </AppContainer>
      </Routes>
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
  padding-bottom: 3rem;
  color: white;
`;
