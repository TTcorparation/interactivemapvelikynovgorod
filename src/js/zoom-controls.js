// Модуль управления масштабом карты
let currentScale = 1;
const MIN_SCALE = 1; // Устанавливаем минимальный масштаб равным 1 (оригинальному размеру)
const MAX_SCALE = 3;
const SCALE_STEP = 0.2;

// Функция для инициализации элементов управления масштабом
function initZoomControls() {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', zoomIn);
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', zoomOut);
    }
    
    // Добавляем обработчик колеса мыши для масштабирования
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        mapContainer.addEventListener('wheel', handleWheelZoom, { passive: false });
    }
    
    console.log('Элементы управления масштабом инициализированы');
}

// Функция для увеличения масштаба
function zoomIn() {
    if (currentScale < MAX_SCALE) {
        currentScale += SCALE_STEP;
        updateMapScale();
        console.log(`Увеличение масштаба: ${currentScale.toFixed(2)}`);
    } else {
        console.log('Достигнут максимальный масштаб');
    }
}

// Функция для уменьшения масштаба
function zoomOut() {
    if (currentScale > MIN_SCALE) {
        currentScale -= SCALE_STEP;
        updateMapScale();
        console.log(`Уменьшение масштаба: ${currentScale.toFixed(2)}`);
    } else {
        console.log('Достигнут минимальный масштаб (оригинальный размер)');
    }
}

// Функция для установки определенного масштаба
function setScale(scale) {
    currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    updateMapScale();
    console.log(`Установлен масштаб: ${currentScale.toFixed(2)}`);
}

// Функция для обновления отображения с учетом масштаба
function updateMapScale() {
    const novgorodMap = document.getElementById('novgorod-map');
    if (novgorodMap) {
        novgorodMap.style.transform = `scale(${currentScale})`;
        novgorodMap.style.transformOrigin = 'center center';
    }
    
    // Обновляем кликабельные области с учетом масштаба
    if (typeof updateClickableAreas !== 'undefined') {
        updateClickableAreas(currentScale);
    }
}

// Обработчик события колеса мыши для масштабирования
function handleWheelZoom(event) {
    event.preventDefault();
    
    // Определяем направление прокрутки
    if (event.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}

// Функция для получения текущего масштаба
function getCurrentScale() {
    return currentScale;
}

// Функция для сброса масштаба до значения по умолчанию
function resetScale() {
    currentScale = 1;
    updateMapScale();
    console.log('Масштаб сброшен до значения по умолчанию');
}