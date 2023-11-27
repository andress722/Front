// components/Page.tsx
import React, { useEffect, useState } from 'react';
import TextGrid from './TextGrid';
import getPaginatedTexts from '../pages/api/getPaginatedTexts';

interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
}

interface PageProps {
  onPageChange: (page: number) => void;
}

const Page: React.FC<PageProps> = ({ onPageChange }) => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const textData = await getPaginatedTexts(currentPage);
        setTexts(textData);
      } catch (error) {
        console.error('Error fetching paginated texts:', error);
      }
    };

    fetchTexts();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    onPageChange(currentPage + 1);
  };

  return (
    <>
      <TextGrid />
      <div className="text-center py-3">
        <button className="btn btn-primary" onClick={handleNextPage}>
          Carregar mais
        </button>
      </div>
    </>
  );
};

export default Page;
