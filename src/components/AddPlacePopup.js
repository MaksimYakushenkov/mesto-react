import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [namePlace, setNamePlace] = React.useState('');
  const [linkPlace, setLinkPlace] = React.useState('');

  function handlePlaceNameChange(e) {
    setNamePlace(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setLinkPlace(e.target.value);
  }
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      namePlace,
      linkPlace,
    });
  }

  // После закрытия попапа очищаем поля
  React.useEffect(() => {
    setNamePlace('');
    setLinkPlace('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      popupName="place-popup"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <input type="text" className="popup__input" id="namePlace" minLength="2" maxLength="30" placeholder="Название" value={namePlace} onChange={handlePlaceNameChange} required/>
        <span className="namePlace-error popup__error"></span>
        <input type="url" className="popup__input" id="linkImage" placeholder="Ссылка на картинку" value={linkPlace} onChange={handlePlaceLinkChange} required/>
        <span className="linkImage-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;