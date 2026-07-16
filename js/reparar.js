/**
 * LÓGICA LOCAL DE SERVICIO TÉCNICO - TecnoTrade
 * Este archivo se carga en reparar.html.
 * (La mayoría de la UI está manejada por core.js)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Aquí podemos añadir micro-animaciones en el futuro si TechExchange PTY 
    // decide implementar algo como un cotizador interactivo dentro de esta vista.
    
    console.log("🛠️ Módulo de Servicio Técnico inicializado correctamente.");
    
    // Ejemplo de animación suave al cargar las tarjetas
    const cards = document.querySelectorAll('.matrix-glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Removemos la transición inline para que el CSS en :hover vuelva a funcionar
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        }, 100 * index);
    });

});
