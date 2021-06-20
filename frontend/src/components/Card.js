import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({
  card,
  onCardClick,
  onCardLike,
  setCardDelete,
  onDeleteCardPopupOpen,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  const cardDeleteButtonClassName = `element__trash ${
    isOwner ? "element__trash_visible" : ""
  }`;
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    setCardDelete(card);
    onDeleteCardPopupOpen();
  }
  return (
    <li className="element">
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <img
        onClick={handleCardClick}
        className="element__image element__image_popup_open"
        src={card.link}
        alt={`Фото: ${card.name}`}
      />
      <div className="element__card">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-group">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
