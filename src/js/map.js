// Модуль обработки интерактивной карты
let mapContainer, novgorodMap, mapOverlay;
let offsetX = 0, offsetY = 0;
let isDragging = false;
let startX, startY;
let initialOffsetX, initialOffsetY;

function initMap() {
    mapContainer = document.getElementById('map-container');
    novgorodMap = document.getElementById('novgorod-map');
    mapOverlay = document.getElementById('map-overlay');
    
    // Устанавливаем начальные стили для масштабирования
    novgorodMap.style.transformOrigin = 'center center';
    
    // Создаем кликабельные области на карте
    createClickableAreas();
    
    // Инициализируем элементы управления масштабом
    if (typeof initZoomControls === 'function') {
        initZoomControls();
    } else {
        // Резервный вариант - добавляем обработчики масштабирования
        addZoomControls();
    }
    
    // Добавляем обработчики для перетаскивания карты
    addDragControls();
    
    console.log('Модуль карты инициализирован');
}

function createClickableAreas() {
    if (!window.mapData) {
        console.error('Данные о карте не загружены');
        return;
    }

    // Очищаем предыдущие области
    mapOverlay.innerHTML = '';

    // Создаем области для зданий
    window.mapData.buildings.forEach(building => {
        const area = document.createElement('div');
        area.className = 'clickable-area pulse';
        area.id = `area-${building.id}`;

        // Устанавливаем позицию и размеры в процентах от размера карты
        area.style.left = `${building.coordinates.x}%`;
        area.style.top = `${building.coordinates.y}%`;
        area.style.width = `${building.coordinates.width}%`;
        area.style.height = `${building.coordinates.height}%`;

        // Добавляем обработчик клика
        area.addEventListener('click', () => handleAreaClick(building));

        // Добавляем подсказку при наведении
        area.addEventListener('mouseenter', (event) => {
            // Останавливаем пульсацию при наведении
            area.classList.remove('pulse');
            showBuildingTooltip(building, area);
        });
        area.addEventListener('mouseleave', (event) => {
            // Возобновляем пульсацию при уходе курсора
            area.classList.add('pulse');
            hideTooltip(event);
        });

        mapOverlay.appendChild(area);
    });

    // Создаем области для информационных точек
    window.mapData.infoPoints.forEach(point => {
        const area = document.createElement('div');
        area.className = 'clickable-area pulse';
        area.id = `area-${point.id}`;

        // Устанавливаем позицию и размеры в процентах от размера карты
        area.style.left = `${point.coordinates.x}%`;
        area.style.top = `${point.coordinates.y}%`;
        area.style.width = `${point.coordinates.width}%`;
        area.style.height = `${point.coordinates.height}%`;

        // Добавляем обработчик клика
        area.addEventListener('click', () => handleInfoPointClick(point));

        // Добавляем подсказку при наведении
        area.addEventListener('mouseenter', (event) => {
            // Останавливаем пульсацию при наведении
            area.classList.remove('pulse');
            showInfoTooltip(point, area);
        });
        area.addEventListener('mouseleave', (event) => {
            // Возобновляем пульсацию при уходе курсора
            area.classList.add('pulse');
            hideTooltip(event);
        });

        mapOverlay.appendChild(area);
    });
}

function handleAreaClick(building) {
    console.log(`Клик на здание: ${building.name}`);
    
    // Анимация при клике на здание
    animateClickOnBuilding(building);
    
    // Получаем расширенную информацию о здании из менеджера данных
    const buildingInfo = typeof dataManager !== 'undefined' ? dataManager.getBuildingInfo(building.id) : null;
    
    // Отображаем информацию о здании
    document.getElementById('location-title').textContent = building.name;
    
    // Используем расширенное описание, если оно доступно
    const description = buildingInfo ? buildingInfo.historicalContext : building.description;
    document.getElementById('location-description').textContent = description;
    
    // Показываем панель информации
    document.getElementById('info-panel').classList.remove('hidden');
    
    // Добавляем кнопки для выбора действия
    const panel = document.getElementById('info-panel');
    let actionButtons = document.getElementById('building-action-buttons');
    
    if (!actionButtons) {
        actionButtons = document.createElement('div');
        actionButtons.id = 'building-action-buttons';
        actionButtons.style.marginTop = '10px';
        actionButtons.style.display = 'flex';
        actionButtons.style.gap = '10px';
        
        const enterBtn = document.createElement('button');
        enterBtn.textContent = 'Зайти внутрь';
        enterBtn.addEventListener('click', () => {
            enterBuilding(building.id);
            document.getElementById('info-panel').classList.add('hidden');
        });
        
        const infoBtn = document.createElement('button');
        infoBtn.textContent = 'Подробнее';
        infoBtn.addEventListener('click', () => {
            // Дополнительная информация уже отображается
            // Можно расширить эту функцию для показа более подробной информации
            showDetailedInfo(building.id);
        });
        
        actionButtons.appendChild(enterBtn);
        actionButtons.appendChild(infoBtn);
        panel.appendChild(actionButtons);
    } else {
        // Если кнопки уже существуют, просто обновляем обработчики
        actionButtons.querySelector('button:first-child').onclick = () => {
            enterBuilding(building.id);
            document.getElementById('info-panel').classList.add('hidden');
        };
    }
    
    // Активируем голосового ассистента для этого здания
    if (typeof activateVoiceAssistant === 'function') {
        activateVoiceAssistant(building.name, description);
    }
}

