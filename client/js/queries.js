// функция-щаблон для формирования запроса
function request(
  url = "../php/init.php",
  typeRequest = "get",
  body = null
) {
  const XHR = new XMLHttpRequest();
  XHR.open(typeRequest, url);
  XHR.send(body);
  return XHR;
}

// получение названий групп, предметов и имен преподов
function getTitlesForSelects() {
  const XHR = request();
  XHR.onload = () => {
    let result = JSON.parse(
      XHR.response
    );
    
    clearHtmlElementsAll([selectTitles, groupsInput, selectTeachers, teachersInput, selectAuditoriums]);
    selectTitles.innerHTML = `<option selected disabled>Выберите группу</option>`;
    selectTeachers.innerHTML = `<option selected disabled>Выберите преподавателя</option>`;
    selectAuditoriums.innerHTML = `<option selected disabled>Выберите аудиторию</option>`;

    result.forEach((item) => {
      if (item.title) {
        const option = `<option>${item.title}</option>`
        selectTitles.innerHTML += option;
        groupsInput.innerHTML += option;
      }
      if (item.name) {
        const option = `<option>${item.name}</option>`
        selectTeachers.innerHTML += option;
        teachersInput.innerHTML += option;
      }
      if (item.auditorium)
        selectAuditoriums.innerHTML += `<option>${item.auditorium}</option>`;
    });
  };
}
getTitlesForSelects(); // получение названий групп, предметов и имен преподов

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
