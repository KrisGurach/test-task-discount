"use client";

import Image from "next/image";
import close from "../images/close.svg";
import PopupCardContainer from "./PopupCardContainer";
import { useState } from "react";

export default function Popup({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelect = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-[100%] h-[100vh] bg-[var(--color-bg)] flex items-center justify-center z-100"
        onClick={onClose}
      >
        <div
          className="w-[750px] h-[100vh] max-h-[658px] bg-white relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-5 right-5" onClick={onClose}>
            <Image src={close} alt="закрыть попап с очень выгодными скидками" className="w-6 h-6" />
          </button>

          <p className="max-w-[193px] ml-[42px] mb-[30px] px-[10px] py-[5px] bg-[var(--color-card)] text-base text-white leading-5 font-[family-name:var(--font-root-medium)] lowercase">
            Горящее предложение
          </p>
          <div className="flex flex-col items-center">
            <p className="mb-[30px] text-[var(--color-black)] text-3xl font-bold leading-10 font-[family-name:var(--font-rubik)] uppercase">
              Не упусти свой{" "}
              <span className="text-[var(--color-card)]">последний шанс</span>
            </p>
            <p className="mb-2 text-[var(--color-black)] text-2xl leading-8 font-[family-name:var(--font-root-medium)]">
              Мы знаем, как трудно начать..{" "}
              <span className="font-[family-name:var(--font-root-bold)]">
                Поэтому!
              </span>
            </p>
            <p className="mb-10 py-[14px] px-[29px] border border-[var(--color-card)] rounded-[30px] text-2xl text-[var(--color-main-text)] leading-8 font-[family-name:var(--font-root-bold)]">
              Дарим скидку для{" "}
              <span className="text-[var(--color-card)]">
                лёгкого старта 🏃‍♂️
              </span>
            </p>
          </div>
          <p className="ml-10 mb-5 text-[var(--color-black)] text-2xl leading-8 font-[family-name:var(--font-root-medium)]">
            Посмотри, что мы для тебя приготовили 🔥
          </p>

          <div className="ml-10 mb-10 flex gap-5">
            {data.map((item) => (
              <PopupCardContainer
                key={item.name}
                name={item.name}
                price={item.price}
                noDiscountPrice={item.noDiscountPrice}
                isSelected={selectedPlan === item.name}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button className="w-[310px] h-[62px] bg-[var(--color-orange)] rounded-[30px] text-[var(--background)] text-xl font-medium leading-5 font-[family-name:var(--font-rubik)]">
              Начать тренироваться
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
