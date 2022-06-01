import React from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {

  //Необходимые для рбаоты приложение стейты
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]  = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]  = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]  = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  //Эффект создания списка карточек через API
  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data.map((item) => (item)));
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  //Эффект получения инфо о пользователе
  React.useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  //Функция добавления карточки
  function handleAddPlaceSubmit(addPlaceValues) {
    api.setNewCard(addPlaceValues)
    .then(data => {
      setCards([data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция лайка карточки
  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((likedCard) => likedCard._id === card._id ? newCard : likedCard));
    });
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    api.deleteUserCard(card._id)
    .then((
      setCards((cards) => {
        return cards.filter(item => {return item._id !== card._id})
      })
    ));
  }

  //Функция обновления данных о пользователе
  function handleUpdateUser(values) {
    api.setNewUserInfo(values)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция обновление аватара пользователя
  function handleUpdateAvatar(value) {
    api.setNewUserAvatar(value)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Обработчики попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  //Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  //Передаем выбранную карточку в попап с картинкой
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          {<Header />}

          {<Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />}
          
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />


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
    </CurrentUserContext.Provider>
  );
}

export default App;
