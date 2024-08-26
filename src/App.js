import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Pages/Dashboard';
import "react-toastify/dist/ReactToastify.css";
import NewContact from './components/Pages/NewContact';
import ShowContact from './components/Pages/ShowContact';
import FavoriteContacts from './components/Pages/FavoriteContacts';

function App() {
  const {user} = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/login' element={ user ? <Navigate to="/"/> : <Login />} />
        <Route exact path='/' element={ <PrivateRoute isAuth={user}/> }>
          <Route exact path='/' element={ <Dashboard/> } />
          <Route exact path='/new-contact' element={ <NewContact/> } />
          <Route exact path='/show-contact/:id' element={ <ShowContact/> } />
          <Route exact path='/favorite-contacts' element={ <FavoriteContacts/> } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
