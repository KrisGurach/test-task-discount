'use client';

import { useState } from "react";

export default function PopupCardContainer({ name, price }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {/* <p>{name}</p> */}
      <label>
        <span className="">{name}</span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className=""
        />
        <span className="" />
      </label>
      <p>{price}</p>
    </>
  );
}
