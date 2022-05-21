import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.popupName} ${props.isOpen ? 'popup_opened' : ''}` }>
      <div className="popup__container popup__container_handle-form">
        <p className="popup__title">{props.title}</p>
        <form name={props.popupName} className="popup__form" noValidate>
          {props.children}
        </form>
        <button className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
