import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import styled from '../styles/styles.module.scss';
import MainAdmin from '../components/MainAdmin';
import dynamic from 'next/dynamic';

// Define o tipo para os dados esperados pelo componente NoSSR
interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string; // Adicione os campos ausentes da interface
  imagem: string;
}

interface GridData {
  rows: Text[];
  count: number;
}

// Define o tipo para as props do componente Home
interface Props {
  currentPage: number;
}

const NoSSR = dynamic(() => import('../components/GridAdmin'), { ssr: false });

const Home: React.FC<Props> = ({ currentPage }) => {
  const [autorizado, setAutorizado] = useState(false);
  const [sidebarCon, setSidebar] = useState(true);
  const [data, setData] = useState<GridData>({ rows: [], count: 0 });
  const itemsPerPage = 6;
  const apiUrl = `https://apiautism-5571b7254db2.herokuapp.com/admin?page=${currentPage}&pageSize=${itemsPerPage}`;
  const [activeComponent, setActiveComponent] = useState('MainAdmin');

  useEffect(() => {
    async function handleLogin() {
      const token = localStorage.getItem('token');
      const expirationTime = Number(localStorage.getItem('tokenExpiration'));

      if (token && expirationTime) {
        const currentTime = new Date().getTime();

        if (currentTime < expirationTime) {
          setAutorizado(true);
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          });

          if (response.status === 200) {
            const responseData: GridData = await response.json();
            setData(responseData);
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          window.location.href = '/login';
        }
      } else {
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
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }

    window.location.reload();
  }

  return (
    <div className={styled.admin}>
      {autorizado ? (
        <>
          {activeComponent === 'MainAdmin' && <MainAdmin />}
          {activeComponent === 'NoSSR' && (
            <NoSSR data={data} handleComponentChange={handleComponentChange} />
          )}

          <div className={`container-fluid ${styled.fullHeight}`}>
            <button
              className="btn d-md-none"
              onClick={() => {
                const sidebar = document.getElementById('sidebar');
                sidebar?.classList.toggle(styled.active);
                setSidebar(!sidebarCon);
              }}
            >
              <img src="img/hambg.png" className={styled.img} />
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
