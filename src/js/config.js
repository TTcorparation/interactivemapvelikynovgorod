// Конфигурационный файл приложения
const CONFIG = {
    // Основные настройки
    appName: "Виртуальное Путешествие в Средневековый Новгород",
    version: "1.0.0",
    language: "ru",
    
    // Настройки карты
    map: {
        imagePath: "Новгород.png",
        defaultScale: 1,
        minScale: 0.5,
        maxScale: 3,
        scaleStep: 0.2
    },
    
    // Настройки интерфейса
    ui: {
        animationDuration: 300, // в миллисекундах
        tooltipDelay: 500, // задержка перед показом тултипа в мс
        notificationDuration: 5000 // время показа уведомления в мс
    },
    
    // Настройки голосового ассистента
    voice: {
        defaultRate: 1.0,
        defaultPitch: 1.0,
        defaultVolume: 1.0,
        language: "ru-RU"
    },
    
    // Настройки производительности
    performance: {
        maxConcurrentAnimations: 10,
        frameRate: 60,
        useWebWorkers: false
    },
    
    // Настройки данных
    data: {
        mapDataPath: "js/map-data.js",
        audioPath: "assets/audio/",
        imagePath: "assets/images/",
        jsonDataPath: "assets/data/"
    }
};

// Функция для получения значения конфигурации
function getConfigValue(path) {
    const keys = path.split('.');
    let value = CONFIG;
    
    for (const key of keys) {
        if (value === undefined || value === null) {
            return undefined;
        }
        value = value[key];
    }
    
    return value;
}

// Функция для установки значения конфигурации (только для разработки)
function setConfigValue(path, value) {
    const keys = path.split('.');
    let config = CONFIG;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (config[key] === undefined) {
            config[key] = {};
        }
        config = config[key];
    }
    
    config[keys[keys.length - 1]] = value;
}