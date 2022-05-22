import React, { Fragment } from 'react';
import avatarEditButton from '../images/avatar_edit-button.svg';
import progileAddButton from '../images/profile__add-button.svg';
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
      
      {/* Для атрибута key использован id каждой карточки, взятой из ответа запроса API (функция-сетер setCards). Затем здесь мы используем деструктуризацию (берем  id из массива карточек, заданных заранее, и напрямую задаем каждой карточке свой id и передаем другие пропсы). */}
      <div className="elements">
        {cards.map(({ id, ...card }) => (<Card key={id} {...card} onCardClick={props.handleCardClick}/>))}
      </div>       
    </main>
  );
}

export default Main;