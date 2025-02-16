import { Route, Routes } from 'react-router-dom';
import ROUTES from '../config/routes';
import Main from '../pages/Main/Main';
import Auth from '../pages/Auth/Auth';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.MAIN}
        element={<ProtectedRoute children={<Main />} />}
      />
      <Route
        path={ROUTES.AUTH}
        element={<Auth />}
      />
    </Routes>
  );
} 