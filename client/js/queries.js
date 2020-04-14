// функция-щаблон для формирования запроса
function request(
  url,
  typeRequest = "get",
  body = null
) {
  const XHR = new XMLHttpRequest();
  XHR.open(typeRequest, url);
  XHR.send(body);
  return XHR;
}

function getGroups() {
  const XHR = request('../php/gets/groups.php');
  XHR.onload = () => {
    let result = XHR.response;
    
    selectTitles.innerHTML = `<option selected disabled>Выберите группу</option>`;
    selectTitles.innerHTML += result;
    groupsInput.innerHTML += result;
  };
}
function getAuditoriums() {
  const XHR = request('../php/gets/teachers.php');
  XHR.onload = () => {
    let result = XHR.responseXML;
    selectTeachers.innerHTML = `<option selected disabled>Выберите преподавателя</option>`;
    for(let node of result.children[0].children) {
      const htmlRow = `<option>${node.textContent}</option>`;
      selectTeachers.innerHTML += htmlRow;
      teachersInput.innerHTML += htmlRow;
    }
  };
}
function getTeachers() {
  const XHR = request('../php/gets/auditoriums.php');
  XHR.onload = () => {
    let result = JSON.parse(
      XHR.response
    );
    selectAuditoriums.innerHTML = `<option selected disabled>Выберите аудиторию</option>`;
    result.forEach(item => selectAuditoriums.innerHTML += `<option>${item.auditorium}</option>`);
  };
}
getGroups();
getAuditoriums();
getTeachers();

function getLesson({ select, queryParam }) {
  const url = `../php/gets/lesson.php?${queryParam}=${select.value}`;
  const XHR = request(url); // вызов GET запроса
  XHR.onload = () => { // onload callback
    let result = JSON.parse(
      XHR.response
    );

    clearHtmlElement(table);
    createRow(result[0], "th");

    for (let obj of result) {
      createRow(obj, "td");
    }
  };
  
  // вызов функции сброса селектов
  clearOtherSelects(select, [
    selectTitles,
    selectTeachers,
    selectAuditoriums,
  ]);
}

// создание строки в таблице
function createRow(obj, typeCell) {
  const tr = document.createElement( "tr" );
  for (let propertyName in obj) {
    const cell = document.createElement( typeCell );

    if (typeCell === "th")
      cell.innerHTML = propertyName;
    else
      cell.innerHTML =
        obj[propertyName];

    tr.append(cell);
  }
  table.append(tr);
}

// очистка html элемента
function clearHtmlElement(element) {
  element.innerHTML = "";
}
function clearHtmlElementsAll(elements) {
  elements.forEach(element => element.innerHTML = '');
}

// функция сброса селектов
function clearOtherSelects(
  select,
  allSelects
) {
  allSelects.forEach((item) => {
    if (item !== select)
      item.selectedIndex = 0;
  });
}
