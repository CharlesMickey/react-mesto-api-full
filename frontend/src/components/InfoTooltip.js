import React from "react";
import RegOk from "../images/RegOk.svg";
import RegErr from "../images/RegErr.svg";

function InfoTooltip({ isOpen, onClose, isInfoTooltipOk }) {
  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container`}>
        <button
          onClick={onClose}
          className={`popup__button-close-tooltip`}
          type="button"
        ></button>
        <img className={`popup__img-tooltip`} src={isInfoTooltipOk ? RegOk : RegErr} />
        <h2 className={`popup__title-tooltip`}>{isInfoTooltipOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
