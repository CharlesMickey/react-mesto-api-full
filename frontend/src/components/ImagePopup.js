import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card && "popup_opened"}`} id="popup-image">
      <figure className={`${card ? "popup__container-image" : ""}`}>
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
        ></button>
        <img
          className="popup__image"
          src={`${card ? card.link : ""}`}
          alt={card ? card.name : ""}
        />
        <figcaption className="popup__image-title">{`${
          card ? card.name : ""
        }`}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
