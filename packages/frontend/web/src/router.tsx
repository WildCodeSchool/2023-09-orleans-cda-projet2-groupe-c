import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import HomeButtons from './components/home/HomeButtons';
import HomeCards from './components/home/HomeCards';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';

function AppRouter() {
  // State isLoggedIn from AuthContext for knowing if the user is logged in
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          {/* Children's routes of "/" */}
          <Route index element={isLoggedIn ? <HomeCards /> : <HomeButtons />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
