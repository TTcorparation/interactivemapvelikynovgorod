// Главный файл инициализации приложения
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Приложение "Виртуальное Путешествие в Средневековый Новгород" загружено');
    
    // Инициализация менеджера данных
    await initDataManager();
    
    // Инициализация навигации по зданиям
    initBuildingNavigation();
    
    // Инициализация основных компонентов
    initMap();
    initNavigation();
    initInteractionManager();
    initVoiceAssistant();
    initUI();
    
    // Данные о карте уже загружены как модуль
    if (typeof mapData !== 'undefined') {
        window.mapData = mapData;
        console.log('Данные о карте загружены');
    } else {
        console.error('Данные о карте не найдены');
    }
});