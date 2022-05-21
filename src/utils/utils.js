const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileAvatar = profile.querySelector('.profile__avatar');
const newProfileName = document.querySelector('#name');
const newProfileAbout = document.querySelector('#about');
const profileForm = profilePopup.querySelector('.popup__form');
const placePopup = document.querySelector('.place-popup');
const addPlaceButton = profile.querySelector('.profile__add-button');
const avatarEditButton = profile.querySelector('.profile__avatar-edit');
const placeForm = placePopup.querySelector('.popup__form');
const newPlace = document.querySelector('#namePlace');
const newImage = document.querySelector('#linkImage');
const elementSection = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const popups = document.querySelectorAll('.popup');
const formValidators = {};
const cardTemplateSelector = '#card';
let userId;
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

export {editProfileButton, profilePopup, profileName, profileAbout, profileAvatar, newProfileName, newProfileAbout, profileForm, placePopup, addPlaceButton, avatarEditButton, placeForm, newPlace, newImage, elementSection, imagePopup, popups, formValidators, cardTemplateSelector, userId, config}