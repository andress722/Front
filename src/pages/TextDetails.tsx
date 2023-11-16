import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
  imagem: string;
  categoria: string;
}

const TextDetails = ({ text }: { text: Text }) => {
  return (
    <div>
      <h1>{text.titulo}</h1>
      <img src={text.imagem} alt={`Imagem para ${text.titulo}`} />
      <p>{text.texto}</p>
      <p>Categoria: {text.categoria}</p>
    </div>
  );
};

export default TextDetails;
    