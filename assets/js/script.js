// Meu script

// Animação de digitação no parágrafo do sobre
document.addEventListener("DOMContentLoaded", () => {
    const textsToAnimate = document.querySelectorAll("[data-animate]");

    const typeText = (element, text, speed = 20) => {
        let index = 0;
        const interval = setInterval(() => {
            element.textContent += text[index];
            index++;
            if (index === text.length) {
                clearInterval(interval); // Para a animação ao final
            }
        }, speed);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent.trim();
                element.textContent = ""; // Limpa o texto antes de animar
                element.style.visibility = "visible"; // Torna o texto visível
                typeText(element, text);
                observer.unobserve(element); // Para de observar após animar
            }
        });
    });

    textsToAnimate.forEach((textElement) => observer.observe(textElement));
});