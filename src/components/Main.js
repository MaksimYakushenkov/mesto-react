import React, { Fragment } from 'react';
import avatarEditButton from '../images/avatar_edit-button.svg';
import progileAddButton from '../images/profile__add-button.svg';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data.map((item) => ({
        id: item._id,
        link: item.link,
        title: item.name,
        likes: item.likes.length
      })));
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <main>
      <div className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} >
          <div className="profile__avatar-edit" onClick={(() => {props.onEditAvatar(true)})}><img src={avatarEditButton} alt=""/></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__about">{userDescription}</p>
          <button className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button">
          <img src={progileAddButton} alt="Добавить картинку" className="profile__button-image" onClick={props.onAddPlace}/>
        </button>
      </div>
        
      <div className="elements">
        {cards.map(({ id, ...card }) => <Card key={id} {...card} onCardClick={props.handleCardClick}/>)}
      </div>

      {<PopupWithForm
      popupName="profile-popup"
      title="Редактировать профиль"
      isOpen={props.isEditProfilePopupOpen}
      onClose={props.closeAllPopups}
      children={
        <Fragment>
          <input type="text" className="popup__input" id="name" minLength="2" maxLength="40" placeholder="Имя" required/>
          <span className="name-error popup__error"></span>
          <input type="text" className="popup__input" id="about" minLength="2" maxLength="200" placeholder="Профессиональная деятельность" required/>
          <span className="about-error popup__error"></span>
          <button type="submit" className="popup__button">Сохранить</button>
        </Fragment>
      }/>}

      {<PopupWithForm
      popupName="place-popup"
      title="Новое место"
      isOpen={props.isAddPlacePopupOpen}
      onClose={props.closeAllPopups}
      children={
        <Fragment>
          <input type="text" className="popup__input" id="namePlace" minLength="2" maxLength="30" placeholder="Название" required/>
          <span className="namePlace-error popup__error"></span>
          <input type="url" className="popup__input" id="linkImage" placeholder="Ссылка на картинку" required/>
          <span className="linkImage-error popup__error"></span>
          <button type="submit" className="popup__button">Сохранить</button>
        </Fragment>
      }/>}

      {<PopupWithForm
      popupName="avatar-popup"
      title="Обновить аватар"
      isOpen={props.isEditAvatarPopupOpen}
      onClose={props.closeAllPopups}
      children={
        <Fragment>
          <input type="url" className="popup__input" id="linkAvatarImage" placeholder="Ссылка на картинку" required/>
          <span className="linkAvatarImage-error popup__error"></span>
          <button type="submit" className="popup__button">Сохранить</button>
        </Fragment>
      }/>}

      {<PopupWithForm
      popupName="delete-popup"
      title="Вы уверены?"
      isOpen={false}
      onClose={props.closeAllPopups}
      children={
        <Fragment>
          <button className="popup__button popup__confirm-delete">Да</button>
        </Fragment>
      }/>}

      {<ImagePopup 
      card={props.selectedCard}
      onClose={props.closeAllPopups}
      />}
        
    </main>
  );
}

export default Main;