// components/Page.tsx
import React from 'react';
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
  onPageChange: (page: number) => void;
}

const Page: React.FC<Props> = ({ currentPage, onPageChange }) => {
  const texts = getPaginatedTexts(currentPage);

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <>
      <TextGrid texts={texts} currentPage={currentPage} />
      <div className="text-center py-3">
        <button className="btn btn-primary" onClick={handleNextPage}>
          Carregar mais
        </button>
      </div>
    </>
  );
};

export default Page;
