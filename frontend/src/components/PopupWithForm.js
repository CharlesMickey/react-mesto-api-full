import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  isLoading,
  buttonSubmitName,
  buttonSubmitNameDel,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container`}>
        <button
          onClick={onClose}
          className={`popup__button-close popup__button_close_${name}`}
          type="button"
        ></button>
        <h2 className={`popup__form-name`}>{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form`}
          name={name}
          noValidate
        >
           <fieldset className="popup__set">
           {children}
           </fieldset>

          <button
            type="submit"
            value="Отправить на сервер"
            className="popup__button popup__button-submit"
          >
            {isLoading
              ? buttonSubmitNameDel || "Сохранение..."
              : buttonSubmitName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
