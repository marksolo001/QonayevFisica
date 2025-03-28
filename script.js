// Функція для визначення пристрою
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Оптимізація для тач-пристроїв
if (isMobileDevice()) {
    document.body.classList.add('touch-device');
    
    // Поліпшення для тач-подій
    document.querySelectorAll('.btn, .card, [data-bs-toggle="dropdown"]').forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('touchstart', function() {
            this.classList.add('active');
        }, false);
        element.addEventListener('touchend', function() {
            this.classList.remove('active');
        }, false);
    });
}

// Ініціалізація Bootstrap компонентів
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація тултипів і поповерів
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Оптимізація дропдаунів для мобільних
    if (isMobileDevice()) {
        document.querySelectorAll('.dropdown-toggle').forEach(element => {
            element.addEventListener('click', function(e) {
                if (this.nextElementSibling.classList.contains('show')) {
                    bootstrap.Dropdown.getInstance(this).hide();
                } else {
                    bootstrap.Dropdown.getInstance(this)?.toggle();
                }
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }
    
    // Перевірка авторизації
    checkAuth();
});

// Решта вашого коду для авторизації...
// script.js файлында
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    // Серверге жіберу
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Сәтті:', data);
    })
    .catch(error => {
        console.error('Қате:', error);
    });
});