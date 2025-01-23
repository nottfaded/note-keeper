import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';
import AuthWrapper from './components/AuthWrapper';
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
        <AuthWrapper>
          <AppRoutes />
        </AuthWrapper>
      </Router>
    </Provider>
  </StrictMode>,
)
