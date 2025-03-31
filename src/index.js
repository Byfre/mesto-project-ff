import './pages/index.css';

import { openModal, closeModal } from "./scripts/components/modal.js";
import { createCard, removeCard, likeButtonToggler } from "./scripts/components/card.js";
import { enableValidation, clearValidation } from './scripts/components/validation.js';
import { getUserInfo, getCards, updateUserInfo, addNewCard, deleteCardApi, likeCardApi, unlikeCardApi, updateAvatar } from './scripts/components/api.js';


// DOM узлы
const placesList = document.querySelector('.places__list');
// Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Все Кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');
//Модальные окна 
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const avatarModal = document.querySelector('.popup_type_avatar');
// Формы и их поля
const editFormElement = editModal.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editModal.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const addFormElement = addModal.querySelector('.popup__form');
const placeNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const placeLinkInput = addFormElement.querySelector('.popup__input_type_url');

const avatarForm = avatarModal.querySelector('.popup__form');
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');
const profileAvatar = document.querySelector('.profile__image');

const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');

// 1. Функции, взаимодействующие с сервером

// Отправка формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  updateUserInfo(nameInput.value, descriptionInput.value)
    .then((userData) => {
      // Обновляем данные из ответа сервера
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editModal);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}// Вешаем обработчик
editFormElement.addEventListener('submit', handleEditFormSubmit);

// Отправка формы добавления картинки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  addNewCard(placeName, placeLink)
    .then(cardData => {
      const newCardElement = createCard(cardData, deleteCard, likeCard, openImage, cardData.owner._id);
      placesList.prepend(newCardElement);
      closeModal(addModal);
      // Очистка формы
      addFormElement.reset();
      // Очищаем ошибки валидации
      clearValidation(addFormElement, validationConfig);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}
// Вешаем обработчик
addFormElement.addEventListener('submit', handleAddFormSubmit);

// Обработчик отправки формы Аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  updateAvatar(avatarUrlInput.value)
    .then(userData => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

// Постановка и снятие лайка
function likeCard(evt, cardId) {
  const cardElement = evt.currentTarget.closest('.card')
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCardApi(cardId)
      .then(updatedCard => {
        // Обновляем данные из ответа сервера
        likeCount.textContent = updatedCard.likes.length;
        likeButtonToggler(likeButton);
      })
      .catch(error => {
        console.log(error);
      })
  }
  else {
    likeCardApi(cardId)
      .then(updatedCard => {
        // Обновляем данные из ответа сервера
        likeCount.textContent = updatedCard.likes.length;
        likeButtonToggler(likeButton);
      })
      .catch(error => {
        console.log(error);
      })
  }
}

// Функция удаления карточки
function deleteCard(evt, cardId) {
  const cardElement = evt.currentTarget.closest('.card')

  deleteCardApi(cardId)
    .then(() => {
      removeCard(cardElement);
    })
    .catch(error => {
      console.log(error);
    });
}

// 2. Открытие и Закрытие модальных окон

// Обработчики событий для открытия модальных окон
editButton.addEventListener('click', () => {
  // Подставляем в форму значения из профиля
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  // Очищаем ошибки валидации
  clearValidation(editFormElement, validationConfig);
  // Открываем окно 
  openModal(editModal);
});

addButton.addEventListener('click', () => {
  // Открываем окно 
  openModal(addModal);
});

profileAvatar.addEventListener('click', () => {
  // Очищаем ошибки валидации
  clearValidation(avatarForm, validationConfig);
  // Открываем окно 
  openModal(avatarModal);
});

// Функция открытия изображения
function openImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(imageModal);
}

// Обработчики событий для закрытия модальных окон
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
});

// 3. Карточки и профиль

// Функция для отрисовки профиля
const renderUserProfile = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
};

// Функция для отрисовки карточек
function renderCards(cards, currentUserId) {
  cards.forEach(card => {
    const cardElement = createCard(card, deleteCard, likeCard, openImage, currentUserId);
    placesList.appendChild(cardElement); // Добавляем карточку в список
  });
}

//  Загрузка информации о пользователе и карточках. Отрисовка в случае, если получены
//  и те и другие данные.
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    renderUserProfile(userData);
    renderCards(cards, userData._id);
  })
  .catch((error) => {
    console.log(error);
  })

// 4. Валидация

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationConfig);

