//Функция создания карточки
function createCard(data, deleteCardHandler, likeCardHandler, openImageHandler) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Устанавливаем значения
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Добавляем обработчик для кнопки удаления
  deleteButton.addEventListener('click', deleteCardHandler);

  // Добавляем обработчик для кнопки лайка
  likeButton.addEventListener('click', likeCardHandler);

  // Добавляем обработчик для открытия окна
  cardImage.addEventListener('click', () => openImageHandler(data));

  return cardElement;
}

// Функция лайка
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

export { createCard, likeCard, deleteCard };