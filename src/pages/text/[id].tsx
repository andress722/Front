import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/TextDetail.module.css'

interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
  imagem: string;
  categoria: string;
}

const TextDetailsPage = ({ text }: { text: Text | null }) => {
  useEffect(()=> {
    function handleSend(){
      console.log(text?.id)
      fetch(`http://localhost:3001/update-access-count/${text?.id}`, {
        method: 'POST',
        body: text?.id,})
    }
    handleSend()
  },[])

  if (!text) {
    // Texto não encontrado, exiba uma mensagem de erro
    return (
      <div className={styles.container}>
        <p className={styles.error}>Texto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.textDetails}>
        <h1 className={styles.title}>{text.titulo}</h1>
        <img src={`http://localhost:3001/images/${text.imagem}`} alt='' className={styles.image} />
        <p className={styles.text}>{text.texto}</p>
        <p className={styles.category}>Categoria: {text.categoria}</p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const response = await axios.get(`http://localhost:3001/todos/${id}`);
    const text = response.data;

    return {
      props: {
        text,
      },
    };
  } catch (error) {
    // Trate erros, por exemplo, texto não encontrado
    return {
      props: {
        text: null,
      },
    };
  }
}

export default TextDetailsPage;
