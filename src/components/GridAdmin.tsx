import React, { useState } from 'react';
import styles from '../styles/styles.module.scss';
import Link from 'next/link';
import { Pagination } from 'react-bootstrap';

export interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
  imagem: string;
}

export interface GridData {
  rows: Text[];
  count: number;
}

interface AdminGridText {
  data: GridData; // Corrected the data type to GridData
  handleComponentChange: (componentName: string) => void;
}

const GridAdmin: React.FC<AdminGridText> = ({ data, handleComponentChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.count / itemsPerPage); // Access count from data
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className={`row row-cols-1 p-5 row-cols-md-3 ${styles.g2}`}>
        {data.rows.map((text) => (
          <div key={text.id} className="col">
            <Link href={`/text/${text.id}`}>
              {/* Removed legacyBehavior */}
              <a>
                <p>{text.titulo}</p>
              </a>
            </Link>
          </div>
        ))}
        {/* Pagination */}
        <button
          onClick={() => handleComponentChange('MainAdmin')}
          className={`btn btn-primary ${styles.btnText}`}
        >
          Novo Texto
        </button>
        <Pagination>
          {pageNumbers.map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default GridAdmin;
