import React from 'react';
import styles from '../styles/styles.module.scss'
import Link from 'next/link';


interface Text {
  id: number;
  nome: string;
  titulo: string;
  texto: string;
  data_criacao: string;
  imagem: string;
  categoria: string;
}

interface TextGridProps {
  data: {
    rows: Text[];
    count: number;
  } | null;
  onPageChange: (pageNumber: number) => void;
  categoria: string;
}

const GridConteudo: React.FC<TextGridProps> = ({ data, onPageChange, categoria }) => {
  if (data === null) {
    return null;
  }


  const { rows, count } = data;



console.log(categoria)

  const filteredRows = categoria
    ? rows.filter((text) => text.categoria === categoria)
    : rows;

  return (
    
      <div className={styles.body}>
        {filteredRows.map((text) => (
          <div key={text.id} className={styles.grid}>
            <Link legacyBehavior href={`/text/${text.id}`} passHref>
              <a>
                <div className={styles.cards}>
                  <img
                    src={`https://apiautism-5571b7254db2.herokuapp.com/images/${text.imagem}`}
                    alt={`Imagem para ${text.titulo}`}
                    className="card-img-top"
                  />
                  <div className={styles.cardBody}>
                    <h5 className="card-title">{text.titulo}</h5>
                    <p className={styles.cardText}>
                      {text.texto}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>

      
  
  );
};

export default GridConteudo;
