// imageByIndex.ts
export const images: string[] = [];

// Atualize a função fetchImagesFromAPI
const fetchImagesFromAPI = async () => {
  try {
    const response = await fetch('http://localhost:3001/todos');
    if (!response.ok) {
      throw new Error('Erro ao buscar imagens da API.');
    }
    const data = await response.json();
    console.log(data)
    const fetchDataImagem = data.rows.map(element => {
      // Pré-anexe 'http://localhost:3001/images/' a cada URL de imagem
      return `http://localhost:3001/images/${element.imagem}`;
    })

    // Atualize o array de imagens com as URLs da API
    images.length = 0; // Limpe o array existente
    images.push(...fetchDataImagem);

  } catch (error) {
    console.error('Erro ao buscar imagens da API:', error);
  }
};

// Certifique-se de que o servidor Express esteja configurado para servir as imagens do diretório public/images/ na rota localhost:3001/images/.
// Dessa forma, ao pré-anexar o URL da imagem com http://localhost:3001/images/, o componente EmblaCarousel renderizará as imagens corretamente.
fetchImagesFromAPI();


// Essa função agora irá retornar o caminho da imagem pelo índice
export const imageByIndex = (index: number): string => images[index % images.length];
