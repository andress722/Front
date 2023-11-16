import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import styled from '../styles/styles.module.scss';
import MainAdmin from '../components/MainAdmin'
import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('../components/GridAdmin'), { ssr: false })

const Home: React.FC = () => {
  const [autorizado, setAutorizado] = useState(false);
  const [sidebarCon, setSidebar] = useState(true)
  const [data, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const apiUrl = `http://localhost:3001/admin?page=${currentPage}&pageSize=${itemsPerPage}`;
  const [activeComponent, setActiveComponent] = useState('MainAdmin'); // Controla qual componente está ativo
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 

  useEffect(() => {
    async function handleLogin() {
      const token = localStorage.getItem('token');
      const expirationTime = Number(localStorage.getItem('tokenExpiration'));

      if (token && expirationTime) {
        const currentTime = new Date().getTime();
        console.log(currentTime);
        if (currentTime < expirationTime) {
          setAutorizado(true);
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              Authorization: token, // Envia o token no cabeçalho
            },
          });
          console.log(response);
          if (response.status === 200) {
            const data = await response.json();
            setTexts(data)
            console.log(data);
          }
        } else {
          // O token expirou. Redirecione o usuário para a página de login.
          localStorage.removeItem('token'); // Limpe o token expirado.
          localStorage.removeItem('tokenExpiration');
          window.location.href = '/login';
        }
      } else {
        // Não há token no localStorage. Redirecione o usuário para a página de login.
        window.location.href = '/login';
      }
    }
    handleLogin();
    
  }, [currentPage]);
 
  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
  };
  function handleLogout() {
    const token = localStorage.getItem('token');
    if (token) {
      // Remove o token e a sua data de expiração do localStorage.
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }

    // Recarrega a página.
    window.location.reload();
  }

  return (
    <div className={styled.admin}>
     
    
     
      {autorizado ? (
       <>
        {activeComponent === 'MainAdmin' && (
           
              <MainAdmin/>
           
          )}
          {activeComponent === 'NoSSR' && (
            <NoSSR data={data} onPageChange={handlePageChange} handleComponentChange={handleComponentChange}  />
          )}
        
        <div className={`container-fluid ${styled.fullHeight}`}>
          <button
            className="btn d-md-none" // Botão hamburguinho visível apenas em telas menores
            onClick={() => {
              const sidebar = document.getElementById('sidebar');
              sidebar?.classList.toggle(styled.active);
              setSidebar(!sidebarCon)
              console.log(sidebarCon)
            }}
            >
           <img  src="img/hambg.png" className={styled.img} />
          </button>
        
            <nav id="sidebar" className={`sidebar ${styled.active}`}>
            {sidebarCon ? <SideBar handleComponentChange={handleComponentChange} /> : ''}
            </nav>
            
            
          </div>
        </> 
       
      ) : (
        <div>
          <p>Você não está logado. Faça login para continuar.</p>
          <button className="btn btn-primary" onClick={handleLogout}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
