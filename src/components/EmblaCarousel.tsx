import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import { imageByIndex } from './imageByIndex'; // Importe a função corretamente aqui
import textByIndex from '../components/textByIndex';
import styles from '../styles/SeuComponente.module.css';
import SubTextByIndex from '../components/SubTextByIndex';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const SeuComponente: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const applyStyleBasedOnBackground = () => {
    slides.forEach((_, index) => {
      const imgElement = document.getElementById(`backgroundImage-${index}`);
      console.log(imgElement);
      if (imgElement) {
        const imagePath = "image/" + imgElement.src; // Concatena a rota base com o nome da imagem
        const brightness = getBrightnessFromImage(imagePath);
  
        const threshold = 128;
  
        const textsContainer = document.querySelector(`#texts-${index}`);
        if (textsContainer) {
          if (brightness < threshold) {
            textsContainer.classList.add('text-light-background');
          } else {
            textsContainer.classList.add('text-dark-background');
          }
        }
      }
    });
  };
  const getBrightnessFromImage = (imageUrl: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageUrl;
  
      image.onload = () => {
        if (context) {
          canvas.width = 1;
          canvas.height = 1;
          context.drawImage(image, 0, 0, 1, 1);
          const pixel = context.getImageData(0, 0, 1, 1).data;
  
          const r = pixel[0];
          const g = pixel[1];
          const b = pixel[2];
  
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          resolve(brightness);
        } else {
          reject(new Error('Failed to get canvas 2d context.'));
        }
      };
  
      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
    applyStyleBasedOnBackground();
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className={`embla__viewport`} ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className={`embla__slide__number ${styles.container}`}>
                <span>{index + 1}</span>
              </div>
              <img
                crossOrigin="Anonymous"
                id={`backgroundImage-${index}`}
                className={`embla__slide__img ${styles.imgStyle}`}
                src={imageByIndex(index)} // Use a função imageByIndex para obter a URL da imagem
                alt="Your alt text"
                onLoad={applyStyleBasedOnBackground}
              />
              <div className={styles.texts} id={`texts-${index}`}>
                <p className={styles.highlightedText}>{textByIndex(index)}</p>
                <p>{SubTextByIndex(index)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={imageByIndex(index)} // Use a função imageByIndex para obter a URL da imagem
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeuComponente;
