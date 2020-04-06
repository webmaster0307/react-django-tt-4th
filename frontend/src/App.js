import React from 'react';
import { Switch, Route } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { commonRoutes, authRoutes, noAuthRoutes, adminRoutes } from './routes';
import MainLayout from './components/Layout';
import { useUser } from './context/user';

function App() {
  const { methods: { isLoggedIn, isAdmin } } = useUser();
  const getRoutes = () => {
    if(isAdmin()) {
      return adminRoutes.concat(authRoutes).concat(commonRoutes);
    }
    if(isLoggedIn()) {
      return authRoutes.concat(commonRoutes);
    }
    return noAuthRoutes.concat(commonRoutes);
  }
  return (
    <MainLayout>
      <ToastContainer autoClose={2000} position={toast.POSITION.TOP_RIGHT} />
      <Switch>
        {getRoutes().map((props, i) => 
        <Route key={i} {...props}/>)}
      </Switch>
    </MainLayout>
  );
}

export default App;
