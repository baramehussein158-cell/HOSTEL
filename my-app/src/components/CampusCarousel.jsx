import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './CampusCarousel.scss';

const CampusCarousel = ({
  slides = [],
  title = '',
  description = '',
  variant = 'default',
  className = '',
  intervalMs = 4500,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || slides.length < 2) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, slides.length]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const goToSlide = (nextIndex) => {
    setActiveIndex((currentIndex) => {
      if (slides.length === 0) {
        return 0;
      }

      const normalizedIndex = (nextIndex + slides.length) % slides.length;
      return normalizedIndex === currentIndex ? currentIndex : normalizedIndex;
    });
  };

  return (
    <section className={`campus-carousel campus-carousel--${variant} ${className}`.trim()}>
      {(title || description) && (
        <div className="campus-carousel__header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}

      <div className="campus-carousel__frame" aria-live="polite">
        <div
          className="campus-carousel__track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {slides.map((slide, index) => (
            <article className="campus-carousel__slide" key={`${slide.alt || 'slide'}-${index}`}>
              <img src={slide.src} alt={slide.alt} className="campus-carousel__image" />
              <div className="campus-carousel__overlay">
                <p className="campus-carousel__eyebrow">{slide.eyebrow || 'Campus highlight'}</p>
                <h3>{slide.title || slide.alt || 'Campus image'}</h3>
                <p>{slide.copy || 'A high-resolution campus image used across the portal.'}</p>
              </div>
            </article>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="campus-carousel__controls">
            <button
              type="button"
              className="campus-carousel__arrow"
              onClick={() => goToSlide(activeIndex - 1)}
              aria-label="Show previous campus image"
            >
              <FaChevronLeft />
            </button>

            <div className="campus-carousel__dots" aria-label="Campus image navigation">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.alt || 'dot'}-${index}`}
                  type="button"
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => goToSlide(index)}
                  aria-label={`Show campus image ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="campus-carousel__arrow"
              onClick={() => goToSlide(activeIndex + 1)}
              aria-label="Show next campus image"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CampusCarousel;