// Функция анимации при клике на здание
function animateClickOnBuilding(building) {
    // Находим кликабельную область
    const areaElement = document.getElementById(`area-${building.id}`);
    
    if (areaElement) {
        // Добавляем класс анимации клика
        areaElement.classList.add('clicked-animation');
        
        // Через некоторое время убираем класс анимации
        setTimeout(() => {
            areaElement.classList.remove('clicked-animation');
        }, 500);
    }
}

// Функция для показа подробной информации о здании
function showDetailedInfo(buildingId) {
    const buildingInfo = typeof dataManager !== 'undefined' ? dataManager.getBuildingInfo(buildingId) : null;
    
    if (buildingInfo) {
        let detailedInfo = `
            <h3>Подробная информация о ${buildingInfo.name}</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 15px;">
                <div style="flex: 1; min-width: 300px; padding: 10px; background: rgba(255, 255, 255, 0.3); border-radius: 5px;">
                    <h4>Исторический контекст</h4>
                    <p>${buildingInfo.historicalContext}</p>
                </div>
                <div style="flex: 1; min-width: 300px; padding: 10px; background: rgba(25, 255, 255, 0.3); border-radius: 5px;">
                    <h4>Архитектурные особенности</h4>
                    <p>${buildingInfo.architecturalFeatures}</p>
                </div>
                <div style="flex: 1; min-width: 300px; padding: 10px; background: rgba(255, 255, 255, 0.3); border-radius: 5px;">
                    <h4>Социальная функция</h4>
                    <p>${buildingInfo.socialFunction}</p>
                </div>
            </div>
        `;
        
        // Добавляем информацию о персонажах и деятельности
        if (typeof buildingNavigation !== 'undefined') {
            const buildingView = buildingNavigation.buildingViews[buildingId];
            if (buildingView) {
                detailedInfo += `<div style="margin-top: 15px;"><h4>Персонажи:</h4><ul style="text-align: left;">`;
                buildingView.characters.forEach(char => {
                    detailedInfo += `<li><strong>${char.name}</strong> - ${char.description} (Роль: ${char.role})</li>`;
                });
                detailedInfo += `</ul></div>`;
                
                detailedInfo += `<div style="margin-top: 15px;"><h4>Деятельность:</h4><ul style="text-align: left;">`;
                buildingView.activities.forEach(activity => {
                    detailedInfo += `<li>${activity}</li>`;
                });
                detailedInfo += `</ul></div>`;
            }
        }
        
        document.getElementById('location-description').innerHTML = detailedInfo;
    }
}

function handleInfoPointClick(point) {
    console.log(`Клик на информационную точку: ${point.name}`);
    
    // Анимация при клике на информационную точку
    animateClickOnInfoPoint(point);
    
    // Получаем расширенную информацию о точке из менеджера данных
    const pointInfo = typeof dataManager !== 'undefined' ? dataManager.getBuildingInfo(point.id) : null;
    
    // Отображаем информацию о точке
    document.getElementById('location-title').textContent = point.name;
    
    // Используем расширенное описание, если оно доступно
    const description = pointInfo ? pointInfo.historicalContext : point.description;
    document.getElementById('location-description').textContent = description;
    
    // Показываем панель информации
    document.getElementById('info-panel').classList.remove('hidden');
    
    // Для информационных точек не показываем кнопки входа в здание
    // Добавляем только кнопку "Подробнее" если нужно
    const panel = document.getElementById('info-panel');
    let actionButtons = document.getElementById('building-action-buttons');
    
    if (actionButtons) {
        // Если кнопки уже существуют (например, от предыдущего здания), удаляем их
        actionButtons.remove();
    }
    
    // Активируем голосового ассистента для этой точки
    if (typeof activateVoiceAssistant === 'function') {
        activateVoiceAssistant(point.name, description);
    }
}

