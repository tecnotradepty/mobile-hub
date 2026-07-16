/**
 * LÓGICA LOCAL DEL CATÁLOGO - TecnoTrade
 * Gestiona el efecto magnético, scroll reveal, ordenamiento y resaltado del buscador.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. EFECTO MAGNÉTICO (SPOTLIGHT)
    // ==========================================
    document.querySelectorAll('.matrix-glass-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pasamos las coordenadas exactas del mouse a CSS
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // 2. ANIMACIÓN DE APARICIÓN (SCROLL REVEAL)
    // ==========================================
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Dejamos de observarlo para que no se anime dos veces
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-hidden').forEach(el => scrollObserver.observe(el));

    // ==========================================
    // 3. ORGANIZADOR DE SERIES (BOTÓN DE ORDEN)
    // ==========================================
    const sortBtn = document.getElementById('sortGridBtn');
    const gridContainer = document.getElementById('catalogGrid');
    let isDescending = true; 

    if (sortBtn && gridContainer) {
        sortBtn.addEventListener('click', () => {
            isDescending = !isDescending;
            const spanText = sortBtn.querySelector('span');
            
            if(isDescending) {
                sortBtn.classList.remove('asc');
                spanText.textContent = 'Ordenar: Mayor a Menor';
            } else {
                sortBtn.classList.add('asc');
                spanText.textContent = 'Ordenar: Menor a Mayor';
            }

            let cardsArray = Array.from(gridContainer.querySelectorAll('.matrix-glass-card'));
            
            // Ordenamos leyendo el data-tier del HTML
            cardsArray.sort((a, b) => {
                const tierA = parseInt(a.getAttribute('data-tier'));
                const tierB = parseInt(b.getAttribute('data-tier'));
                return isDescending ? tierB - tierA : tierA - tierB;
            });

            // Re-renderizamos con una mini animación en cascada
            cardsArray.forEach((card, index) => {
                card.style.transition = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                gridContainer.appendChild(card);
                
                setTimeout(() => {
                    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, box-shadow 0.4s ease, background 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * index);
            });
        });
    }

    // ==========================================
    // 4. EFECTO DE RESALTADO DEL BUSCADOR (HASH)
    // ==========================================
    const urlHash = window.location.hash.substring(1);
    if(urlHash) {
        const targetElement = document.getElementById(urlHash);
        if(targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetElement.classList.add('highlight-target');
                setTimeout(() => {
                    targetElement.classList.remove('highlight-target');
                    // Limpiamos la URL para no repetir la animación si recarga la página
                    history.replaceState(null, null, ' ');
                }, 4000);
            }, 600); 
        }
    }

    // ==========================================
    // 5. RELOJ PROMOCIONAL (LOCAL)
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
