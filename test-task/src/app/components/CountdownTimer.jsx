"use client";

import { useEffect, useState } from "react";

export default function Timer({ onTimerEnd }) {
  const initialTime = 120;

  const minuteForms = ["минута", "минуты", "минут"];
  const secondForms = ["секунда", "секунды", "секунд"];

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
    <div>
      <p>
        Скидка действует: {minutes} {getDeclension(minutes, minuteForms)} {" "}
        {seconds} {getDeclension(seconds, secondForms)}
      </p>
    </div>
  );
}
