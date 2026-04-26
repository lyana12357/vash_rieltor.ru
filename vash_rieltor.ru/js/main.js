// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let properties = [];
let categories = [];
let featuresData = [];

// ========== ЗАГРУЗКА ДАННЫХ ИЗ API ==========
async function loadProperties() {
    try {
        const response = await fetch('api.php');
        const data = await response.json();
        
        properties = data;
        console.log('✅ Загружено', data.length, 'объектов');
        
        // Обновить отображение
        if (typeof displayProperties === 'function') {
            displayProperties('all');
        }
        
        // Обновить фильтры если есть
        if (typeof initCatalogFilters === 'function') {
            initCatalogFilters();
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки из API:', error);
        // Используем резервные данные если API не работает
        useBackupData();
    }
}

// Резервные данные (если API не работает)
function useBackupData() {
    console.log('📦 Использую резервные данные');
    properties = [
        {
            id: 101,
            title: "ЖК «Атриум»",
            type: "new",
            price: null,
            address: "ул. Софронова, Якутск",
            district: "Центр",
            rooms: null,
            area: null,
            floor: null,
            totalFloors: null,
            description: "Принимаем бронь на квартиры по государственным программам. Первоначальный взнос от 760 000 ₽. Ввод в эксплуатацию - 2028 год.",
            features: ["Госпрограммы", "Бронь", "Новостройка", "Ввод 2028"],
            hot: true,
            images: ["img/properties/atrium.jpg"]
        },
        {
            id: 102,
            title: "203 мкрн.",
            type: "secondary",
            price: 6800000,
            address: "203 мкрн, к 6, Якутск",
            district: "Губинский округ",
            rooms: 1,
            area: 41,
            floor: 13,
            totalFloors: 16,
            description: "Уютная квартира в 203 микрорайоне.",
            features: ["Евроремонт"],
            hot: true,
            images: ["img/properties/203mkr1.jpg", "img/properties/203mkr2.jpg", "img/properties/203mkr3.jpg", "img/properties/203mkr4.jpg"]
        },
        {
            id: 103,
            title: "Частный дом районе Сатал",
            type: "house",
            price: 12500000,
            address: "Якутск",
            district: "Приборный",
            rooms: 4,
            area: 120,
            landArea: 600,
            floor: null,
            totalFloors: null,
            description: "Двухэтажный дом 2024 года постройки.",
            features: ["Дом", "Участок 10 соток", "3 спальни", "Просторный холл", "Большие окна за счет которых в доме светло, даже зимой"],
            hot: false,
            images: ["img/properties/house.jpg"]
        },
        {
            id: 104,
            title: "ЖК Атмосфера",
            type: "new",
            price: 4200000,
            address: "Вилюйский тракт 5, Якутск",
            district: "Сайсарский",
            rooms: 2,
            area: 58,
            floor: 7,
            totalFloors: 12,
            description: "Квартира в Новом ЖК.",
            features: ["Новостройка", "Черновой вариант"],
            hot: true,
            images: ["img/properties/atmosfera.jpg"]
        },
        {
            id: 105,
            title: "Коммерческое помещение в центре",
            type: "commercial",
            price: 18500000,
            address: "пр. Ленина, 42, Якутск",
            district: "Центр",
            area: 85,
            rooms: null,
            floor: null,
            totalFloors: null,
            description: "Помещение свободного назначения на 1 этаже.",
            features: ["Отдельный вход", "Витрина"],
            hot: false,
            images: ["img/properties/komercheskaya.jpg"]
        },
        {
            id: 106,
            title: "Земельный участок под ИЖС",
            type: "land",
            price: 3500000,
            address: "мкр. Марха, ул. Томтор, 14/1, Якутск",
            district: "Марха",
            landArea: 850,
            rooms: null,
            area: null,
            floor: null,
            totalFloors: null,
            description: "Участок 8.5 соток, подведены коммуникации.",
            features: ["Коммуникации на границе", "Плодородная почва"],
            hot: false,
            images: ["img/properties/ucastok1.jpg"]
        }
    ];
    
    if (typeof displayProperties === 'function') {
        displayProperties('all');
    }
}

// ========== ДАННЫЕ КАТЕГОРИЙ ==========
const categoriesData = [
    { id: 1, title: "Новостройки", description: "Современные квартиры в новых домах", icon: "🏢" },
    { id: 2, title: "Вторичное жилье", description: "Проверенные квартиры", icon: "🏠" },
    { id: 3, title: "Частные дома", description: "Коттеджи и дома с участками", icon: "🏡" },
    { id: 4, title: "Коммерческая", description: "Помещения для бизнеса", icon: "🏪" },
    { id: 5, title: "Земельные участки", description: "Участки для строительства", icon: "📍" }
];

// ========== ДАННЫЕ ПРЕИМУЩЕСТВ ==========
const featuresList = [
    { id: 1, title: "Юридическая проверка", description: "Полная проверка чистоты сделки", icon: "⚖️" },
    { id: 2, title: "Сопровождение до ключа", description: "Помощь на всех этапах", icon: "🔑" },
    { id: 3, title: "Ипотека для Якутска", description: "Помощь в оформлении ипотеки", icon: "💰" },
    { id: 4, title: "Оценка стоимости", description: "Бесплатная экспертная оценка", icon: "📊" },
    { id: 5, title: "Быстрая продажа", description: "Продажа в кратчайшие сроки", icon: "⚡" },
    { id: 6, title: "Северные спецусловия", description: "Учет особенностей Севера", icon: "❄️" }
];

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function formatCurrency(number) {
    if (!number && number !== 0) return 'Цена по запросу';
    return new Intl.NumberFormat('ru-RU').format(number) + ' ₽';
}

function getStatusText(type) {
    const statuses = { new: 'Новостройка', secondary: 'Вторичка', house: 'Дом', commercial: 'Коммерческая', land: 'Участок' };
    return statuses[type] || 'В продаже';
}

function getFilterValue(title) {
    const map = { 'Новостройки': 'new', 'Вторичное жилье': 'secondary', 'Частные дома': 'house', 'Коммерческая': 'commercial', 'Земельные участки': 'land' };
    return map[title] || 'all';
}

// ========== ФУНКЦИЯ ДЛЯ МОДАЛЬНОГО ОКНА ==========
function showPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const message = `Здравствуйте! Хочу получить информацию по объекту: ${property.title} (ID: ${property.id}) - ${property.price ? formatCurrency(property.price) : 'Цена по запросу'}`;
    const encodedMessage = encodeURIComponent(message);
    
    const modalHTML = `
        <div class="modal" id="propertyModal" style="display: block;">
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h3>${property.title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-slider" id="modalSlider-${property.id}" style="margin-bottom: 20px;">
                        ${property.images && property.images.length > 0 ? property.images.map(img => `
                            <div>
                                <img src="${img}" alt="${property.title}" style="width: 100%; height: auto; border-radius: 12px;" onerror="this.src='https://via.placeholder.com/800x600/CCCCCC?text=Нет+фото'">
                            </div>
                        `).join('') : `
                            <div>
                                <img src="https://via.placeholder.com/800x600/CCCCCC?text=Нет+фото" alt="Нет фото" style="width: 100%; border-radius: 12px;">
                            </div>
                        `}
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <div style="font-size: 1.8rem; font-weight: 800;">${property.price ? formatCurrency(property.price) : 'Цена по запросу'}</div>
                        ${property.hot ? '<span style="background: var(--accent-yellow); padding: 5px 12px; border-radius: 20px;">🔥 Горячее</span>' : ''}
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h4>📍 Адрес</h4>
                        <p>${property.address || 'Не указан'}</p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h4>📝 Описание</h4>
                        <div style="background: var(--bg-secondary); padding: 15px; border-radius: 12px;">
                            ${property.description || 'Описание отсутствует'}
                        </div>
                    </div>
                    
                    ${property.features && property.features.length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h4>✨ Особенности</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            ${property.features.map(f => `<span style="background: var(--accent-yellow-light); padding: 5px 12px; border-radius: 20px;">${f}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div style="display: flex; gap: 15px; margin-top: 20px;">
                        <a href="https://max.ru/u/f9LHodD0cOL3GsvlNV6NK8gpbX6CcGKEUiuEQHVjHxSs1NlcgCvF_FKttLs?phone=79142986162&text=${encodedMessage}" class="btn btn-primary" style="flex: 1; text-align: center; background: #0055FF; border: none;">
                            <i class="fas fa-comment-dots"></i> Мессенджер Макс
                        </a>
                        <a href="tel:+79142986162" class="btn btn-secondary" style="flex: 1; text-align: center;">
                            <i class="fas fa-phone"></i> Позвонить
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const oldModal = document.getElementById('propertyModal');
    if (oldModal) oldModal.remove();
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    setTimeout(() => {
        if ($(`#modalSlider-${property.id}`).length && property.images && property.images.length > 1) {
            $(`#modalSlider-${property.id}`).slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true
            });
        }
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('propertyModal');
    if (modal) modal.remove();
    if (typeof $ !== 'undefined') {
        $('.modal-slider').slick('unslick');
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('modal')) {
        closeModal();
    }
});

