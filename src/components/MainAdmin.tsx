// pages/index.tsx
import React from 'react';
import styled from '../styles/styles.module.scss';


interface Props {
  currentPage: number;
}

const Home: React.FC<Props> = () => {

    
  return (
    <>
    
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div>
                <h1>Controle de acessos</h1>
              </div>
              <div className={styled.bgGrid}>
                <div className={styled.bgGridChield}>
                  <h3>ACESSOS</h3>
                  <span>QTD</span>
                </div>
                <div className={styled.bgGridChield}>
                    <h3>TEXTO MAIS ACESSADO</h3>
                    <div>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                    </div>
                    
                </div>
                <div className={styled.bgGridChield}>
                    <h3>ULTIMO TEXTO LANÇADO</h3>
                    <span>1</span>
                </div>
                <div className={styled.bgGridChield}>
                    <h3>Ultima visita</h3>
                    <span>1</span>
                </div>
              </div>
            </main>

    </>
  );
};

export default Home;
