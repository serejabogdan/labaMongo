function submit([weekDay, lessonNumber, auditorium, discipline], groupsInput, teachersInput) {
    if(submitValidation(auditorium, discipline, groupsInput, teachersInput))
        return;
    addLessonQuery(weekDay, lessonNumber, auditorium, discipline);
}

function addLessonQuery(weekDay, lessonNumber, auditorium, discipline) {
    const body = JSON.stringify({
        'week_day': weekDay.value,
        'lesson_number': lessonNumber.value,
        'auditorium': auditorium.value,
        'discipline': discipline.value
    });

    const XHR = request("../php/posts/lesson.php", 'POST', body);
    XHR.onload = () => {
        if (XHR.readyState === 4) {
            if (XHR.status === 200) {
                addLessonParam(groupsInput, '../php/posts/group.php');
                const addLessonParamXHR = addLessonParam(teachersInput,  '../php/posts/teacher.php');
                addLessonParamXHR.onload = () => {
                    if (addLessonParamXHR.readyState === 4) {
                        if (addLessonParamXHR.status === 200) {
                            getTitlesForSelects(); // init query
                            showMessage('success');
                        }
                        else
                        showMessage('error');
                    }
                    else
                    showMessage('error');
               };
            }
            else
            showMessage('error');
        }
        else
        showMessage('error');
            
    };
}

function addLessonParam(input, url) {
    const body = JSON.stringify({
        keyValue: input.value
    });

    const XHR = request(url, 'POST', body);
    return XHR;
}