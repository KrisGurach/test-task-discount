import Image from "next/image";
import star from "../images/Star.png";

export default function CardContainer({
  name,
  price,
  phrase,
  discount,
  isPopular,
}) {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="">{name}</h2>
      <p className="">{price}</p>
      <p className="">{phrase}</p>

      {isPopular && (
        <div className="relative flex items-center justify-center">
          <Image
            src={star}
            alt="предоставляется скидка"
            objectFit="cover"
            className="absolute"
          />
          <p className="relative text-white z-10">{discount}</p>
        </div>
      )}
    </div>
  );
}
