"use client";

import Image from "next/image";
import star from "../images/Star.png";

import phrases from "../helpers/phrases";
import { useEffect, useMemo, useState } from "react";

export default function CardContainer({
  index,
  name,
  price,
  noDiscountPrice,
  isPopular,
  isDiscountVisible,
  isLast,
  isActive,
  onSelect,
}) {
  const discount = useMemo(() => {
    return Math.round((((noDiscountPrice - price) / noDiscountPrice) * 100) / 10) * 10;
  }, [noDiscountPrice, price]);

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 360 && width <= 767) {
        setCurrentPhrase("Всегда быть в форме ⭐️");
      } else {
        setCurrentPhrase(phrases[3]);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [phrases, isLast]);

  return (
    <button
      onClick={onSelect}
      type="button"
      className={`w-[187px] h-[261px] sm:w-[335px] sm:h-[140px] relative border-2 border-[var(--color-accent-grey)] rounded-[20px] bg-[var(--background)] transition-all duration-200 hover:bg-[var(--color-bg-card)] hover:border-[var(--color-card)] 
        ${
          isLast
            ? "flex flex-row w-[585px] max-h-[125px] sm:max-h-[140px] w-[100%] mt-7 sm:mt-0"
            : ""
        }
        ${
          isActive ? "bg-[var(--color-bg-card)] border-[var(--color-card)]" : ""
        }`}
    >
      <h2
        className={`pl-[31px] sm:pt-0 sm:absolute sm:top-[36px] text-3xl sm:text-2xl leading-8 font-[family-name:var(--font-neue-cyr)] text-start uppercase
        ${
          isLast
            ? "pt-[45px] text-[var(--color-main-text)]"
            : "pt-[25px] text-[var(--color-text)]"
        }`}
      >
        {name}
      </h2>

      <div className={`flex ${isLast ? "flex-row" : "flex-col items-center"}`}>
        <div className={isLast ? "ml-5 mr-[55px]" : ""}>
          <div
            className={`m-0 p-0 pt-[21px] text-[var(--color-main-text)] text-[50px] sm:text-[44px] leading-13 font-[family-name:var(--font-root-bold)] transition-transform duration-1000
            sm:absolute sm:top-[15px] sm:left-[148px]
            ${
              isDiscountVisible
                ? "transform scale-0 rotate-[720deg] h-0"
                : "h-[75px] scale-100 rotate-0"
            }`}
          >
            {/* Подправила отступы у цены без скидки, сверху стало больше пространства и вырвавнивание по правому краю с ценой по скидке */}
            {isPopular && (
              <p
                className={`text-2xl sm:text-xl text-[var(--color-grey)] leading-7 font-[family-name:var(--font-root-medium)] line-through transition-transform duration-1000
                absolute top-[80px] right-[0px] sm:top-[72px] sm:right-[5px] 
                ${
                  isDiscountVisible
                    ? "transform scale-0 rotate-[720deg] h-0"
                    : "scale-100 rotate-0"
                }`}
              >
                {noDiscountPrice}₽
              </p>
            )}
            {price}₽
          </div>

          {!isPopular && (
            <p
              className={`m-0 p-0 h-[75px] text-[var(--color-main-text)] text-[50px] sm:text-[44px] leading-13 font-[family-name:var(--font-root-bold)]
                sm:absolute sm:top-9 sm:left-[148px]`}
            >
              {noDiscountPrice}₽
            </p>
          )}
        </div>

        <p
          className={`max-w-[161px] pt-[25px] text-[var(--color-add-text)] text-center text-base sm:text-sm leading-5 font-[family-name:var(--font-root-medium)]
            sm:absolute sm:top-[70px] sm:left-2 sm:pt-0 sm:pl-5 sm:max-w-[124px] sm:text-start
            ${isLast ? "pt-[37px] text-start" : "mt-[18px]"}`}
        >
          {isLast ? currentPhrase : phrases[index]}
        </p>
      </div>

      {isPopular && (
        <div className="absolute top-[-29px] sm:top-[4px] right-[4px] sm:top-[9px] w-[70px] sm:w-[50px] h-[70px] sm:h-[50px] flex items-center justify-center">
          <Image
            src={star}
            alt="предоставляется скидка"
            objectFit="cover"
            className="absolute"
          />
          <p className="relative text-lg sm:text-[13px] text-white leading-6 font-[family-name:var(--font-root-medium)] z-10">
            {`-${discount} %`}
          </p>
        </div>
      )}
    </button>
  );
}