// Функция анимации при клике на информационную точку
function animateClickOnInfoPoint(point) {
    // Находим кликабельную область
    const areaElement = document.getElementById(`area-${point.id}`);
    
    if (areaElement) {
        // Добавляем класс анимации клика
        areaElement.classList.add('clicked-animation');
        
        // Через некоторое время убираем класс анимации
        setTimeout(() => {
            areaElement.classList.remove('clicked-animation');
        }, 500);
    }
}

function showBuildingTooltip(building, element) {
    // Создаем всплывающую подсказку
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = building.name;
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${parseInt(element.style.left) + parseInt(element.style.width)}%`;
    tooltip.style.top = `${parseInt(element.style.top)}%`;
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.zIndex = '1000';
    tooltip.style.fontSize = '12px';
    tooltip.style.whiteSpace = 'nowrap';
    
    mapOverlay.appendChild(tooltip);
    
    // Сохраняем ссылку на подсказку
    element.tooltip = tooltip;
}

function showInfoTooltip(point, element) {
    // Создаем всплывающую подсказку
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = point.name;
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${parseInt(element.style.left) + parseInt(element.style.width)}%`;
    tooltip.style.top = `${parseInt(element.style.top)}%`;
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.zIndex = '1000';
    tooltip.style.fontSize = '12px';
    tooltip.style.whiteSpace = 'nowrap';
    
    mapOverlay.appendChild(tooltip);
    
    // Сохраняем ссылку на подсказку
    element.tooltip = tooltip;
}

function hideTooltip(event) {
    const element = event.currentTarget;
    if (element.tooltip) {
        element.tooltip.remove();
        element.tooltip = null;
    }
}


function addDragControls() {
    novgorodMap.addEventListener('mousedown', function(event) {
        isDragging = true;
        startX = event.clientX - offsetX;
        startY = event.clientY - offsetY;
        initialOffsetX = offsetX;
        initialOffsetY = offsetY;
        
        // Меняем курсор
        novgorodMap.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        
        // Ограничиваем смещение, чтобы карта не уходила слишком далеко
        const scale = typeof getCurrentScale === 'function' ? getCurrentScale() : 1;
        
        // Вычисляем размеры масштабированной карты
        const originalWidth = novgorodMap.naturalWidth || novgorodMap.width;
        const originalHeight = novgorodMap.naturalHeight || novgorodMap.height;
        const scaledWidth = originalWidth * scale;
        const scaledHeight = originalHeight * scale;
        
        // Вычисляем границы смещения
        const maxOffsetX = scaledWidth > mapContainer.clientWidth ?
            scaledWidth / 2 - mapContainer.clientWidth / 2 : 0;
        const minOffsetX = scaledWidth > mapContainer.clientWidth ?
            -scaledWidth / 2 + mapContainer.clientWidth / 2 : 0;
        const maxOffsetY = scaledHeight > mapContainer.clientHeight ?
            scaledHeight / 2 - mapContainer.clientHeight / 2 : 0;
        const minOffsetY = scaledHeight > mapContainer.clientHeight ?
            -scaledHeight / 2 + mapContainer.clientHeight / 2 : 0;
        
        offsetX = Math.max(minOffsetX, Math.min(maxOffsetX, offsetX));
        offsetY = Math.max(minOffsetY, Math.min(maxOffsetY, offsetY));
        
        updateMapTransform();
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        novgorodMap.style.cursor = 'grab';
    });
}

// Функция для обновления трансформации карты с учетом смещения
function updateMapTransform() {
    const scale = typeof getCurrentScale === 'function' ? getCurrentScale() : 1;
    novgorodMap.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
}

// Функция для пересчета координат при масштабировании
function convertCoordinates(x, y) {
    const scale = typeof getCurrentScale === 'function' ? getCurrentScale() : 1;
    return {
        x: x / scale,
        y: y / scale
    };
}