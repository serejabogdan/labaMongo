function validationNumber(input) {
    input.value = input.value.replace(/[а-яА-Я]/,'');
}

function validationChar(input) {
    input.value = input.value.replace(/[0-9а-яА-Я]/,'');
}

function submitValidation(auditorium, discipline, groupsInput, teachersInput) {
    if(!auditorium.value.length || !discipline.value.length) {
        showMessage('warning');
        return true;
    }
    console.log('submited');
    return false;
}

function messagesInit() {
    messages.forEach(({message}) => message.style.display = 'none');
}
messagesInit();

function showMessage(elementName) {
    messages.forEach(({message}) => message.style.display = 'none');
    
    messages.filter(({name}) => name === elementName)
            .forEach(({message}) => message.style.display = 'block');
}