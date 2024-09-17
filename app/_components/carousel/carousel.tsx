'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import Icon from '@/components/icon/icon';
import styles from './carousel.module.css';

export type Props = {
  /**
   * The carousel slides.
   */
  slides: {
    id: string;
    content: React.ReactNode;
  }[];

  /**
   * The aria-label for the carousel.
   */
  label: string;

  /**
   * CSS class name for the top element.
   */
  className?: string;
};

/**
 * Displays a slideshow that cycles through content with button controls.
 */
export default function Carousel({ slides, label, className }: Props) {
  // there must be at least one slide
  if (slides.length < 1) {
    throw new Error('There must be at least one slide in the carousel');
  }

  // ensure each slide id is unique
  const allIds = slides.map(slide => slide.id);
  if (new Set(allIds).size !== slides.length) {
    throw new Error(
      `The ids for the carousel slides must be unique, but found "${allIds}"`,
    );
  }

  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleNext() {
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  function handlePrevious() {
    const prevIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  }

  return (
    <div
      className={clsx(styles.carousel, className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={clsx(
              styles.slide,
              index === activeIndex && styles.active,
            )}
            style={{ transform: `translateX(-${100 * activeIndex}%)` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== activeIndex}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrevious}
        aria-label="Previous slide"
        className={clsx(styles.control, styles.previous, 'flexCenter')}
      >
        <Icon name="arrowLeft" decorative />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className={clsx(styles.control, styles.next, 'flexCenter')}
      >
        <Icon name="arrowRight" decorative />
      </button>
    </div>
  );
}
