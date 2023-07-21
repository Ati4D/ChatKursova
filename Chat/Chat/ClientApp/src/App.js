import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout/Layout';
import './custom.css';
import AuthentificatedProvider from './providers/AuthentificatedProvider';

function App() {
  return (
    <AuthentificatedProvider>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </AuthentificatedProvider>
  );
}

export default App;