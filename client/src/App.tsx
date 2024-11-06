import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import Layout from './components/Layout';
import HeroPage from './pages/hero_page/HeroPage';
import { PrivateRoute, PublicRoute } from './components/AuthGuard';
// import { PrivateRoute } from './components/AuthGuard';
import LogInPage from './pages/login_page/LogInPage';
import RegisterPage from './pages/register_page/RegisterPage';
import HomePage from './pages/home_page/HomePage';
import ProfilePage from './pages/profile_page/ProfilePage';

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90svh',
  width: '100%',
  fontSize: '80px'
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <HeroPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <LogInPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <RegisterPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <HomePage />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <ProfilePage />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>
        {/* <Route path="*" element={<NotFoundPage />}  */}
      </Routes>
    </>
  );
}

export default App;
