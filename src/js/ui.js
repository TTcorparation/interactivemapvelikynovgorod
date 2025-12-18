// Модуль пользовательского интерфейса
function initUI() {
    // Инициализация UI компонентов
    setupUIEventHandlers();
    setupResponsiveDesign();
    
    console.log('Модуль пользовательского интерфейса инициализирован');
}

function setupUIEventHandlers() {
    // Обработчики для UI элементов уже установлены в других модулях
    // Здесь можно добавить дополнительные UI-специфичные обработчики
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleWindowResize);
    
    // Обработчик для полноэкранного режима
    document.addEventListener('fullscreenchange', handleFullscreenChange);
}

function setupResponsiveDesign() {
    // Настройка адаптивного дизайна
    const checkScreenSize = () => {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Мобильная версия - возможно, нужно изменить расположение панелей
            console.log('Активирован мобильный режим');
        } else {
            // Десктопная версия
            console.log('Активирован десктопный режим');
        }
    };
    
    // Проверяем размер экрана при загрузке
    checkScreenSize();
    
    // И при изменении размера
    window.addEventListener('resize', checkScreenSize);
}

function handleWindowResize() {
    // Обработка изменения размера окна
    console.log('Размер окна изменен');
    
    // Возможно, нужно пересчитать позиции элементов
    adjustElementPositions();
}

function adjustElementPositions() {
    // Пересчет позиций UI элементов при изменении размера окна
    const container = document.getElementById('map-container');
    const navPanel = document.querySelector('.navigation-panel');
    const controlPanel = document.querySelector('.control-panel');
    
    // Убедимся, что панели остаются на своих местах
    if (navPanel) {
        navPanel.style.bottom = '20px';
        navPanel.style.left = '20px';
    }
    
    if (controlPanel) {
        controlPanel.style.bottom = '20px';
        controlPanel.style.right = '20px';
    }
}

function handleFullscreenChange() {
    if (document.fullscreenElement) {
        console.log('Полноэкранный режим включен');
        // Можно скрыть некоторые UI элементы в полноэкранном режиме
        hideNonEssentialUI();
    } else {
        console.log('Полноэкранный режим выключен');
        // Показываем все UI элементы
        showAllUI();
    }
}

function hideNonEssentialUI() {
    // Скрываем несущественные UI элементы в полноэкранном режиме
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'none';
    }
}

function showAllUI() {
    // Показываем все UI элементы
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'block';
    }
}

// Функция для отображения уведомлений пользователю
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message; // Используем innerHTML вместо textContent, чтобы поддерживать HTML
    
    // Стили для уведомления
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 15px',
        borderRadius: '5px',
        color: 'white',
        zIndex: '10000',
        maxWidth: '300px',
        wordWrap: 'break-word',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
    });
    
    // Устанавливаем цвет фона в зависимости от типа
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#2ecc71';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f39c12';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // Добавляем в DOM
    document.body.appendChild(notification);
    
    // Автоматически удаляем через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Функция для показа загрузки
function showLoadingIndicator() {
    // Создаем индикатор загрузки
    const loader = document.createElement('div');
    loader.id = 'loading-indicator';
    loader.innerHTML = 'Загрузка...';
    
    Object.assign(loader.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '5px',
        zIndex: '1000'
    });
    
    document.body.appendChild(loader);
}

// Функция для скрытия загрузки
function hideLoadingIndicator() {
    const loader = document.getElementById('loading-indicator');
    if (loader) {
        loader.remove();
    }
}