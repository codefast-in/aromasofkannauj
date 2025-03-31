
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { RootState } from '@/store';

const Login = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />;
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
