import { Text } from './GridAdmin';

export interface AdminGridText {
  data: {
    rows: Text[];
    count: number;
  };
  onPageChange: (pageNumber: number) => void;
}
