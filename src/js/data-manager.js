// Модуль управления историческими данными
class DataManager {
    constructor() {
        this.data = {};
        this.initialized = false;
    }
    
    // Инициализация менеджера данных
    async init() {
        try {
            // Загружаем основные данные о карте
            await this.loadMapData();
            
            // Загружаем исторические данные
            await this.loadHistoricalData();
            
            // Загружаем аудио-файлы
            await this.loadAudioData();
            
            this.initialized = true;
            console.log('Менеджер данных инициализирован');
        } catch (error) {
            console.error('Ошибка инициализации менеджера данных:', error);
        }
    }
    
    // Загрузка данных о карте
    async loadMapData() {
        return new Promise((resolve, reject) => {
            if (typeof mapData !== 'undefined') {
                this.data.mapData = mapData;
                console.log('Данные о карте загружены');
                resolve();
            } else {
                // Если данные не определены, пробуем загрузить их
                fetch('js/map-data.js')
                    .then(response => response.json())
                    .then(data => {
                        this.data.mapData = data;
                        console.log('Данные о карте загружены');
                        resolve();
                    })
                    .catch(error => {
                        console.error('Ошибка загрузки данных о карте:', error);
                        reject(error);
                    });
            }
        });
    }
    
    // Загрузка исторических данных
    async loadHistoricalData() {
        // В реальном приложении здесь будет загрузка исторических данных
        // из JSON файлов или другого источника
        
        // Заглушка для исторических данных
        this.data.historicalData = {
            buildings: {},
            characters: {},
            events: {},
            culturalFacts: {}
        };
        
        // Заполняем исторические данные на основе данных о карте
        if (this.data.mapData) {
            this.data.mapData.buildings.forEach(building => {
                this.data.historicalData.buildings[building.id] = {
                    id: building.id,
                    name: building.name,
                    description: building.description,
                    interior: building.interior,
                    historicalContext: generateHistoricalContext(building.name),
                    socialFunction: generateSocialFunction(building.name),
                    architecturalFeatures: generateArchitecturalFeatures(building.name)
                };
            });
            
            this.data.mapData.infoPoints.forEach(point => {
                this.data.historicalData.buildings[point.id] = {
                    id: point.id,
                    name: point.name,
                    description: point.description,
                    historicalContext: generateHistoricalContext(point.name),
                    socialFunction: generateSocialFunction(point.name),
                    architecturalFeatures: generateArchitecturalFeatures(point.name)
                };
            });
        }
        
        console.log('Исторические данные загружены');
    }
    
    // Загрузка аудио-данных
    async loadAudioData() {
        // В реальном приложении здесь будет загрузка информации об аудио-файлах
        this.data.audioData = {
            // Пример структуры аудио-данных
            buildingTours: {},
            historicalFacts: {},
            characterVoices: {}
        };
        
        console.log('Аудио-данные загружены');
    }
    
    // Получение информации о здании
    getBuildingInfo(buildingId) {
        if (!this.initialized) {
            console.error('DataManager не инициализирован');
            return null;
        }
        
        if (this.data.historicalData && this.data.historicalData.buildings) {
            return this.data.historicalData.buildings[buildingId];
        }
        
        return null;
    }
    
    // Получение исторического контекста для объекта
    getHistoricalContext(objectId) {
        const buildingInfo = this.getBuildingInfo(objectId);
        return buildingInfo ? buildingInfo.historicalContext : null;
    }
    
    // Получение архитектурных особенностей
    getArchitecturalFeatures(objectId) {
        const buildingInfo = this.getBuildingInfo(objectId);
        return buildingInfo ? buildingInfo.architecturalFeatures : null;
    }
    
    // Получение социальной функции здания
    getSocialFunction(objectId) {
        const buildingInfo = this.getBuildingInfo(objectId);
        return buildingInfo ? buildingInfo.socialFunction : null;
    }
    
    // Поиск объектов по тегам или ключевым словам
    searchObjects(query) {
        if (!this.initialized) {
            console.error('DataManager не инициализирован');
            return [];
        }
        
        const results = [];
        const buildings = this.data.historicalData.buildings;
        
        for (const id in buildings) {
            const building = buildings[id];
            if (
                building.name.toLowerCase().includes(query.toLowerCase()) ||
                building.description.toLowerCase().includes(query.toLowerCase()) ||
                (building.historicalContext && building.historicalContext.toLowerCase().includes(query.toLowerCase()))
            ) {
                results.push(building);
            }
        }
        
        return results;
    }
    
