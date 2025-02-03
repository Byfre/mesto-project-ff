import './pages/index.css';
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/components/modal.js";
import { createCard, likeCard, deleteCard } from "./scripts/components/card.js";



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
// Формы и их поля
const editFormElement = editModal.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

const addFormElement = addModal.querySelector('.popup__form');
const placeNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const placeLinkInput = addFormElement.querySelector('.popup__input_type_url');

// Отправка формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closeModal(editModal);
}
// Вешаем обработчик
editFormElement.addEventListener('submit', handleEditFormSubmit);


// Отправка формы добавления картинки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const newCardData = {
    name: placeName,
    link: placeLink
  };
  // Создаем новую карточку и добавляем её в начало контейнера
  const newCardElement = createCard(newCardData, deleteCard, likeCard, openImage);
  placesList.prepend(newCardElement);
  closeModal(addModal);
  // Очистка формы
  addFormElement.reset();
}
// Вешаем обработчик
addFormElement.addEventListener('submit', handleAddFormSubmit);


// Обработчики событий для открытия модальных окон
editButton.addEventListener('click', () => {
  // Подставляем в форму значения из профиля
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const nameInput = editModal.querySelector('.popup__input_type_name');
  const descriptionInput = editModal.querySelector('.popup__input_type_description');

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  openModal(editModal);
});

addButton.addEventListener('click', () => {
  openModal(addModal);
});

// Обработчики событий для закрытия модальных окон
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
});

// Функция открытия изображения
function openImage(data) {
  const imageModal = document.querySelector('.popup_type_image');
  const popupImage = imageModal.querySelector('.popup__image');
  const popupCaption = imageModal.querySelector('.popup__caption');

  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(imageModal);
}

// Фунция отрисовки карточек
function renderCards() {
  initialCards.forEach(card => {
    const cardElement = createCard(card, deleteCard, likeCard, openImage); // Создаем карточку
    placesList.appendChild(cardElement); // Добавляем карточку в список
  });
}

// Вывести карточки на страницу
renderCards(initialCards)