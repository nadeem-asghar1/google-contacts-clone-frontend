import { Navigate, Outlet } from 'react-router-dom';
import Appbar from './components/Elements/Appbar';

const PrivateRoute = ({ isAuth: auth }) => {
  return auth ?
    <>
      <Appbar Component={Outlet} />
    </> : <Navigate to="/login" />;
}

export default PrivateRoute
