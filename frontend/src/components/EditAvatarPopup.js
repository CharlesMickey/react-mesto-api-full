import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isLoading={isLoading}
      buttonSubmitName="Обновить"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name="avatar-form"
      title="Обновить аватар"
    >
        <label className="popup__field">
          <input
            ref={avatarRef}
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            id="linkAvatar"
            className="popup__input"
            required
          />
          <span className="popup__input-error" id="linkAvatar-error"></span>
        </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
