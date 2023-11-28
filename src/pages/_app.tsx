// pages/_app.tsx
import React from 'react';
import { useEffect, useState } from "react";
import { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script';


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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
      <Script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" ></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></Script>
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></Script>
          <div style={{ minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column' }}>
            <Component {...pageProps} selectedCategory={selectedCategory} />
          </div>
      <Footer />

      
    </>
  );
};

export default MyApp;
