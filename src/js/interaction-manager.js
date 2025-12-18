// Модуль системы взаимодействия
function initInteractionManager() {
    // Инициализация системы взаимодействия
    setupEventHandlers();
    setupKeyboardControls();

    console.log('Модуль взаимодействия инициализирован');
}

function setupEventHandlers() {
    // Обработчик для закрытия информационной панели
    document.getElementById('close-info').addEventListener('click', function() {
        document.getElementById('info-panel').classList.add('hidden');
    });

    // Обработчики для кнопок голосового ассистента
    document.getElementById('start-voice-excursion').addEventListener('click', function() {
        if (typeof startVoiceExcursion === 'function') {
            startVoiceExcursion();
        }
    });

    document.getElementById('stop-voice-excursion').addEventListener('click', function() {
        if (typeof stopVoiceExcursion === 'function') {
            stopVoiceExcursion();
        }
    });
}

// Настройка клавиатурных сокращений
function setupKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        // Закрытие информационной панели при нажатии ESC
        if (event.key === 'Escape') {
            document.getElementById('info-panel').classList.add('hidden');

            // Если мы внутри здания, выйти из него
            if (typeof buildingNavigation !== 'undefined' && buildingNavigation.isInsideBuilding()) {
                buildingNavigation.returnToMap();
            }
        }

        // Навигация по зданиям с помощью клавиш
        if (event.key === 'b' || event.key === 'B') {
            // При нажатии B можно показать список доступных зданий
            // Эта функция может быть расширена в дальнейшем
        }
    });
}

// Функция для анимации при наведении на элемент
function animateOnHover(element) {
    element.style.transform = 'scale(1.05)';
    element.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.8)';
}

// Функция для сброса анимации при уходе курсора
function resetHoverAnimation(element) {
    element.style.transform = 'scale(1)';
    element.style.boxShadow = 'inset 0 0 10px rgba(52, 152, 219, 0.5)';
}