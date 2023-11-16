import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import GridConteudo from '../components/GridConteudo';
import { Pagination } from 'react-bootstrap';


const Conteudos: React.FC = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('DESC');
  const [sortBy, setSortBy] = useState('data_criacao');

  const apiUrl = `http://localhost:3001/?page=${currentPage}&pageSize=${itemsPerPage}&sortOrder=${sortOrder}&sortBy=${sortBy}`;

  const { data, loading, error } = useApi(apiUrl);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (column: string) => {
    // Se a coluna for a mesma, inverte o sentido da ordenação
    if (sortBy === column) {
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Se for uma nova coluna, define a coluna e o sentido padrão (descendente)
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: '20px' }}>
      <h1 className="mb-4">Conteúdos</h1>

      {/* Passe data diretamente para o componente GridConteudo */}
      <GridConteudo
        data={data}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
        sortBy={sortBy}
      />
    </div>
  );
};

export default Conteudos;
