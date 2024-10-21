"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Timer from "./components/CountdownTimer";
import CardContainer from "./components/CardContainer";

import image from "./images/img.png";

import mainApi from "./helpers/api";
import phrases from "./helpers/phrases";
import discounts from "./helpers/discounts";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mainApi.getList();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isPopupOpened) {
      setFilteredData(data.filter(x => x.isDiscount));
      return;
    }

    if (isTimerExpired) {
      setFilteredData(data.filter(x => !x.isPopular && !x.isDiscount));
      return;
    }

    setFilteredData(data.filter(x => x.isPopular));

  }, [data, isTimerExpired, isPopupOpened]);

  const handleTimerEnd = () => {
    setIsTimerExpired(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <header>
        <Timer onTimerEnd={handleTimerEnd} />
      </header>
      <main>
        <h1>Выберите подходящий тарифный план</h1>
        <div className="flex gap-[79px]">
          <div className="w-[434px] h-[715px] relative">
            <Image
              src={image}
              alt="Background Image"
              className="w-[434px] h-[715px]"
              objectFit="cover"
            />
          </div>

          <div className="max-w-[585px]">
            <div>
            {filteredData.map((x, index) => (
              <CardContainer
                key={index}
                name={x.name}
                price={x.price}
                isPopular={x.isPopular}
                phrase={phrases[index % phrases.length]}
                discount={discounts[index % discounts.length]}
              />
            ))}
            </div>
            <p>
              Следуя плану на 3 месяца, люди получают в 2 раза лучший результат,
              чем за 1 месяц
            </p>
            <div>
              {/* Сохранять статус в сессионсторадж */}
              <input
                type="checkbox"
                id="agreement"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="agreement">
                Я соглашаюсь с{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Правилами сервиса
                </a>{" "}
                и условиями
                <a href="/offer" target="_blank" rel="noopener noreferrer">
                  {" "}
                  Публичной оферты
                </a>
                .
              </label>
            </div>
            <button type="button">Купить</button>
            <p>
              Нажимая «Купить», Пользователь соглашается на автоматическое
              списание денежных средств по истечению купленного периода.
              Дальнейшие списания по тарифам участвующим в акции осуществляются
              по полной стоимости согласно оферте.
            </p>
          </div>
        </div>
      </main>
      {/* Здесь будет попап по истечению таймера отдельным компонентом */}
    </>
  );
}
