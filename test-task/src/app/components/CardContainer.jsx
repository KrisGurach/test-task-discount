import Image from "next/image";
import star from "../images/Star.png";

import phrases from "../helpers/phrases";

export default function CardContainer({
  index,
  name,
  price,
  noDiscountPrice,
  isPopular,
  width,
  row,
  margin
}) {
  return (
    <div
      className={`relative border-2 border-[var(--color-accent-grey)] rounded-[20px] bg-[var(--background)] w-[187px] h-[261px] transition-all duration-200 hover:bg-[var(--color-bg-card)] hover:border-[var(--color-card)] ${width}`}
    >
      <h2 className="pl-[31px] pt-[45px] text-[var(--color-text)] text-3xl leading-8 font-[family-name:var(--font-neue-cyr)] uppercase">
        {name}
      </h2>

      <div className={`flex ${row}`}>
        <div className={margin}>
          <p className="m-0 p-0 pt-[21px] h-[75px] text-[var(--color-main-text)] text-[50px] leading-13 font-[family-name:var(--font-root-bold)]">
            {isPopular ? price : noDiscountPrice}₽
          </p>

          {isPopular && (
            <p className="pl-[57px] text-2xl text-[var(--color-grey)] leading-7 font-[family-name:var(--font-root-medium)] line-through">
              {noDiscountPrice}₽
            </p>
          )}
        </div>

        <p className="max-w-[161px] pt-[25px] text-[var(--color-add-text)] text-center text-base leading-5 font-[family-name:var(--font-root-medium)]">
          {phrases[index]}
        </p>
      </div>

      {isPopular && (
        <div className="absolute top-[-29px] right-[4px] w-[70px] h-[70px] flex items-center justify-center">
          <Image
            src={star}
            alt="предоставляется скидка"
            objectFit="cover"
            className="absolute"
          />
          <p className="relative text-lg text-white leading-6 font-[family-name:var(--font-root-medium)] z-10">
            {`-${Math.trunc(
              ((noDiscountPrice - price) / noDiscountPrice) * 100
            )} %`}
          </p>
        </div>
      )}
    </div>
  );
}
