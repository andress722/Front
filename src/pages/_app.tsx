// pages/_app.tsx
import React from 'react';
import { useEffect, useState } from "react";
import { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
useEffect(() => {
  typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
}, [])
useEffect(() => {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}, []);
  return (
    <>  
    
  
      <Header selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
      
          <div style={{ minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column' }}>
            <Component {...pageProps} selectedCategory={selectedCategory} />
          </div>
      <Footer />

      
    </>
  );
};

export default MyApp;
