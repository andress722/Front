// GridConteudo.js

import React from 'react';
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

interface AdminGridText {
  data: {
    rows: Text[];
    count: number;
  } | null; // Altere o tipo para aceitar null
  onPageChange: (pageNumber: number) => void;
}

const GridAdmin: React.FC<AdminGridText> = ({ data, onPageChange }) => {
  if (data === null) {
    return null; // Não renderiza nada se data for null
  }
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    setCurrentPage(pageNumber); // Atualiza o estado local também
  };
  const { rows, count } = data;
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(count / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  

  console.log(rows)

  return (
    <>
      <div className={`row row-cols-1 p-5 row-cols-md-3 ${styles.g2}`}>
        {data.rows.map((text) => (
          <div key={text.id} className="col">
            <Link legacyBehavior href={`/text/${text.id}`}>
              <a>
                <p>{text.titulo}</p>
              </a>
            </Link>
          </div>
        ))}
        {/* Paginação */}
        <button onClick={()=>{window.location.href = '/newText'}} className={`btn btn-primary ${styles.btnText}`}>Novo Texto</button>
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
