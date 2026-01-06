import { useState } from "react";
import { MyntraCarouselPropsType, SliderProps } from "../types/types";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

/* ---------------- SLIDER ---------------- */
export const Slider = ({
  images,
  objectFit = "cover",
  showNav = true,
  onClick,
}: SliderProps) => {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="slider" onClick={onClick}>
      <img src={images[index]} alt="slider" style={{ objectFit }} />

      {showNav && (
        <>
          <button
            className="slider-btn left"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
            }}
          >
            <FaArrowLeftLong />
          </button>

          <button
            className="slider-btn right"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
            }}
          >
            <FaArrowRightLong />
          </button>
        </>
      )}
    </div>
  );
};

/* ---------------- MYNTRA CAROUSEL ---------------- */
export const MyntraCarousel = ({
  images,
  setIsOpen,
  PrevButton,
  NextButton,
}: MyntraCarouselPropsType) => {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="carousel-overlay" onClick={() => setIsOpen(false)}>
      <div className="carousel" onClick={(e) => e.stopPropagation()}>
        <img src={images[index]} alt="carousel" />

        <PrevButton
          onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
        />

        <NextButton
          onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
        />
      </div>
    </div>
  );
};
