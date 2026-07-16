/**
 * LÓGICA LOCAL DE INICIO - TecnoTrade
 * Gestiona el menú lateral, el motor de búsqueda del catálogo y temporizadores.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MENÚ LATERAL (SIDEBAR)
    // ==========================================
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        if(sidebarMenu) sidebarMenu.classList.add('active');
        if(sidebarOverlay) sidebarOverlay.classList.add('active');
    }

    function closeSidebar() {
        if(sidebarMenu) sidebarMenu.classList.remove('active');
        if(sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    if(openMenuBtn) openMenuBtn.addEventListener('click', openSidebar);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeSidebar);
    if(sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // ==========================================
    // 2. BUSCADOR INTERACTIVO EN VIVO
    // ==========================================
    const tecnotradeInventoryDatabase = [
        { name: "Samsung Galaxy Series", id: "android-samsung" },
        { name: "Honor Multi-Brand", id: "android-honor" },
        { name: "Xiaomi", id: "android-xiaomi" },
        { name: "Google Pixel", id: "android-pixel" },
        { name: "Redmi Note", id: "android-redmi" },
        { name: "iPhone 17", id: "iphone-17" },
        { name: "iPhone 17 Plus", id: "iphone-17-plus" },
        { name: "iPhone 17 Pro", id: "iphone-17-pro" },
        { name: "iPhone 17 Pro Max", id: "iphone-17-pro-max" },
        { name: "iPhone 16", id: "iphone-16" },
        { name: "iPhone 16 Plus", id: "iphone-16-plus" },
        { name: "iPhone 16 Pro", id: "iphone-16-pro" },
        { name: "iPhone 16 Pro Max", id: "iphone-16-pro-max" },
        { name: "iPhone 15", id: "iphone-15" },
        { name: "iPhone 15 Plus", id: "iphone-15-plus" },
        { name: "iPhone 15 Pro", id: "iphone-15-pro" },
        { name: "iPhone 15 Pro Max", id: "iphone-15-pro-max" },
        { name: "iPhone 14", id: "iphone-14" },
        { name: "iPhone 14 Plus", id: "iphone-14-plus" },
        { name: "iPhone 14 Pro", id: "iphone-14-pro" },
        { name: "iPhone 14 Pro Max", id: "iphone-14-pro-max" },
        { name: "iPhone 13 Mini", id: "iphone-13-mini" },
        { name: "iPhone 13", id: "iphone-13" },
        { name: "iPhone 13 Pro", id: "iphone-13-pro" },
        { name: "iPhone 13 Pro Max", id: "iphone-13-pro-max" },
        { name: "iPhone 12 Mini", id: "iphone-12-mini" },
        { name: "iPhone 12", id: "iphone-12" },
        { name: "iPhone 12 Pro", id: "iphone-12-pro" },
        { name: "iPhone 12 Pro Max", id: "iphone-12-pro-max" },
        { name: "iPhone 11", id: "iphone-11" },
        { name: "iPhone 11 Pro", id: "iphone-11-pro" },
        { name: "iPhone 11 Pro Max", id: "iphone-11-pro-max" },
        { name: "iPhone X", id: "iphone-x" },
        { name: "iPhone XR", id: "iphone-xr" },
        { name: "iPhone XS", id: "iphone-xs" },
        { name: "iPhone XS Max", id: "iphone-xs-max" }
    ];

    const coreSearchInput = document.getElementById('mainCoreSearch');
    const searchDropdownEngine = document.getElementById('searchDropdownEngine');
    const transitionOverlayFrame = document.getElementById('globalPageLoader');

    if(coreSearchInput && searchDropdownEngine) {
        coreSearchInput.addEventListener('input', function() {
            const dataStringQuery = this.value.toLowerCase().trim();
            searchDropdownEngine.innerHTML = ''; 

            if (dataStringQuery.length > 0) {
                const searchMatchesFiltered = tecnotradeInventoryDatabase.filter(inventoryItem => 
                    inventoryItem.name.toLowerCase().includes(dataStringQuery)
                );

                if (searchMatchesFiltered.length > 0) {
                    searchDropdownEngine.style.display = 'block'; 
                    
                    searchMatchesFiltered.forEach(matchedItem => {
                        const suggestionRowNode = document.createElement('div');
                        suggestionRowNode.className = 'search-row-item';
                        suggestionRowNode.innerHTML = `<span>${matchedItem.name}</span> <span class="search-row-item-arrow">▶</span>`;
                        
                        suggestionRowNode.onclick = function() {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            if(transitionOverlayFrame) {
                                transitionOverlayFrame.style.backgroundColor = isDark ? '#030509' : '#ffffff';
                                transitionOverlayFrame.style.opacity = '1';
                            }
                            setTimeout(() => { 
                                window.location.assign(`catalogo.html#${matchedItem.id}`); 
                            }, 420);
                        };
                        searchDropdownEngine.appendChild(suggestionRowNode);
                    });
                } else {
                    searchDropdownEngine.style.display = 'block';
                    searchDropdownEngine.innerHTML = `<div class="search-row-item" style="color: var(--text-secondary); justify-content: center; font-weight: 500;">No se encontraron coincidencias</div>`;
                }
            } else {
                searchDropdownEngine.style.display = 'none';
            }
        });

        document.addEventListener('click', function(clickEventInterceptor) {
            if (!coreSearchInput.contains(clickEventInterceptor.target) && !searchDropdownEngine.contains(clickEventInterceptor.target)) {
                searchDropdownEngine.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 3. RELOJ PROMOCIONAL DINÁMICO
    // ==========================================
    function initializingPromoTimer() {
        const timerElement = document.getElementById("promoTimer");
        if(!timerElement) return;

        const currentServerDate = new Date();
        const targetDeadlineLimit = new Date();
        
        targetDeadlineLimit.setDate(currentServerDate.getDate() + 2);
        targetDeadlineLimit.setHours(23, 59, 59, 0);

        function executionUpdateClock() {
            const liveCurrentTime = new Date().getTime();
            const totalDistanceDifference = targetDeadlineLimit.getTime() - liveCurrentTime;

            if (totalDistanceDifference < 0) {
                timerElement.innerHTML = "EXPIRADO";
                return;
            }

            const calculatedHours = Math.floor((totalDistanceDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const calculatedMinutes = Math.floor((totalDistanceDifference % (1000 * 60 * 60)) / (1000 * 60));
            const calculatedSeconds = Math.floor((totalDistanceDifference % (1000 * 60)) / 1000);

            timerElement.innerHTML = `${calculatedHours.toString().padStart(2, '0')}h : ${calculatedMinutes.toString().padStart(2, '0')}m : <span>${calculatedSeconds.toString().padStart(2, '0')}s</span>`;
        }

        executionUpdateClock();
        setInterval(executionUpdateClock, 1000);
    }
    
    initializingPromoTimer();
});
