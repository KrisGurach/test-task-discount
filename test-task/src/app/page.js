"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import Timer from "./components/CountdownTimer";
import CardContainer from "./components/CardContainer";
import Popup from "./components/Popup";

import image from "./images/img.png";

import mainApi from "./helpers/api";

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
    let updatedData;

    if (isPopupOpened) {
      updatedData = data.filter((x) => x.isDiscount);
    } else if (isTimerExpired) {
      updatedData = data.filter((x) => !x.isPopular && !x.isDiscount);
    } else {
      updatedData = data.filter((x) => x.isPopular);
    }

    const noDiscountData = updatedData.map((d) => {
      const noDiscountItem = data.find(
        (x) => x.name === d.name && !x.isPopular && !x.isDiscount
      );
      return {
        ...d,
        noDiscountPrice: noDiscountItem ? noDiscountItem.price : null,
      };
    });

    setFilteredData(noDiscountData);
  }, [data, isTimerExpired, isPopupOpened]);

  useEffect(() => {
    setTimeout(() => {
      setIsPopupOpened(isTimerExpired);
    }, 5000);
  }, [isTimerExpired]);

  const togglePopup = useCallback(() => {
    setIsPopupOpened((prev) => !prev);
  }, [isPopupOpened]);

  const handleTimerEnd = () => {
    setIsTimerExpired(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    sessionStorage.setItem("isChecked", !isChecked);
  };

  useEffect(() => {
    const savedCheckboxState = sessionStorage.getItem("isChecked");
    if (savedCheckboxState !== null) {
      setIsChecked(JSON.parse(savedCheckboxState));
    }
  }, []);

  return (
    <>
      <header>
        <Timer onTimerEnd={handleTimerEnd} />
      </header>
      <main className="flex flex-col items-center bg-[var(--background-main)]">
        <h1 className="pt-[27px] pb-[98px] text-[var(--color-main-text)] text-5xl font-bold leading-11 uppercase tracking-1-percent">
          Выберите подходящий тарифный план
        </h1>

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
            <div className="flex flex-wrap gap-3">
              {filteredData.map((x, index) => (
                <CardContainer
                  key={index}
                  index={index}
                  name={x.name}
                  price={x.price}
                  noDiscountPrice={x.noDiscountPrice}
                  isPopular={x.isPopular}
                  className={index === 3 ? 'flex flex-row w-[585px] h-[125px] w-[100%] mt-7' : ''}
                  classNameRow={index === 3 ? 'flex-row' : 'flex-col items-center'}
                />
              ))}
            </div>
            
            <p className="pt-3 pb-[26px] text-[var(--color-main-text)] text-lg font-medium leading-6">
              Следуя плану на 3 месяца, люди получают в 2 раза лучший результат,
              чем за 1 месяц
            </p>

            <div class="mb-[50px] py-[6px] max-w-[454px] flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                class="w-[30px] h-6 text-[var(--color-card)] border-[var(--color-main-text)] rounded-[5px] pointer"
              />
              <label
                className="pl-3 text-[var(--color-grey-text)] text-base font-normal leading-4"
                htmlFor="agreement"
              >
                Я соглашаюсь с{" "}
                <a className="text-[var(--color-blue)]" href="/terms" target="_blank" rel="noopener noreferrer">
                  Правилами сервиса
                </a>{" "}
                и условиями
                <a className="text-[var(--color-blue)]" href="/offer" target="_blank" rel="noopener noreferrer">
                  {" "}
                  Публичной оферты
                </a>
                .
              </label>
            </div>

            <button 
              className="mb-[50px] w-[281px] h-[76px] bg-[var(--color-orange)] rounded-[60px] text-[var(--background)] text-xl font-medium leading-5 uppercase" 
              type="button">
                Купить
            </button>

            <p className="pb-[107px] text-[var(--color-grey-text)] text-sm font-normal leading-5">
              Нажимая «Купить», Пользователь соглашается на автоматическое
              списание денежных средств по истечению купленного периода.
              Дальнейшие списания по тарифам участвующим в акции осуществляются
              по полной стоимости согласно оферте.
            </p>
          </div>
        </div>
      </main>
      
      {isPopupOpened && (
        <Popup
          isOpen={isPopupOpened}
          onClose={togglePopup}
          data={filteredData}
        />
      )}
    </>
  );
}
