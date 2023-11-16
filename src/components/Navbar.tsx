// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-primaryt">
      <div className="container">
        <Link legacyBehavior href="/" passHref>
          <a className="navbar-brand">Autismo</a>
        </Link>
        <button className="navbar-toggler ml-auto custom-toggler " 
                type="button" 
                data-toggle="collapse" 
                data-target="#nav3">
            <span className="navbar-toggler-icon bg-light"></span>
        </button>
          <span className="navbar-toggler-icon text-light"></span>
      
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link legacyBehavior href="/" passHref>
                <a className="nav-link">Página Inicial</a>
              </Link>
            </li>

            <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >  Paginas
  </a>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    <Link legacyBehavior href="/conteudos">
      <a className="dropdown-item">Todas as categorias</a>
    </Link>
    <Link legacyBehavior href="/autism">
      <a className="dropdown-item">Autismo</a>
    </Link>
    <Link legacyBehavior href="/cbd">
      <a className="dropdown-item">CBD</a>
    </Link>
    <Link legacyBehavior href="/treatment">
      <a className="dropdown-item">Tratamento</a>
    </Link>
  </div>
</li>
            <li className="nav-item">
              <Link legacyBehavior href="/sobre" passHref>
                <a className="nav-link">Sobre</a>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link legacyBehavior href="/contato" passHref>
                <a className="nav-link">Contato</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
