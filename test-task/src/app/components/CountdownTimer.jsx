"use client";

import { useEffect, useState } from "react";

export default function Timer({ onTimerEnd }) {
  const initialTime = 1;

  const minuteForms = ["минута", "минуты", "минут"];
  const secondForms = ["секунда", "секунды", "секунд"];

  // Я разместила оставшееся время таймера в sessionStorage, так как предполагаю показывать скидку при новом открытии вкладки, 
  // в зависимости от целей можно сохранять и в localStorage
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = sessionStorage.getItem("timeLeft");
    return savedTime ? Number(savedTime) : initialTime;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        sessionStorage.setItem("timeLeft", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center">
      <p className="mr-[15px] py-5 text-[var(--color-main-text)] text-3xl leading-10 font-[family-name:var(--font-root-bold)]">
        Скидка действует:
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[var(--color-card)] text-6xl leading-15 font-[family-name:var(--font-neue)]">
          {minutes}
        </p>
        <p className="text-[var(--color-grey-text)] text-base leading-5 font-[family-name:var(--font-root-bold)]">
            {getDeclension(minutes, minuteForms)}{" "}
        </p>
      </div>
      <span className="mx-3 pb-2 text-[var(--color-card)] text-3xl font-[family-name:var(--font-root-bold)] opacity-50">:</span>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[var(--color-card)] text-6xl leading-15 font-[family-name:var(--font-neue)]">
          {seconds}
        </p>
        <p className="text-[var(--color-grey-text)] text-base leading-5 font-[family-name:var(--font-root-bold)]">
            {getDeclension(seconds, secondForms)}
        </p>
      </div>
    </div>
  );
}
