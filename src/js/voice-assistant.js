// Модуль голосового ассистента
let speechSynthesis, isVoiceActive = false;
let currentUtterance = null;

function initVoiceAssistant() {
    // Проверяем поддержку Web Speech API
    if ('speechSynthesis' in window) {
        speechSynthesis = window.speechSynthesis;
        console.log('Web Speech API поддерживается');
    } else {
        console.error('Web Speech API не поддерживается в этом браузере');
    }
    
    console.log('Модуль голосового ассистента инициализирован');
}

// Функция для активации голосового сопровождения
function activateVoiceAssistant(title, description) {
    if (!speechSynthesis) {
        console.error('Web Speech API не поддерживается');
        return;
    }
    
    // Прерываем предыдущее воспроизведение
    if (currentUtterance) {
        speechSynthesis.cancel();
    }
    
    // Создаем новый текст для произнесения
    const text = `${title}. ${description}`;
    
    // Создаем и настраиваем utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Настраиваем параметры
    currentUtterance.lang = 'ru-RU';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;
    
    // Выбираем голос (если доступны русские голоса)
    const voices = speechSynthesis.getVoices();
    const russianVoice = voices.find(voice => voice.lang.includes('ru'));
    if (russianVoice) {
        currentUtterance.voice = russianVoice;
    }
    
    // Воспроизводим текст
    speechSynthesis.speak(currentUtterance);
    
    // Обновляем текст в панели
    document.getElementById('excursion-text').textContent = text;
}

// Функция для активации голосового сопровождения при входе в здание
function activateBuildingVoiceAssistant(buildingId) {
    if (!speechSynthesis) {
        console.error('Web Speech API не поддерживается');
        return;
    }
    
    // Получаем информацию о здании из менеджера данных
    const buildingInfo = typeof dataManager !== 'undefined' ? dataManager.getBuildingInfo(buildingId) : null;
    
    if (!buildingInfo) {
        console.error(`Информация о здании ${buildingId} не найдена`);
        return;
    }
    
    // Прерываем предыдущее воспроизведение
    if (currentUtterance) {
        speechSynthesis.cancel();
    }
    
    // Формируем текст для произнесения
    const text = `Добро пожаловать в ${buildingInfo.name}. ${buildingInfo.historicalContext} Архитектурные особенности: ${buildingInfo.architecturalFeatures}. Социальная функция: ${buildingInfo.socialFunction}.`;
    
    // Создаем и настраиваем utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Настраиваем параметры
    currentUtterance.lang = 'ru-RU';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;
    
    // Выбираем голос (если доступны русские голоса)
    const voices = speechSynthesis.getVoices();
    const russianVoice = voices.find(voice => voice.lang.includes('ru'));
    if (russianVoice) {
        currentUtterance.voice = russianVoice;
    }
    
    // Воспроизводим текст
    speechSynthesis.speak(currentUtterance);
    
    // Обновляем текст в панели
    document.getElementById('excursion-text').textContent = text;
    
    console.log(`Голосовое сопровождение активировано для здания: ${buildingInfo.name}`);
}

// Функция для начала экскурсии
function startVoiceExcursion() {
    if (!speechSynthesis) {
        console.error('Web Speech API не поддерживается');
        return;
    }
    
    isVoiceActive = true;
    
    // Приветственное сообщение для экскурсии
    const welcomeMessage = "Добро пожаловать в виртуальную экскурсию по средневековому Новгороду! Я буду сопровождать вас и рассказывать об интересных местах.";
    
    // Создаем и настраиваем utterance
    currentUtterance = new SpeechSynthesisUtterance(welcomeMessage);
    
    // Настраиваем параметры
    currentUtterance.lang = 'ru-RU';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;
    
    // Выбираем голос
    const voices = speechSynthesis.getVoices();
    const russianVoice = voices.find(voice => voice.lang.includes('ru'));
    if (russianVoice) {
        currentUtterance.voice = russianVoice;
    }
    
    // Воспроизводим текст
    speechSynthesis.speak(currentUtterance);
    
    // Обновляем текст в панели
    document.getElementById('excursion-text').textContent = welcomeMessage;
}

// Функция для остановки экскурсии
function stopVoiceExcursion() {
    if (!speechSynthesis) {
        console.error('Web Speech API не поддерживается');
        return;
    }
    
    isVoiceActive = false;
    
    // Прерываем текущее воспроизведение
    speechSynthesis.cancel();
    
    // Обновляем текст в панели
    document.getElementById('excursion-text').textContent = "Голосовая экскурсия остановлена. Нажмите 'Включить', чтобы продолжить.";
}

// Функция для синтеза речи
function speakText(text) {
    if (!speechSynthesis) {
        console.error('Web Speech API не поддерживается');
        return;
    }
    
    // Прерываем предыдущее воспроизведение
    if (currentUtterance) {
        speechSynthesis.cancel();
    }
    
    // Создаем и настраиваем utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Настраиваем параметры
    currentUtterance.lang = 'ru-RU';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;
    
    // Выбираем голос
    const voices = speechSynthesis.getVoices();
    const russianVoice = voices.find(voice => voice.lang.includes('ru'));
    if (russianVoice) {
        currentUtterance.voice = russianVoice;
    }
    
    // Воспроизводим текст
    speechSynthesis.speak(currentUtterance);
}

// Функция для проверки статуса синтеза речи
function isSpeaking() {
    return speechSynthesis && speechSynthesis.speaking;
}