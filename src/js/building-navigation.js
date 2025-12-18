// Модуль навигации по зданиям
class BuildingNavigation {
    constructor() {
        this.currentView = 'map'; // 'map' или 'building'
        this.currentBuilding = null;
        this.buildingViews = {};
        this.isInitialized = false;
    }
    
    // Инициализация навигации по зданиям
    init() {
        this.createBuildingViews();
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('Навигация по зданиям инициализирована');
    }
    
    // Создание представлений для зданий
    createBuildingViews() {
        // В реальном приложении здесь будут создаваться HTML-элементы для отображения внутренностей зданий
        // Пока что создадим заглушку
        
        // Для каждого здания создаем "внутреннее представление"
        if (window.mapData) {
            window.mapData.buildings.forEach(building => {
                this.buildingViews[building.id] = this.createBuildingInteriorView(building);
            });
        }
    }
    
    // Создание представления внутренностей здания
    createBuildingInteriorView(building) {
        // Возвращаем объект с информацией о внутренностях здания
        return {
            id: building.id,
            name: building.name,
            interiorDescription: building.interior ? building.interior.description : `Внутреннее убранство ${building.name}.`,
            backgroundImage: this.getBuildingInteriorImage(building.id), // Добавляем фоновое изображение
            characters: this.generateCharacters(building.id),
            activities: this.generateActivities(building.id),
            historicalFacts: {
                historicalContext: building.historical_context || this.getHistoricalFacts(building.id).historicalContext,
                architecturalFeatures: building.architectural_features || this.getHistoricalFacts(building.id).architecturalFeatures,
                socialFunction: building.social_function || this.getHistoricalFacts(building.id).socialFunction
            }
        };
    }

    // Получение пути к изображению интерьера здания
    getBuildingInteriorImage(buildingId) {
        // В будущем можно подключить фактические изображения интерьеров
        const buildingImages = {
            'kremlin': 'src/assets/kremlin-interior.jpg',
            'sofia_cathedral': 'src/assets/sofia-cathedral-interior.jpg',
            'boyar_house': 'src/assets/boyar-house-interior.jpg',
            'merchant_house': 'src/assets/merchant-house-interior.jpg',
            'artisan_house': 'src/assets/artisan-house-interior.jpg',
            'church_lipyen': 'src/assets/church-interior.jpg'
        };

        return buildingImages[buildingId] || null;
    }
    
    // Генерация персонажей для здания
    generateCharacters(buildingId) {
        const characterTypes = {
            'kremlin': [
                {name: 'Князь', description: 'Правитель Новгорода', role: 'Управление княжеством'},
                {name: 'Архиепископ', description: 'Высшее духовное лицо', role: 'Руководство церковью'},
                {name: 'Боярин', description: 'Знатный феодал', role: 'Советник князя'}
            ],
            'sofia_cathedral': [
                {name: 'Священник', description: 'Служитель церкви', role: 'Проведение богослужений'},
                {name: 'Монах', description: 'Служитель церкви', role: 'Помощь в богослужениях'},
                {name: 'Певчий', description: 'Церковный певчий', role: 'Церковное пение'}
            ],
            'boyar_house': [
                {name: 'Боярин', description: 'Хозяин дома', role: 'Управление имением'},
                {name: 'Боярыня', description: 'Хозяйка дома', role: 'Управление домом'},
                {name: 'Слуга', description: 'Домашний работник', role: 'Обслуживание дома'}
            ],
            'merchant_house': [
                {name: 'Купец', description: 'Хозяин дома', role: 'Торговля'},
                {name: 'Приказчик', description: 'Управляющий', role: 'Управление торговлей'},
                {name: 'Ремесленник', description: 'Работник', role: 'Производство товаров'}
            ],
            'artisan_house': [
                {name: 'Ремесленник', description: 'Мастер', role: 'Производство изделий'},
                {name: 'Ученик', description: 'Подмастерье', role: 'Помощь мастеру'},
                {name: 'Жена', description: 'Хозяйка', role: 'Домашние дела'}
            ],
            'church_lipyen': [
                {name: 'Священник', description: 'Служитель церкви', role: 'Проведение богослужений'},
                {name: 'Целовальник', description: 'Церковный служка', role: 'Обслуживание церкви'},
                {name: 'Певчий', description: 'Церковный певчий', role: 'Церковное пение'}
            ]
        };
        
        return characterTypes[buildingId] || [
            {name: 'Житель', description: 'Обычный житель', role: 'Живет в здании'}
        ];
    }
    
