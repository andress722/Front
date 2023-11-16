import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'



const TextSlider: React.FC = () => {

  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos');
        if (!response.ok) {
          throw new Error('Erro ao carregar textos.');
        }
        const data = await response.json();
        setTexts(data.rows);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar textos:', error);
        setIsLoading(false);
      }
    };

    fetchTexts();
  }, []);

  

  const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <section className="d-flex justify-content-center embla-principal">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </section>
  );
};

export default TextSlider;
