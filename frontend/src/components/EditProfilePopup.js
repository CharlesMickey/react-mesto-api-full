import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ onClose, isOpen, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [stateInput, setStateInput] = React.useState({});

  React.useEffect(() => {
    const { name, about } = currentUser;
    setStateInput({ name, about });
  }, [currentUser, isOpen]);

  function handleChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setStateInput({ ...stateInput, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: stateInput.name,
      about: stateInput.about,
    });
  }

  return (
    <PopupWithForm
      isLoading={isLoading}
      buttonSubmitName="Обновить"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name="profile-popup"
      title="Редактировать профиль"
    >
        <label className="popup__field">
          <input
            type="text"
            name="name"
            id="user__name"
            placeholder="Имя"
            className="popup__input"
            minLength={2}
            maxLength={40}
            value={stateInput.name || ""}
            onChange={handleChangeInput}
            required
          />
          <span className="popup__input-error" id="user__name-error"></span>
        </label>
        <label className="popup-field">
          <input
            type="text"
            name="about"
            id="about"
            placeholder="О себе"
            className="popup__input"
            minLength="2"
            maxLength="200"
            value={stateInput.about || ""}
            onChange={handleChangeInput}
            required
          />
          <span className="popup__input-error" id="about-error"></span>
        </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
