// алгоритм показа нужной формы

const activeBtn = 'btn-mode btn btn-primary';
const notActiveBtn = 'btn-mode btn btn-outline-primary';

// определение и установка активной кнопки
function activeButton(item, block) {
    tabElements.forEach(( {buttonTab, blockTab} ) => {
        if(isActiveButton(buttonTab, activeBtn)) {
            buttonTab.className = notActiveBtn;
            blockTab.style.display = 'none';
        }
    });
    item.className = activeBtn;
    block.style.display = 'block';
}

// проверка - активна ли кнопка
function isActiveButton(buttonTab, activeBtn) {
    return buttonTab.className === activeBtn;
}

// инициализация табов
function initTabs() {
    tabElements.forEach(( {blockTab} ) => {
        if(!blockTab.className.includes('fetching-data'))
            blockTab.style.display = 'none';
    });
}

initTabs();