    // Генерация деятельности в здании
    generateActivities(buildingId) {
        const activities = {
            'kremlin': [
                'Совещание бояр',
                'Прием послов',
                'Хранение казны',
                'Составление документов'
            ],
            'sofia_cathedral': [
                'Богослужение',
                'Крещение',
                'Венчание',
                'Пение псалмов'
            ],
            'boyar_house': [
                'Прием гостей',
                'Пир',
                'Управление хозяйством',
                'Обучение детей'
            ],
            'merchant_house': [
                'Заключение сделок',
                'Счетоводство',
                'Сортировка товаров',
                'Проверка качества'
            ],
            'artisan_house': [
                'Изготовление изделий',
                'Обучение учеников',
                'Ремонт инструментов',
                'Подготовка материалов'
            ],
            'church_lipyen': [
                'Богослужение',
                'Обучение грамоте',
                'Исповедь',
                'Церковные праздники'
            ]
        };
        
        return activities[buildingId] || ['Обычная деятельность'];
    }
    
    // Получение исторических фактов о здании
    getHistoricalFacts(buildingId) {
        if (typeof dataManager !== 'undefined') {
            return {
                historicalContext: dataManager.getHistoricalContext(buildingId),
                architecturalFeatures: dataManager.getArchitecturalFeatures(buildingId),
                socialFunction: dataManager.getSocialFunction(buildingId)
            };
        }
        
        return {
            historicalContext: `Исторический контекст для ${buildingId}`,
            architecturalFeatures: `Архитектурные особенности ${buildingId}`,
            socialFunction: `Социальная функция ${buildingId}`
        };
    }
    
    // Настройка обработчиков событий
    setupEventListeners() {
        // Обработчик для кнопки возврата на карту
        const backButton = document.getElementById('back-to-map');
        if (backButton) {
            backButton.addEventListener('click', () => this.returnToMap());
        } else {
            // Создаем кнопку возврата, если её нет
            this.createBackButton();
        }
    }
    
    // Создание кнопки возврата на карту
    createBackButton() {
        const button = document.createElement('button');
        button.id = 'back-to-map';
        button.className = 'nav-btn';
        button.textContent = '⌂';
        button.title = 'Вернуться на карту';
        button.style.position = 'absolute';
        button.style.top = '20px';
        button.style.left = '20px';
        button.style.zIndex = '100';
        
        button.addEventListener('click', () => this.returnToMap());
        
        document.body.appendChild(button);
        // Скрываем кнопку по умолчанию
        button.style.display = 'none';
    }
    
    // Переход внутрь здания
    enterBuilding(buildingId) {
        if (!this.isInitialized) {
            console.error('BuildingNavigation не инициализирован');
            return;
        }
        
        const buildingView = this.buildingViews[buildingId];
        if (!buildingView) {
            console.error(`Представление для здания ${buildingId} не найдено`);
            return;
        }
        
        // Сохраняем текущее здание
        this.currentBuilding = buildingView;
        this.currentView = 'building';
        
        // Показываем кнопку возврата
        const backButton = document.getElementById('back-to-map');
        if (backButton) {
            backButton.style.display = 'block';
        }
        
        // Скрываем карту
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.style.display = 'none';
        }
        
        // Отображаем внутренности здания
        this.displayBuildingInterior(buildingView);
        
        console.log(`Вход в здание: ${buildingView.name}`);
        
