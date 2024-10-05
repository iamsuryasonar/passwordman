import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import Layout from './components/Layout';
import HeroPage from './pages/hero_page/HeroPage';
import { PublicRoute } from './components/AuthGuard';
// import { PrivateRoute } from './components/AuthGuard';
import LogInPage from './pages/login_page/LogInPage';
import RegisterPage from './pages/register_page/RegisterPage';


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
        </Route>
        {/* <Route path="*" element={<NotFoundPage />}  */}
      </Routes>
    </>
  );
}

export default App;