// ========== ФУНКЦИИ ОТОБРАЖЕНИЯ ==========
function displayCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    container.innerHTML = categoriesData.map(cat => `
        <div class="category-card">
            <div class="category-icon">${cat.icon}</div>
            <h3>${cat.title}</h3>
            <p>${cat.description}</p>
            <a href="catalog.html?filter=${getFilterValue(cat.title)}" class="btn btn-outline">Смотреть</a>
        </div>
    `).join('');
}

function displayFeatures() {
    const container = document.getElementById('featuresContainer');
    if (!container) return;
    container.innerHTML = featuresList.map(f => `
        <div class="feature-item">
            <div class="feature-icon-wrapper">${f.icon}</div>
            <h3>${f.title}</h3>
            <p>${f.description}</p>
        </div>
    `).join('');
}

function displayProperties(filter = 'all') {
    const container = document.getElementById('propertiesContainer');
    if (!container) return;
    
    const filtered = filter === 'all' ? properties : properties.filter(p => p.type === filter);
    
    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:50px;"><h3>Ничего не найдено</h3><p>Попробуйте изменить фильтр</p></div>`;
        return;
    }
    
    container.innerHTML = filtered.map(property => `
        <div class="property-card">
            <div class="property-media">
                <div class="property-slider" id="slider-${property.id}">
                    ${property.images && property.images.length > 0 ? property.images.map(img => `
                        <div><img src="${img}" alt="${property.title}" class="property-image" onerror="this.src='https://via.placeholder.com/800x600/CCCCCC/FFFFFF?text=Нет+фото'"></div>
                    `).join('') : `
                        <div><img src="https://via.placeholder.com/800x600/CCCCCC/FFFFFF?text=Нет+фото" alt="Нет фото" class="property-image"></div>
                    `}
                </div>
                ${property.hot ? '<div class="property-badge">🔥 Горячее</div>' : ''}
                <div class="property-status">${getStatusText(property.type)}</div>
            </div>
            <div class="property-content">
                <div class="property-price">${property.price ? formatCurrency(property.price) : 'Цена по запросу'}</div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-address"><i class="fas fa-map-marker-alt"></i> ${property.address || 'Адрес не указан'}</div>
                <div class="property-features">
                    <div class="feature"><div class="feature-value">${property.rooms || '-'}</div><div class="feature-label">комнат</div></div>
                    <div class="feature"><div class="feature-value">${property.area || property.landArea || '-'} м²</div><div class="feature-label">${property.area ? 'площадь' : (property.landArea ? 'участок' : 'площадь')}</div></div>
                    <div class="feature"><div class="feature-value">${property.floor ? property.floor+'/'+property.totalFloors : (property.landArea ? 'Участок' : '-')}</div><div class="feature-label">${property.floor ? 'этаж' : (property.landArea ? 'тип' : 'этаж')}</div></div>
                </div>
                <div class="property-footer">
                    <div class="property-id">ID: ${property.id}</div>
                    <div style="display: flex; gap: 10px;">
                        <a href="tel:+79142986162" class="btn btn-secondary" style="padding: 8px 12px;">
                            <i class="fas fa-phone"></i>
                        </a>
                        <button class="btn btn-primary" onclick="showPropertyDetails(${property.id})" style="padding: 8px 12px;">
                            <i class="fas fa-eye"></i> Подробнее
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    setTimeout(() => {
        properties.forEach(property => {
            const sliderId = `#slider-${property.id}`;
            if ($(sliderId).length && property.images && property.images.length > 1) {
                $(sliderId).slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: true,
                    pauseOnHover: true
                });
            }
        });
    }, 100);
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navLinks');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => nav.classList.toggle('active'));
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('active'));
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 15 минут.');
        form.reset();
    });
}

