// Вспомогательные функции
// Функция для загрузки JSON данных
function loadJSON(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(`Ошибка загрузки JSON из ${url}:`, error);
            throw error;
        });
}

// Функция для задержки (аналог setTimeout в виде промиса)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для получения случайного элемента из массива
function getRandomItem(array) {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

// Функция для форматирования чисел с разделением разрядов
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// Функция для проверки, находится ли точка внутри прямоугольника
function isPointInRect(x, y, rectX, rectY, width, height) {
    return x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height;
}

// Функция для получения расстояния между двумя точками
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Функция для нормализации угла в диапазон [0, 2*PI]
function normalizeAngle(angle) {
    while (angle < 0) angle += 2 * Math.PI;
    while (angle >= 2 * Math.PI) angle -= 2 * Math.PI;
    return angle;
}

// Функция для генерации UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Функция для глубокого копирования объекта
function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepCopy(item));
    if (typeof obj === "object") {
        const copiedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                copiedObj[key] = deepCopy(obj[key]);
            }
        }
        return copiedObj;
    }
}

// Функция для проверки, является ли объект пустым
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Функция для получения URL параметров
function getUrlParams() {
    const params = {};
    const search = window.location.search.substring(1);
    const pairs = search.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
}

// Функция для добавления параметров к URL
function addUrlParam(url, key, value) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

// Функция для проверки поддержки Web API
function isAPISupported(apiName) {
    return typeof window[apiName] !== 'undefined';
}

// Функция для получения размеров элемента
function getElementSize(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
    };
}

// Функция для проверки, виден ли элемент на экране
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для плавной прокрутки к элементу
function smoothScrollTo(element, duration = 500) {
    const targetY = element.getBoundingClientRect().top + window.pageYOffset - 100;
    const startingY = window.pageYOffset;
    const diff = targetY - startingY;
    let start;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        window.scrollTo(0, startingY + diff * percent);
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    });
}