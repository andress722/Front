// api/getPaginatedTexts.ts
import axios from 'axios';

const textsPerPage = 4;

const getPaginatedTexts = async (page: number) => {
  try {
    const response = await axios.get('http://localhost:3001/textos');
    const texts = response.data;

    const startIndex = (page - 1) * textsPerPage;
    const endIndex = Math.min(startIndex + textsPerPage, texts.length);

    return texts.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching paginated texts:', error);
    return [];
  }
};

export default getPaginatedTexts;