function initMortgageCalculator() {
    const calcBtn = document.getElementById('calculate-btn');
    if (!calcBtn) return;
    
    const priceInput = document.getElementById('property-price');
    const priceRange = document.getElementById('property-price-range');
    const initialInput = document.getElementById('initial-payment');
    const initialRange = document.getElementById('initial-payment-range');
    const rateInput = document.getElementById('interest-rate');
    const rateRange = document.getElementById('interest-rate-range');
    
    if (priceInput && priceRange) {
        priceInput.addEventListener('input', () => { priceRange.value = priceInput.value; });
        priceRange.addEventListener('input', () => { priceInput.value = priceRange.value; });
    }
    if (initialInput && initialRange) {
        initialInput.addEventListener('input', () => { initialRange.value = initialInput.value; });
        initialRange.addEventListener('input', () => { initialInput.value = initialRange.value; });
    }
    if (rateInput && rateRange) {
        rateInput.addEventListener('input', () => { rateRange.value = rateInput.value; });
        rateRange.addEventListener('input', () => { rateInput.value = rateRange.value; });
    }
    
    calcBtn.addEventListener('click', function() {
        const price = parseFloat(priceInput?.value || 5000000);
        const initial = parseFloat(initialInput?.value || 1000000);
        const term = parseInt(document.getElementById('loan-term')?.value || 15);
        const rate = parseFloat(rateInput?.value || 7.5) / 100;
        
        if (initial >= price) {
            alert('Первоначальный взнос не может быть больше стоимости недвижимости');
            return;
        }
        
        const loanAmount = price - initial;
        const monthlyRate = rate / 12;
        const months = term * 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = monthlyPayment * months;
        
        document.getElementById('loan-amount').textContent = formatCurrency(loanAmount);
        document.getElementById('monthly-payment').textContent = formatCurrency(Math.round(monthlyPayment));
        document.getElementById('total-payment').textContent = formatCurrency(Math.round(totalPayment));
        document.getElementById('overpayment').textContent = formatCurrency(Math.round(totalPayment - loanAmount));
        document.getElementById('effective-rate').textContent = ((Math.pow(totalPayment / loanAmount, 1 / term) - 1) * 100).toFixed(1) + '%';
        document.getElementById('mortgage-result')?.classList.add('active');
    });
}

function initCatalogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayProperties(this.dataset.filter);
        });
    });
    
    displayProperties('all');
}

// ========== ЗАПУСК ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    displayCategories();
    displayFeatures();
    initMobileMenu();
    initContactForm();
    initMortgageCalculator();
    
    // Загружаем данные из API (или резервные)
    loadProperties();
});