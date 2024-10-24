"use client";

import { useMemo } from "react";
import Image from "next/image";
import star from "../images/Star.png";

export default function PopupCardContainer({ name, price, noDiscountPrice, isSelected, onSelect }) {
  {/* Здесь формула считает верно, и значение скидки для 3-х месяцев не совпадает с макетом */}
  const discount = useMemo(() => {
    return Math.round((((noDiscountPrice - price) / noDiscountPrice) * 100) / 10) * 10;
  }, [noDiscountPrice, price]);

  return (
    <>
      <div className={`relative border-2 border-[var(--color-accent-grey)] rounded-[20px] bg-[var(--background)] w-[210px] h-[197px] 
        transition-all duration-200 hover:bg-[var(--color-bg-card)] hover:border-[var(--color-card)]
        ${isSelected ? "bg-[var(--color-bg-card)] border-[var(--color-card)]" : "" }`}>
        <div className="ml-[26px] mt-[26px]">
          <label htmlFor={`radio-${name}`}>
            <span className="mr-[58px] text-[var(--color-main-text)] text-[26px] leading-7 font-[family-name:var(--font-neue-cyr)] uppercase">
              {name}
            </span>
            <input
              id={`radio-${name}`}
              checked={isSelected}
              onChange={onSelect}
              type="radio"
              value={name}
              aria-label={`Выбрать тариф ${name}`}
              name="bordered-radio"
              class="w-[22px] h-[22px] text-[var(--color-card)] bg-[var(--color-radio-but)] border-[var(--color-radio-but)]"
            />
          </label>

          <p className="relative min-w-[48px] max-w-[62px] mt-3 mb-4 text-xl text-[var(--color-grey)] leading-7 font-[family-name:var(--font-root-medium)]">
            <span className="absolute left-0 w-full h-0.5 bg-[var(--color-orange)] transform -rotate-12 top-[50%]"></span>
            <span className="absolute left-0 w-full h-0.5 bg-[var(--color-orange)] transform rotate-12 top-[50%]"></span>
            {noDiscountPrice}₽
          </p>

          <hr className="border-[1px] border-[var(--color-line)] w-[134px] ml-[14px]" />

          <p className="mt-2 h-[51px] text-[var(--color-main-text)] text-[46px] leading-12 font-[family-name:var(--font-root-bold)]">
            {price}₽
          </p>

          <div className="absolute top-[115px] right-[4px] w-[50px] h-[50px] flex items-center justify-center">
            <Image
              src={star}
              alt="предоставляется скидка"
              objectFit="cover"
              className="absolute"
            />
            <p className="relative text-sm text-white leading-4 font-[family-name:var(--font-root-medium)] z-10">
              {`-${discount} %`}
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}
