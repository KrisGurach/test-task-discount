"use client";

import { useEffect, useState } from "react";
import styles from "../animation.module.css";

export default function Timer({ onTimerEnd }) {
  const initialTime = 120;

  const minuteForms = ["минута", "минуты", "минут"];
  const secondForms = ["секунда", "секунды", "секунд"];

  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTime = sessionStorage.getItem("timeLeft");
      return savedTime ? Number(savedTime) : initialTime;
    }
    return initialTime;
  });

  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (typeof window !== "undefined") { 
          sessionStorage.setItem("timeLeft", newTime);
        };
        return newTime;
      });

      if (timeLeft <= 31) {
        setIsFlashing(true);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFlashing(false);
    }
  }, [timeLeft]);

  const getDeclension = (value, forms) => {
    if (value % 10 === 1 && value % 100 !== 11) {
      return forms[0];
    }
    if (
      value % 10 >= 2 &&
      value % 10 <= 4 &&
      (value % 100 < 10 || value % 100 >= 20)
    ) {
      return forms[1];
    }
    return forms[2];
  };

  // Добавлена функция для отображения в формате 00:00
  const formatTime = (value) => {
    return String(value).padStart(2, '0');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center sm:py-[10px]">
      <p className="mr-[15px] sm:mr-[10px] py-5 sm:py-2 text-[var(--color-main-text)] text-3xl sm:text-base leading-10 font-[family-name:var(--font-root-bold)]">
        Скидка действует:
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className={`text-[var(--color-card)] text-6xl sm:text-[40px] leading-15 font-[family-name:var(--font-neue)] ${isFlashing ? styles.flashing : ""}`}>
          {formatTime(minutes)}
        </p>
        <p className="text-[var(--color-grey-text)] text-base sm:text-sm leading-5 font-[family-name:var(--font-root-bold)]">
          {getDeclension(minutes, minuteForms)}{" "}
        </p>
      </div>
      <span className={`mx-3 sm:mx-1 pb-2 text-[var(--color-card)] text-3xl sm:text-xl font-[family-name:var(--font-root-bold)] opacity-50 ${isFlashing ? styles.flashing : ""}`}>:</span>
      <div className="flex flex-col items-center justify-center">
        <p className={`text-[var(--color-card)] text-6xl sm:text-[40px] leading-15 font-[family-name:var(--font-neue)] ${isFlashing ? styles.flashing : ""}`}>
          {formatTime(seconds)}
        </p>
        <p className="text-[var(--color-grey-text)] text-base sm:text-sm leading-5 font-[family-name:var(--font-root-bold)]">
          {getDeclension(seconds, secondForms)}
        </p>
      </div>
    </div>
  );
}
