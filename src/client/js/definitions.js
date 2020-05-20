// функция шаблон получения html элемента
const $ = (tag) =>
  document.querySelector(tag);
const $all = (tag) =>
  document.querySelectorAll(tag);

// buttons
let buttonsMode = $all('.btn-mode');

// blocks
let dataTabs = $all('.data-tab');

// массив объектов кнопок и блоков
const tabElements = getTabElements(buttonsMode, dataTabs);

// функция формирования массива объектов кнопок и блоков
function getTabElements(buttonsMode, dataTabs) {
  const tabs = [];
  for(let i = 0; i < buttonsMode.length; i++) {
    tabs.push({buttonTab: buttonsMode[i], blockTab: dataTabs[i]});
  }
  return tabs;
}
dataTabs = buttonsMode = null;

// ----next

const groupSelect = $('.group-select');
const groupResult = $('.group-result');

const thingSelect = $('.thing-select');
const teacherSelect = $('.teacher-select');
const getLecturesBtn = $('.get-lecture');
const lectureResult = $('.lecture-result');

const getAditoriumsBtn = $('.auditoriums-btn');
const auditoriumsResult = $('.auditoriums-result');

