import { useRouter } from 'next/router';
import Pagination from 'react-bootstrap/Pagination';
import { useState } from 'react';
import useApi from '../../hooks/useApi';
import GridConteudo from '../../components/categoriaFilter';

const CategoryPage = () => {
  const router = useRouter();
  const { categoria } = router.query;

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Atualize a URL da API para a nova rota
  const apiUrl = `https://apiautism-5571b7254db2.herokuapp.com/categorias/${categoria}?page=${currentPage}&pageSize=${itemsPerPage}`;

  const { data, loading, error } = useApi(apiUrl);
  console.log(data);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid " style={{ marginTop: '20px' }}>
      <h1 className="mb-4">Conteúdos</h1>

      {/* Passe data diretamente para o componente GridConteudo */}
      <GridConteudo data={data} onPageChange={handlePageChange} categoria={categoria as string} />
    </div>
  );
};

export default CategoryPage;
