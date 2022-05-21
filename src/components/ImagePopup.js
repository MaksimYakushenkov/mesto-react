import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_image image-popup ${props.card.title ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__image" src={props.card.link}/>
        <p className="popup__subtitle">{props.card.title}</p>
        <button className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
