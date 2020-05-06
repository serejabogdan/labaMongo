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

function getLabs(group) {
  const XHR = request(`../php/gets.php?group=${group}`);
  XHR.onload = () => {
    const result = JSON.parse(
      XHR.response
    );
    printResult(groupResult, result);
  };
}

function getLectures(teacher, discipline) {
    const XHR = request(`../php/gets.php?teacher=${teacher}&discipline=${discipline}`);
    XHR.onload = () => {
      const result = JSON.parse(
        XHR.response
      );
      printResult(lectureResult, result);
  };
}

function getAuditoriums() {
    const XHR = request(`../php/gets.php?auditorium=1`);
    XHR.onload = () => {
      let result = JSON.parse(
        XHR.response
      );
      result = result.map(auditorium => ({auditorium: auditorium}));
      printResult(auditoriumsResult, result);
  };
}

function printResult(print, result) {
    print.innerHTML = ``;
    console.log(result)
    if(result.length !== 0) {
        for(let obj of result) {
            print.innerHTML += `{<br/>`;
                for(let key in obj) {
                    if(key !== '_id')
                    print.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;<b>${key}</b>: ${obj[key]}<br/>`;
                }
            print.innerHTML += `},<br/>`;
        }
    }
    else {
        print.innerHTML += `{<br/>`;
        print.innerHTML += `}`;
    }
}