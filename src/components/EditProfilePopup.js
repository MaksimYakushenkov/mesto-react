import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm
      popupName="profile-popup"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <input type="text" className="popup__input" id="name" minLength="2" maxLength="40" placeholder="Имя" value={ name || ''} onChange={handleNameChange} required/>
        <span className="name-error popup__error"></span>
        <input type="text" className="popup__input" id="about" minLength="2" maxLength="200" placeholder="Профессиональная деятельность" value={description || ''} onChange={handleDescriptionChange} required/>
        <span className="about-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
