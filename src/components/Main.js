import React from 'react';
import avatarEditButton from '../images/avatar_edit-button.svg';
import progileAddButton from '../images/profile__add-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <div className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
          <div className="profile__avatar-edit" onClick={(() => {props.onEditAvatar(true)})}><img src={avatarEditButton} alt=""/></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button">
          <img src={progileAddButton} alt="Добавить картинку" className="profile__button-image" onClick={props.onAddPlace}/>
        </button>
      </div>
      
      {/* Для атрибута key использован id каждой карточки, взятой из ответа запроса API (функция-сетер setCards). Затем здесь мы используем деструктуризацию (берем  id из массива карточек, заданных заранее, и напрямую задаем каждой карточке свой id и передаем другие пропсы). */}
      <div className="elements">
        {props.cards.map((card) => (<Card key={card._id} {...card} onCardClick={props.handleCardClick} handleCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>))}
      </div>       
    </main>
  );
}

export default Main;