/**
 * LÓGICA LOCAL DE VENTAS Y TRADE-IN - TecnoTrade
 * Este archivo se carga en vender.html.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    console.log("💰 Módulo de Ventas y Trade-In inicializado correctamente.");
    
    // Animación de entrada fluida para las tarjetas de ventas
    const cards = document.querySelectorAll('.matrix-glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Liberamos la tarjeta de la transición forzada para que los efectos :hover fluyan en CSS
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        }, 100 * index); // Efecto cascada (stagger)
    });

});
