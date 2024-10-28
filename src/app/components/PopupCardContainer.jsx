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
      <div
        className={`relative border-2 border-[var(--color-accent-grey)] rounded-[20px] bg-[var(--background)] w-[210px] sm:w-[295px] h-[197px] sm:h-[133px] 
        transition-all duration-200 hover:bg-[var(--color-bg-card)] hover:border-[var(--color-card)]
        ${
          isSelected
            ? "bg-[var(--color-bg-card)] border-[var(--color-card)]"
            : ""
        }`}
      >
        <div className="ml-[26px] mt-[26px]">
          <label htmlFor={`radio-${name}`} className="flex items-center h-[30px]">
            <span className="mr-[58px] sm:mr-0 text-[var(--color-main-text)] text-[26px] leading-7 font-[family-name:var(--font-neue-cyr)] uppercase">
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
              className="pb-1 w-[22px] h-[22px] border-[var(--color-radio-but)] checked:text-[var(--color-card)] checked:border-[var(--color-card)] focus:border-transparent focus:ring-0 sm:absolute sm:top-6 sm:left-[255px]"
            />
          </label>

          <p
            className="relative min-w-[48px] max-w-[62px] mt-3 mb-4 text-xl text-[var(--color-grey)] leading-7 font-[family-name:var(--font-root-medium)]
            sm:absolute sm:top-[72px] sm:right-5"
          >
            <span className="absolute left-0 w-full h-0.5 bg-[var(--color-orange)] transform -rotate-12 top-[50%]"></span>
            <span className="absolute left-0 w-full h-0.5 bg-[var(--color-orange)] transform rotate-12 top-[50%]"></span>
            {noDiscountPrice}₽
          </p>

          <hr className="sm:hidden border-[1px] border-[var(--color-line)] w-[134px] ml-[14px]" />

          <div className="relative">
            <div className="relative inline-block mt-2 h-[51px] text-[var(--color-main-text)] text-[46px] leading-12 font-[family-name:var(--font-root-bold)]">
              {price}₽
              <div className="absolute -top-[10px] sm:-top-0 -right-[54px] sm:-right-[44px] w-[50px] h-[50px] sm:w-10 sm:h-10 flex items-center justify-center">
                <Image
                  src={star}
                  alt="предоставляется скидка"
                  className="absolute"
                />
                <p className="relative text-sm text-white leading-4 font-[family-name:var(--font-root-medium)] z-10">
                  {`-${discount} %`}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
