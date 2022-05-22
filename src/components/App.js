import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]  = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]  = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]  = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  return (
    <div className="App">
      <div className="page">
        {<Header />}

        {<Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
        />}

        {<PopupWithForm
      popupName="profile-popup"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}>
        <input type="text" className="popup__input" id="name" minLength="2" maxLength="40" placeholder="Имя" required/>
        <span className="name-error popup__error"></span>
        <input type="text" className="popup__input" id="about" minLength="2" maxLength="200" placeholder="Профессиональная деятельность" required/>
        <span className="about-error popup__error"></span>
      </PopupWithForm>}

      {<PopupWithForm
      popupName="place-popup"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}>
        <input type="text" className="popup__input" id="namePlace" minLength="2" maxLength="30" placeholder="Название" required/>
        <span className="namePlace-error popup__error"></span>
        <input type="url" className="popup__input" id="linkImage" placeholder="Ссылка на картинку" required/>
        <span className="linkImage-error popup__error"></span>
      </PopupWithForm>}

      {<PopupWithForm
      popupName="avatar-popup"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}>
        <input type="url" className="popup__input" id="linkAvatarImage" placeholder="Ссылка на картинку" required/>
        <span className="linkAvatarImage-error popup__error"></span>
      </PopupWithForm>}

      {<PopupWithForm
        popupName="delete-popup"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={false}
        onClose={closeAllPopups}>
          <button className="popup__button popup__confirm-delete">Да</button>
      </PopupWithForm>}

      {<ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />}

      {<Footer />}
      </div>
    </div>
  );
}

export default App;
