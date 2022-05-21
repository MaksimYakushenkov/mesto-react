import React from 'react';

function Card(card) {
  function handleClick() {
    card.onCardClick(card);
  }

  return (
    <article className="elements__item card" onClick={handleClick}>
      <img className="card__image" alt={card.title} src={card.link}/>
      <div className="card__bottom">
        <p className="card__title">{card.title}</p>
        <div className="card__like-block">
          <button className="card__like"></button>
          <p className="card__likes-num">{card.likes}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
