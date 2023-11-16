export const texts: string[] = [];

const fetchTextsFromAPI = async () => {
  try {
    const response = await fetch('http://localhost:3001/todos');
    if (!response.ok) {
      throw new Error('Erro ao buscar imagens da API.');
    }
    const data = await response.json();
    const fetchDataText = data.rows.map(element => {
     return element.titulo
    })
    
    console.log(fetchDataText)
   
    const apiTexts = fetchDataText || []
    // Atualize o array de imagens com as URLs da API
    texts.length = 0; // Limpe o array existente
    texts.push(...apiTexts);
    

  } catch (error) {
    console.error('Erro ao buscar textos da API:', error);
  }
};



fetchTextsFromAPI();

// Essa função agora irá retornar o caminho da imagem pelo índice
const imageByIndex = (index: number): string => texts[index % texts.length];

export default imageByIndex;
