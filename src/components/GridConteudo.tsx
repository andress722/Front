import React, { useState } from 'react';
import Link from 'next/link';
import { Pagination } from 'react-bootstrap';
import styles from '../styles/styles.module.scss';

interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
  imagem: string;
  categoria: string;
}

interface TextGridProps {
  data: {
    rows: Text[];
    count: number;
  } | null;
  onPageChange: (pageNumber: number) => void;
  onSortChange: (column: string) => void;
  sortOrder: string;
  sortBy: string;
}

const GridConteudo: React.FC<TextGridProps> = ({ data, onPageChange, onSortChange, sortOrder, sortBy }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  if (data === null) {
    return null; // Não renderiza nada se data for null
  }

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    setCurrentPage(pageNumber); // Atualiza o estado local também
  };

  const { rows, count } = data;
  const totalPages = Math.ceil(count / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div className={styles.body}>
        {rows.map((text) => (
          <div key={text.id} className={styles.grid}>
            <Link legacyBehavior href={`/text/${text.id}`} passHref>
              <a>
                <div className={styles.cards}>
                  <img
                    src={`https://apiautism-5571b7254db2.herokuapp.com/images/${text.imagem}`}
                    alt={`Imagem para ${text.titulo}`}
                    className="card-img-top"
                  />
                  <div className={styles.cardBody}>
                    <h5 className="card-title">{text.titulo}</h5>
                    <p className={styles.cardText} style={{ overflow: 'hidden' }}>
                      {text.texto}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <Pagination className={styles.pagination}>
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
  );
};

export default GridConteudo;
