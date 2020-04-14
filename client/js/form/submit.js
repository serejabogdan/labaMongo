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
    XHR.onload = () => lessonOnload(XHR);
}

function lessonOnload(XHR) {
    if (XHR.readyState === 4 && XHR.status === 200) {
        groupTeacherQuery(groupsInput, '../php/posts/group.php');
        const groupTeacherXHR = groupTeacherQuery(teachersInput,  '../php/posts/teacher.php');
        groupTeacherXHR.onload = () => groupAndTeacherOnload(groupTeacherXHR);

        console.log('lessonOnload');
    }
    else
        showMessage('error');
}

function groupAndTeacherOnload(groupTeacherXHR) {
    if (groupTeacherXHR.readyState === 4 && groupTeacherXHR.status === 200) {
        getTitlesForSelects(); // init query
        showMessage('success');
        console.log('groupAndTeacherOnload');
    }
    else
    showMessage('error');
}

function groupTeacherQuery(input, url) {
    const body = JSON.stringify({
        keyValue: input.value
    });

    const XHR = request(url, 'POST', body);
    return XHR;
}