// событие change value (изменения значения) для селекторов
selectTitles.addEventListener("change", () => getLesson({select: selectTitles, queryParam: "titles"}));
selectTeachers.addEventListener("change", () => getLesson({select: selectTeachers, queryParam: "teachers"}));
selectAuditoriums.addEventListener("change", () => getLesson({select: selectAuditoriums, queryParam: "auditoriums"}));

// присвоение события click кнопкам табов
tabElements.forEach( 
    ( {buttonTab, blockTab} ) => buttonTab.addEventListener('click',
    () => activeButton(buttonTab, blockTab))
);

// событие change value (изменения значения) для инпутов
const [, , auditoriumInput, disciplineInput] = postForm;
auditoriumInput.addEventListener('input', () => validationNumber(auditoriumInput));
disciplineInput.addEventListener('input', () => validationChar(disciplineInput));

// submit / validation
submitBtn.addEventListener('click', () => submit(postForm, groupsInput, teachersInput));