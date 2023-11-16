// pages/index.tsx
import React, { useEffect } from 'react';
import Carousel from '../components/Carousel';
import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('../components/TextGrid'), { ssr: false })


interface Props {
  currentPage: number;
}

const Home: React.FC<Props> = ({ currentPage }) => {
  useEffect(()=>{
    async function updateAccessCount() {
      try {
        // Construa a URL completa do ponto de extremidade.
        const apiUrl = 'http://localhost:3001/update-access-count';
    
        // Faça uma solicitação POST para o ponto de extremidade.
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indica que você está enviando JSON no corpo da solicitação.
          },
          body: JSON.stringify({}), // Você pode enviar quaisquer dados relevantes no corpo. Neste exemplo, estamos enviando um objeto vazio.
        });
    
        if (response.status === 200) {
          // A solicitação foi bem-sucedida.
          const data = await response.json();
          console.log(`Contador de acesso atualizado: ${data.count}`);
        } else {
          // A solicitação não foi bem-sucedida.
          console.error('Erro ao atualizar o contador de acesso');
        }
      } catch (error) {
        // Ocorreu um erro na solicitação.
        console.error('Erro na solicitação: ', error);
      }
    }
    updateAccessCount()
  },[])

  
  return (
    <>
    
      <main>
        <Carousel />
        <NoSSR />
      </main>

    </>
  );
};

export default Home;
