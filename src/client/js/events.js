// присвоение события click кнопкам табов
tabElements.forEach( 
    ( {buttonTab, blockTab} ) => buttonTab.addEventListener('click',
    () => activeButton(buttonTab, blockTab))
);

groupSelect.addEventListener('change', () => getLabs(groupSelect.value));
getLecturesBtn.addEventListener('click', () => getLectures(teacherSelect.value, thingSelect.value));
getAditoriumsBtn.addEventListener('click', () => getAuditoriums());