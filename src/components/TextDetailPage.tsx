import React from 'react';
import { useRouter } from 'next/router';

interface TextDetailsProps {
  text: Text;
}

interface Text {
  id: number;
  nome: string;
  imagem: string;
  titulo: string;
  texto: string;
  data_criacao: string;
  categoria: string;
}

const TextDetails: React.FC<TextDetailsProps> = ({ text }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-details">
      <h1 className="text-details-title">{text.titulo}</h1>
      <img src={text.imagem} alt={`Imagem para ${text.titulo}`} className="text-details-image" />
      <p className="text-details-text">{text.texto}</p>
      <p className="text-details-category">Categoria: {text.categoria}</p>
    </div>
  );
};

export default TextDetails;