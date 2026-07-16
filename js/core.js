/**
 * CORE JS - TecnoTrade
 * Orquestador principal de UI: Maneja Loader, Theme, Scroll y Transiciones SPA
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. INICIALIZADOR DE TEMA Y LOADER
    const systemLoader = document.getElementById('globalPageLoader');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (systemLoader) {
        systemLoader.style.backgroundColor = isDark ? '#030509' : '#f5f5f7';
        setTimeout(() => { systemLoader.style.opacity = '0'; }, 50);
    }

    // 2. TOGGLE DE TEMA (MODO OSCURO/CLARO)
    const themeCheckbox = document.getElementById('themeToggleCheckbox');
    if (themeCheckbox) {
        themeCheckbox.checked = isDark;
        themeCheckbox.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('tecnotrade-theme', newTheme);
        });
    }

    // 3. NAVEGACIÓN ESTILO SPA (TRANSICIONES SUAVES)
    document.querySelectorAll('.core-spa-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (systemLoader) {
                systemLoader.style.backgroundColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#030509' : '#f5f5f7'; 
                systemLoader.style.opacity = '1'; 
            }
            
            // Retraso exacto para dar tiempo a la animación antes de cambiar de HTML
            setTimeout(() => { window.location.assign(target); }, 420); 
        });
    });

    // 4. MOTOR DE SCROLL (BLUR PROGRESIVO)
    let latestScrollY = 0;
    let ticking = false;

    function updateBackgroundBlur(scrollPos) {
        const maxBlur = 15; 
        const sensitivity = 0.05; 
        const calculatedBlur = Math.min(scrollPos * sensitivity, maxBlur);
        document.documentElement.style.setProperty('--scroll-blur', `${calculatedBlur}px`);
    }

    window.addEventListener('scroll', () => {
        latestScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateBackgroundBlur(latestScrollY);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});
