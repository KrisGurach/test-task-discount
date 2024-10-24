"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import Timer from "./components/CountdownTimer";
import CardContainer from "./components/CardContainer";
import Popup from "./components/Popup";

import image from "./images/img.png";

import mainApi from "./helpers/api";
import styles from './animation.module.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [popupData, setPopupData] = useState([]);

  const [error, setError] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isDiscountVisible, setDiscountVisible] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);

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

  // Массив для попапа и для основной страницы разведены по разным useEffect, 
  // чтобы при открытии попапа с 3-мя элементами массив на основной странице не перестраивался с 4-х на 3 элемента
  useEffect(() => {
    const updatedData = isTimerExpired
      ? data.filter((x) => !x.isPopular && !x.isDiscount)
      : data.filter((x) => x.isPopular);
  
    const noDiscountData = getNoDiscountData(updatedData, data);
    
    setFilteredData(noDiscountData);
  }, [data, isTimerExpired]);
  
  useEffect(() => {
    if (!isPopupOpened) return;
  
    const updatedPopupData = data.filter((x) => x.isDiscount);
    const noDiscountData = getNoDiscountData(updatedPopupData, data);
    
    setPopupData(noDiscountData);
  }, [isPopupOpened, data]);

  useEffect(() => {
    const savedCheckboxState = sessionStorage.getItem("isChecked");
    if (savedCheckboxState !== null) {
      setIsChecked(JSON.parse(savedCheckboxState));
    }
  }, []);

  // Попап открывается чуть позже, чтобы пользователь посмотрел как улетает скидка и успел расстроится
  useEffect(() => {
    setTimeout(() => {
      setIsPopupOpened(isTimerExpired);
    }, 5000);
  }, [isTimerExpired]);

  const getNoDiscountData = (updatedData, data) => {
    return updatedData.map((d) => {
      const noDiscountItem = data.find(
        (x) => x.name === d.name && !x.isPopular && !x.isDiscount
      );
      return {
        ...d,
        noDiscountPrice: noDiscountItem ? noDiscountItem.price : null,
      };
    });
  };

  const togglePopup = useCallback(() => {
    setIsPopupOpened((prev) => !prev);
  }, [isPopupOpened]);

  const handleTimerEnd = () => {
    setIsTimerExpired(true);
    setDiscountVisible(true);
  };

  // Я решила, если пользователь нажал на галочку, то складывать ее состояние на период открытия страницы
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    sessionStorage.setItem("isChecked", JSON.stringify(newCheckedState));
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <header>
        <Timer onTimerEnd={handleTimerEnd} />
      </header>
      <main className="flex flex-col items-center bg-[var(--background-main)]">
        <h1 className="pt-[27px] lg:pb-[98px] md:pb-[30px] text-[var(--color-main-text)] xl:text-5xl lg:text-4xl md:text-3xl font-bold leading-11 font-[family-name:var(--font-rubik)] uppercase tracking-1-percent">
          Выберите подходящий тарифный план
        </h1>

        <div className="flex gap-[79px] lg:gap-[35px] lg:flex-row md:flex-col lg:items-start md:items-center">
          <div className="xl:w-[434px] md:w-[290px] xl:h-[715px] md:h-[477px] relative">
            <Image
              src={image}
              alt="красивый мужчина в отличной форме"
              objectFit="cover"
            />
          </div>

          <div className="max-w-[585px] lg:block md:flex md:flex-col md:items-center">
            {data ? (
              <div className="flex flex-wrap gap-3">
                {filteredData.map((item, index) => (
                  <CardContainer
                    key={index}
                    index={index}
                    name={item.name}
                    price={item.price}
                    noDiscountPrice={item.noDiscountPrice}
                    isPopular={item.isPopular}
                    isDiscountVisible={isDiscountVisible}
                    isLast={index === filteredData.length - 1}
                    isActive={selectedIndex === index}
                    onSelect={() => handleSelect(index)}
                  />
                ))}
              </div>
            ) : (
              <p className="error-message">Ошибка получения данных: {error}</p>
            )}

            <p className="pt-3 pb-[26px] text-[var(--color-main-text)] text-lg leading-6 font-[family-name:var(--font-root-medium)]">
              Следуя плану на 3 месяца, люди получают в 2 раза лучший результат,
              чем за 1 месяц
            </p>

            <div class="mb-[50px] py-[6px] max-w-[454px] flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                checked={isChecked}
                class="w-[30px] h-6 text-[var(--color-card)] border-[var(--color-main-text)] rounded-[5px] pointer"
                onClick={handleCheckboxChange}
              />
              <label
                className="pl-3 text-[var(--color-grey-text)] text-base leading-4 font-[family-name:var(--font-root-regular)]"
                htmlFor="agreement"
              >
                Я соглашаюсь с{" "}
                <a
                  className="text-[var(--color-blue)]"
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Правилами сервиса
                </a>{" "}
                и условиями
                <a
                  className="text-[var(--color-blue)]"
                  href="/offer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Публичной оферты
                </a>
                .
              </label>
            </div>

            <button
              className={`mb-[50px] w-[281px] h-[76px] bg-[var(--color-orange)] rounded-[60px] text-[var(--background)] text-xl font-medium leading-5 font-[family-name:var(--font-rubik)] uppercase ${styles.blink}`}
              type="button"
            >
              Купить
            </button>

            <p className="pb-[107px] text-[var(--color-grey-text)] text-sm font-normal leading-5 font-[family-name:var(--font-root-regular)]">
              Нажимая «Купить», Пользователь соглашается на автоматическое
              списание денежных средств по истечению купленного периода.
              Дальнейшие списания по тарифам участвующим в акции осуществляются
              по полной стоимости согласно оферте.
            </p>
          </div>
        </div>
      </main>

      {isPopupOpened && (
        <Popup isOpen={isPopupOpened} onClose={togglePopup} data={popupData} />
      )}
    </>
  );
}
