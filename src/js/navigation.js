// Модуль системы навигации
function initNavigation() {
    // Обработчики для кнопок навигации
    document.getElementById('start-excursion').addEventListener('click', startExcursion);
    document.getElementById('free-navigation').addEventListener('click', freeNavigation);
    document.getElementById('info-panel-btn').addEventListener('click', toggleInfoPanel);
    document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
    document.getElementById('help').addEventListener('click', showHelp);
    
    console.log('Модуль навигации инициализирован');
}

function startExcursion() {
    console.log('Начало экскурсии');
    // Показываем голосовую панель
    document.getElementById('voice-panel').classList.remove('hidden');
    
    // Если есть активный голосовой ассистент, начинаем экскурсию
    if (typeof startVoiceExcursion === 'function') {
        startVoiceExcursion();
    }
}

function freeNavigation() {
    console.log('Свободная навигация');
    // В этой функции можно реализовать особую навигацию при свободном исследовании
    if (typeof stopVoiceExcursion === 'function') {
        stopVoiceExcursion();
    }
    
    // Скрываем голосовую панель
    document.getElementById('voice-panel').classList.add('hidden');
}

function toggleInfoPanel() {
    const panel = document.getElementById('info-panel');
    panel.classList.toggle('hidden');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen()
                .then(() => {
                    console.log('Полноэкранный режим включен');
                })
                .catch(err => {
                    console.error(`Ошибка полноэкранного режима: ${err.message}`);
                });
        } else if (element.mozRequestFullScreen) { /* Firefox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE/Edge */
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
                .then(() => {
                    console.log('Полноэкранный режим выключен');
                });
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

function showHelp() {
    const helpText = `
        <h3>Инструкция по использованию приложения</h3>
        <ul>
            <li><strong>Клик по зданиям:</strong> Нажмите на любое здание на карте, чтобы увидеть информацию о нем и получить возможность зайти внутрь</li>
            <li><strong>Масштабирование:</strong> Используйте кнопки (+/-) или колесо мыши для приближения/удаления карты</li>
            <li><strong>Перемещение по карте:</strong> Перетаскивайте карту мышью для перемещения по ней</li>
            <li><strong>Вход в здания:</strong> Нажмите "Зайти внутрь" в информационной панели, чтобы перейти во внутреннее представление здания</li>
            <li><strong>Голосовая экскурсия:</strong> Нажмите "Начать экскурсию", чтобы включить голосовое сопровождение</li>
            <li><strong>Свободная навигация:</strong> Нажмите "Свободная навигация", чтобы отключить автоматическое сопровождение</li>
            <li><strong>Информация:</strong> Нажмите кнопку "Информация" для просмотра описания текущего места</li>
        </ul>
        <p>Внутри зданий вы можете ознакомиться с историческим описанием, узнать о деятельности, происходящей внутри, и познакомиться с персонажами, которые там живут или работают.</p>
    `;
    
    // Создаем модальное окно с инструкцией
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const content = document.createElement('div');
    content.style.backgroundColor = '#f0e6d2';
    content.style.padding = '20px';
    content.style.borderRadius = '10px';
    content.style.maxWidth = '600px';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';
    content.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    
    content.innerHTML = helpText;
    
    // Добавляем кнопку закрытия
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Закрыть';
    closeBtn.style.display = 'block';
    closeBtn.style.margin = '10px auto 0';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.backgroundColor = '#3498db';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.cursor = 'pointer';
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Функция для плавного перехода к определенной точке на карте
function navigateTo(x, y) {
    // В реальной реализации здесь будет анимация перемещения к указанной точке
    console.log(`Переход к координатам: ${x}, ${y}`);
}

// Функция для установки маркера на карте
function setMarker(x, y, title) {
    // В реальной реализации здесь будет создание визуального маркера
    console.log(`Установка маркера: ${title} на координатах ${x}, ${y}`);
}