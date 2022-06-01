import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__trash ${isOwn ? 'card__trash_visible' : 'card__trash_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_active' : ''}`
  );

  //Обработчики событий карточки
  function handleClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.handleCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card);
  }

  return (
    <article className="elements__item card">
      <img className="card__image" alt={card.name} src={card.link}  onClick={handleClick}/>
      <div className="card__bottom">
        <p className="card__title">{card.name}</p>
        <div className="card__like-block">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__likes-num">{card.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    </article>
  );
}

export default Card;
