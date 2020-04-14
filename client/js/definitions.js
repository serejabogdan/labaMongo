// функция шаблон получения html элемента
const $ = (tag) =>
  document.querySelector(tag);
const $all = (tag) =>
  document.querySelectorAll(tag);

// selects
// получение селектора с ID titles
const selectTitles = $("#titles");
// получение селектора с ID teachers
const selectTeachers = $("#teachers");
// получение селектора с ID auditorium
const selectAuditoriums = $("#auditorium");

// table
// получение таблицы
const table = $("table");

// buttons
let buttonsMode = $all('.btn-mode');

// blocks
let dataTabs = $all('.data-tab');

// button submit
const submitBtn = $('.submit');

// массив объектов кнопок и блоков
const tabElements = getTabElements(buttonsMode, dataTabs);

// adding-form inputs
const postForm = $all('.post');
const groupsInput = $('#group');
const teachersInput = $('#teacher');

// adding-form messages
let messagesNodeList = $all('.list-group');
const messages = getMessages(messagesNodeList);

// функция формирования массива объектов кнопок и блоков
function getMessages(messagesNodeList) {
  const messages = [];
  for(let message of messagesNodeList) {
    messages.push({
      name: message.title,
      message
    });
  }
  return messages;
}
messagesNodeList = null;

// функция формирования массива объектов кнопок и блоков
function getTabElements(buttonsMode, dataTabs) {
  const tabs = [];
  for(let i = 0; i < buttonsMode.length; i++) {
    tabs.push({buttonTab: buttonsMode[i], blockTab: dataTabs[i]});
  }
  return tabs;
}
dataTabs = buttonsMode = null;