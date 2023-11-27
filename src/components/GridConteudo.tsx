import React from 'react';
import { Pagination } from 'react-bootstrap';

interface Text {
  // Define the type for Text
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
  if (data === null) {
    return null;
  }

  const { rows, count } = data;

  return (
    <>
      <div>
        {/* Render your content here using the data, handlePageChange, handleSortChange, etc. */}
      </div>
    </>
  );
};

export default GridConteudo;
