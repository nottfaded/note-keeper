import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.scss';
import './styles/theme.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';
import AppRoutes from './routes/AppRoutes';
import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>

      <ToastContainer
        position="bottom-right"
        autoClose={3_000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Router>
        <AppRoutes />
      </Router>

    </Provider>
  </StrictMode>,
)