    // Получение всех зданий
    getAllBuildings() {
        if (!this.initialized) {
            console.error('DataManager не инициализирован');
            return [];
        }
        
        return this.data.mapData ? this.data.mapData.buildings : [];
    }
    
    // Получение всех информационных точек
    getAllInfoPoints() {
        if (!this.initialized) {
            console.error('DataManager не инициализирован');
            return [];
        }
        
        return this.data.mapData ? this.data.mapData.infoPoints : [];
    }
}

// Вспомогательные функции для генерации исторических данных
function generateHistoricalContext(buildingName) {
    const contexts = {
        "Новгородский кремль": "Новгородский кремль, также известный как Детинец, был построен в XI веке как центральная укреплённая часть города. Он служил резиденцией князей и архиепископов, а также хранилищем казны и важных документов.",
        "Софийский собор": "Софийский собор был построен в XI веке при князе Ярославе Мудром и является одним из древнейших каменных храмов на Руси. Собор играл важную роль в политической и религиозной жизни Новгорода.",
        "Дом боярина": "Дом боярина в средневековом Новгороде был центром феодальной жизни. Богатые боярские семьи обладали значительным влиянием в городском управлении и торговле.",
        "Дом купца": "Дом купца отражал процветание торговли в Новгороде. Купцы имели доступ к международным торговым путям и поддерживали связи с Ганзей, Византией и другими торговыми центрами.",
        "Дом ремесленника": "Дом ремесленника был местом работы и жизни мастеров, производивших различные изделия. Ремесленники были организованы в цехи и играли важную роль в экономике города.",
        "Церковь Николы на Липне": "Церковь Николы на Липне - одна из древнейших церквей Новгорода, построенная на Липне - торговом предместье. Она служила духовному окорму местных жителей и купцов."
    };
    
    return contexts[buildingName] || `Исторический контекст для ${buildingName}. В средневековом Новгороде это здание имело важное значение для жизни города.`;
}

function generateSocialFunction(buildingName) {
    const functions = {
        "Новгородский кремль": "Административный и укреплённый центр города, резиденция князей и высших должностных лиц, хранилище казны и важных документов.",
        "Софийский собор": "Религиозный центр, место коронования князей, хранения важных реликвий и документов, а также проведения важных городских собраний.",
        "Дом боярина": "Жилище знатной феодальной семьи, центр управления землями и крепостными, место приёма гостей и ведения политических переговоров.",
        "Дом купца": "Жилище и торговое помещение обеспеченноего купца, центр коммерческой деятельности и международной торговли.",
        "Дом ремесленника": "Место работы и жизни мастера, где производились изделия, хранятся инструменты и материалы.",
        "Церковь Николы на Липне": "Место богослужений для жителей торгового предместья, духовное окормление купцов и ремесленников."
    };
    
    return functions[buildingName] || `Социальная функция: ${buildingName} играл важную роль в жизни средневекового Новгорода.`;
}

function generateArchitecturalFeatures(buildingName) {
    const features = {
        "Новгородский кремль": "Каменные стены с башнями, белокаменные постройки, внутренние дворы, подвалы для хранения припасов и казны.",
        "Софийский собор": "Пятикупольный храм с толстыми стенами, фресками XI века, уникальной архитектурой, сочетающей византийские и русские традиции.",
        "Дом боярина": "Деревянные и каменные постройки, многофункциональные помещения, сени, горницы, подклеты, хозяйственные постройки.",
        "Дом купца": "Просторные помещения для хранения товаров, приказские комнаты, жилые помещения, склады.",
        "Дом ремесленника": "Мастерская, жилые помещения, места для хранения инструментов и материалов, печи для обжига керамики или ковки металла.",
        "Церковь Николы на Липне": "Каменное зодчество XII века, уникальные архитектурные пропорции, сохранившаяся роспись."
    };
    
    return features[buildingName] || `Архитектурные особенности: типичные для средневекового Новгорода особенности конструкции и оформления ${buildingName}.`;
}

// Создаем глобальный экземпляр менеджера данных
const dataManager = new DataManager();

// Функция для инициализации менеджера данных
async function initDataManager() {
    await dataManager.init();
}