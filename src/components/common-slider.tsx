import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface CommonSliderProps<T = unknown> {
  items: T[];
  itemsPerSlide?: number;
  renderItem: (item: T) => React.ReactNode;
  showIndicators?: boolean;
  showNavButtons?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  containerClassName?: string;
  itemClassName?: string;
}

export const CommonSlider = <T = unknown,>({
  items,
  itemsPerSlide = 6,
  renderItem,
  showIndicators = true,
  showNavButtons = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  containerClassName = "common-slider-container",
  itemClassName = "slider-item",
}: CommonSliderProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  const visibleItems = items.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide,
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalSlides]);

  return (
    <div className={containerClassName}>
      {showNavButtons && (
        <button className="slider-nav-btn prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="slider-grid"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {visibleItems.map((item, idx) => (
            <motion.div
              key={`${currentIndex}-${idx}`}
              className={itemClassName}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {showNavButtons && (
        <button className="slider-nav-btn next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      )}

      {showIndicators && (
        <div className="carousel-indicators">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <motion.button
              key={i}
              className={`indicator ${i === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(i)}
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommonSlider;
