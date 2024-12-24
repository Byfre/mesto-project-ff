// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Устанавливаем значения
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Добавляем обработчик для кнопки удаления
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function renderCards() {
  initialCards.forEach(card => {
    const cardElement = createCard(card); // Создаем карточку
    placesList.appendChild(cardElement); // Добавляем карточку в список
  });
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

renderCards(initialCards)



