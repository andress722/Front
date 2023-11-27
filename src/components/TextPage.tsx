// components/TextPage.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextGrid from './TextGrid';
import getPaginatedTexts from '../pages/api/getPaginatedTexts';

interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
}

interface Props {
  currentPage: number;
}

const TextPage: React.FC<Props> = ({ currentPage }) => {
  const [texts, setTexts] = useState<Text[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPaginatedTexts(currentPage);
      setTexts(data);
    };

    fetchData();
  }, [currentPage]);

  // Função para navegar para a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      router.push(`/page/${currentPage - 1}`);
    }
  };

  // Função para navegar para a próxima página
  const goToNextPage = () => {
    if (currentPage < totalPageCount) {
      router.push(`/page/${currentPage + 1}`);
    }
  };

  const totalPageCount = Math.ceil(texts.length / 4);

  return (
    <>
      <TextGrid />
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={goToPreviousPage}>
              Anterior
            </button>
          </li>
          {[...Array(totalPageCount)].map((_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => router.push(`/page/${index + 1}`)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPageCount ? 'disabled' : ''}`}>
            <button className="page-link" onClick={goToNextPage}>
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TextPage;
