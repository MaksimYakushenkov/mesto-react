import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  // Подписка на контекст
  const inputRef = React.useRef(null);

  // После закрытия попапа очищаем поле
  React.useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
        popupName="avatar-popup"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          <input ref={inputRef} type="url" className="popup__input" id="linkAvatarImage" placeholder="Ссылка на картинку" required/>
          <span className="linkAvatarImage-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;