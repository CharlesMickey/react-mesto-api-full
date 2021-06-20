import React from "react";
import Card from "./Card.js";
import Pen from "../images/Pen.svg";
import Avatar from "../images/Avatar.jpg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onEditPlace,
  onCardClick,
  cards,
  onCardLike,
  setCardDelete,
  onDeleteCardPopupOpen,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-block">
          <img
            className="profile__avatar"
            src={currentUser.avatar || Avatar}
            alt="Фотография профиля"
          />
          <img
            onClick={onEditAvatar}
            className="profile__avatar-edit"
            src={Pen}
            alt="Значек редактирования"
          />
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button"
          ></button>
          <p className="profile__interests">{currentUser.about}</p>
        </div>
        <button
          onClick={onEditPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardElement) => (
            <Card
              onDeleteCardPopupOpen={onDeleteCardPopupOpen}
              setCardDelete={setCardDelete}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              card={cardElement}
              key={cardElement._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
