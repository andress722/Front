import { Text } from './GridConteudo';

export interface TextGridProps {
  data: {
    rows: Text[];
    count: number;
  };
  onPageChange: (pageNumber: number) => void;
}
