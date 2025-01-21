let isScrolling = false;

// Funcionalidade do scroll suave ao usar a roda do mouse
document.querySelector('main').addEventListener('wheel', function (e) {
    if (isScrolling) return; // Impede múltiplos scrolls simultâneos

    isScrolling = true;
    let sections = document.querySelectorAll('.section');
    let currentSection = getCurrentSection(sections);

    if (e.deltaY > 0) {
        // Scroll para baixo
        if (currentSection < sections.length - 1) {
            scrollToSection(sections[currentSection + 1]);
        }
    } else {
        // Scroll para cima
        if (currentSection > 0) {
            scrollToSection(sections[currentSection - 1]);
        }
    }

    setTimeout(() => {
        isScrolling = false;
    }, 800); // Tempo de espera entre os scrolls para suavizar a transição
});

// Função para obter a seção atual visível
function getCurrentSection(sections) {
    let currentSection = 0;
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= 0) {
            currentSection = index;
        }
    });
    return currentSection;
}

// Função para rolar suavemente até a seção desejada
function scrollToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Adicionando scroll suave também nos links do menu
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});