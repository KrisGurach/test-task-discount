"use client";

import { useEffect, useRef } from "react";
import PopupCardContainer from "./PopupCardContainer";

export default function Popup({ isOpen, onClose, data }) {
  const popup = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popup.current && !popup.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      console.log(data)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="" ref={popup} data-testid="popup">
          <div className="">
            <p>Горячая скидка</p>
            <p>Не упусти свой последний шанс</p>
            <p>Мы знаем, как трудно начать.. Поэтому!</p>
            <p>Дарим скидку для лёгкого старта 🏃‍♂️</p>
            <p>Посмотри, что мы для тебя приготовили 🔥</p>
            {data.map((x, index) => (
              <PopupCardContainer key={index} name={x.name} price={x.price} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
