// Функция создания карточки
function createCard(data, deleteCardHandler, likeCardHandler, openImageHandler, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Устанавливаем значения
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCount.textContent = data.likes.length;

  // Проверка начального состояния лайка
  const isLiked = data.likes.some(user => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Добавляем обработчик для кнопки лайка
  likeButton.addEventListener('click', (evt) => {
    likeCardHandler(evt, data._id);
  })

  // Добавляем обработчик для кнопки удаления
  if (data.owner._id === currentUserId) {
    deleteButton.addEventListener('click', (evt) => {
      deleteCardHandler(evt, data._id);
    });
  } else {
    deleteButton.remove();
  }

  // Добавляем обработчик для открытия окна
  cardImage.addEventListener('click', () => openImageHandler(data));

  return cardElement;
}

export { createCard };