// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import styled from '../styles/styles.module.scss';

interface SidebarProps {
  handleComponentChange: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleComponentChange }) => {
  return (
    <nav id="sidebar" className={styled.bgSideFull}>
      <div className="p-4">
        <h4>Menu</h4>
        <ul className="list-unstyled components">
          <li>
            <Link legacyBehavior href="#">
              <a onClick={() => handleComponentChange('MainAdmin')}>Home</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="#">
              <a onClick={() => handleComponentChange('About')}>About</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="#">
              <a onClick={() => handleComponentChange('Alterar informações')}>Alterar informações</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="#">
              <a onClick={() => handleComponentChange('NoSSR')}>Textos</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
