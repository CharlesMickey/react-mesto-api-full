import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeletePlacePopup({ onClose, isOpen, isLoading, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      buttonSubmitName="Да"
      buttonSubmitNameDel="Удаление..."
      name="delete-form"
      title="Вы уверены?"
      className="popup popup_delete-form"
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