        // Активируем голосовое сопровождение для здания
        if (typeof activateBuildingVoiceAssistant === 'function') {
            activateBuildingVoiceAssistant(buildingId);
        } else if (typeof activateVoiceAssistant === 'function') {
            const description = `Вы вошли в ${buildingView.name}. ${buildingView.interiorDescription}`;
            activateVoiceAssistant(buildingView.name, description);
        }
    }
    
    // Отображение внутренностей здания
    displayBuildingInterior(buildingView) {
        // Создаем элемент для отображения внутренностей здания
        let interiorElement = document.getElementById('building-interior');
        if (!interiorElement) {
            interiorElement = document.createElement('div');
            interiorElement.id = 'building-interior';
            interiorElement.style.position = 'absolute';
            interiorElement.style.top = '0';
            interiorElement.style.left = '0';
            interiorElement.style.width = '100%';
            interiorElement.style.height = '100%';

            // Если есть изображение интерьера, используем его как фон
            if (buildingView.backgroundImage) {
                interiorElement.style.background = `linear-gradient(rgba(240, 230, 210, 0.85), rgba(240, 230, 210, 0.9)), url('${buildingView.backgroundImage}')`;
                interiorElement.style.backgroundSize = 'cover';
                interiorElement.style.backgroundPosition = 'center';
                interiorElement.style.backgroundRepeat = 'no-repeat';
            } else {
                interiorElement.style.backgroundColor = '#f0e6d2';
            }

            interiorElement.style.display = 'flex';
            interiorElement.style.flexDirection = 'column';
            interiorElement.style.zIndex = '50';
            interiorElement.style.overflow = 'auto';

            document.body.appendChild(interiorElement);
        }

        // Заполняем содержимое
        interiorElement.innerHTML = `
            <div style="
                max-width: 1000px;
                width: 90%;
                margin: 20px auto;
                text-align: center;
                background: rgba(255, 255, 255, 0.85);
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                font-family: Arial, sans-serif;
            ">
                <div style="position: relative;">
                    <h2 style="
                        color: #2c3e50;
                        margin: 0 0 15px 0;
                        font-size: 2.2em;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    ">${buildingView.name}</h2>

                    <button id="exit-building" style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        padding: 8px 15px;
                        background: #e74c3c;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">
                        ← Назад
                    </button>
                </div>

                <p style="
                    margin: 15px 0;
                    font-size: 1.2em;
                    line-height: 1.6;
                    color: #34495e;
                    background: #ecf0f1;
                    padding: 15px;
                    border-radius: 8px;
                ">${buildingView.interiorDescription}</p>

                <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    margin: 25px 0;
                ">
                    <div style="
                        background: linear-gradient(to bottom, #ffffff, #f8f9fa);
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        border-left: 4px solid #3498db;
                    ">
                        <h3 style="
                            color: #2c3e50;
                            margin-top: 0;
                            font-size: 1.4em;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 8px;
                        ">Персонажи</h3>
                        <ul style="
                            text-align: left;
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                        ">
                            ${buildingView.characters.map(char =>
                                `<li style="
                                    margin: 12px 0;
                                    padding: 10px;
                                    background: rgba(52, 152, 219, 0.1);
                                    border-radius: 6px;
                                    border-left: 3px solid #3498db;
                                ">
                                    <strong style="color: #2c3e50;">${char.name}</strong> - ${char.description}<br>
                                    <em style="color: #7f8c8d;">Роль: ${char.role}</em>
                                </li>`
                            ).join('')}
                        </ul>
                    </div>

                    <div style="
                        background: linear-gradient(to bottom, #ffffff, #f8f9fa);
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        border-left: 4px solid #9b59b6;
                    ">
                        <h3 style="
                            color: #2c3e50;
                            margin-top: 0;
                            font-size: 1.4em;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 8px;
                        ">Деятельность</h3>
                        <ul style="
                            text-align: left;
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                        ">
                            ${buildingView.activities.map(activity =>
                                `<li style="
                                    margin: 10px 0;
                                    padding: 10px;
                                    background: rgba(155, 89, 182, 0.1);
                                    border-radius: 6px;
                                    border-left: 3px solid #9b59b6;
                                ">${activity}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>

                <div style="
                    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    border-left: 4px solid #27ae60;
                    margin: 20px 0;
                ">
                    <h3 style="
                        color: #2c3e50;
                        margin-top: 0;
                        font-size: 1.4em;
                        text-align: center;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 8px;
                    ">Исторические сведения</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div style="
                            padding: 15px;
                            background: rgba(39, 174, 96, 0.05);
                            border-radius: 8px;
                            border-left: 3px solid #27ae60;
                        ">
                            <h4 style="color: #27ae60; margin-top: 0;">Исторический контекст</h4>
                            <p style="line-height: 1.5;">${buildingView.historicalFacts.historicalContext}</p>
                        </div>
                        <div style="
                            padding: 15px;
                            background: rgba(39, 174, 96, 0.05);
                            border-radius: 8px;
                            border-left: 3px solid #27ae60;
                        ">
                            <h4 style="color: #27ae60; margin-top: 0;">Архитектурные особенности</h4>
                            <p style="line-height: 1.5;">${buildingView.historicalFacts.architecturalFeatures}</p>
                        </div>
                        <div style="
                            padding: 15px;
                            background: rgba(39, 174, 96, 0.05);
                            border-radius: 8px;
                            border-left: 3px solid #27ae60;
                        ">
                            <h4 style="color: #27ae60; margin-top: 0;">Социальная функция</h4>
                            <p style="line-height: 1.5;">${buildingView.historicalFacts.socialFunction}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Добавляем обработчик для кнопки выхода
        document.getElementById('exit-building').addEventListener('click', () => {
            this.returnToMap();
        });
    }
    
    // Возврат к карте
    returnToMap() {
        if (!this.isInitialized) {
            console.error('BuildingNavigation не инициализирован');
            return;
        }
        
        this.currentView = 'map';
        this.currentBuilding = null;
        
        // Скрываем кнопку возврата
        const backButton = document.getElementById('back-to-map');
        if (backButton) {
            backButton.style.display = 'none';
        }
        
        // Показываем карту
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.style.display = 'block';
        }
        
        // Скрываем внутренности здания
        const interiorElement = document.getElementById('building-interior');
        if (interiorElement) {
            interiorElement.style.display = 'none';
        }
        
        console.log('Возврат к карте');
    }
    
    // Проверка, находимся ли мы внутри здания
    isInsideBuilding() {
        return this.currentView === 'building';
    }
    
    // Получение текущего здания
    getCurrentBuilding() {
        return this.currentBuilding;
    }
}

// Создаем глобальный экземпляр навигации по зданиям
const buildingNavigation = new BuildingNavigation();

// Функция для инициализации навигации по зданиям
function initBuildingNavigation() {
    buildingNavigation.init();
}

// Функция для входа в здание
function enterBuilding(buildingId) {
    buildingNavigation.enterBuilding(buildingId);
}