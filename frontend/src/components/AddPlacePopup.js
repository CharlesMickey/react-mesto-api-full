import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ onClose, isOpen, onAddPlaceSubmit, isLoading }) {
  const [stateInputs, setStateInputs] = React.useState({});

  React.useEffect(() => {
    setStateInputs({});
  }, [isOpen]);

  function handleChangeInput(e) {
    const {name, value} = e.target;
    setStateInputs({...stateInputs, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlaceSubmit({
      name: stateInputs.name,
      link: stateInputs.link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonSubmitName="Создать"
      onClose={onClose}
      isOpen={isOpen}
      name="image-form"
      title="Новое место"
    >
        <label className="popup__field">
          <input
            type="text"
            placeholder="Новое место"
            name="name"
            id="name"
            className="popup__input popup__place"
            minLength="2"
            maxLength="30"
            value={stateInputs.name || ''}
            onChange={handleChangeInput}
            required
          />
          <span className="popup__input-error" id="name-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            id="link"
            className="popup__input"
            value={stateInputs.link || ''}
            onChange={handleChangeInput}
            required
          />
          <span className="popup__input-error" id="link-error"></span>
        </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
