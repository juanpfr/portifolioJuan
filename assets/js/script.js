// Meu script

// Scroll snap suave

// A partir do evento de scroll, você pode adicionar ou remover classes para destacar as seções
const sections = document.querySelectorAll("section");
let currentSection = 0;

window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            currentSection = index;
            // Você pode adicionar aqui qualquer efeito de destaque ou animação nas seções visíveis
        }
    });
});

// Indicador de scroll
document.addEventListener("DOMContentLoaded", () => {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const heroSection = document.querySelector(".hero-section");

    window.addEventListener("scroll", () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        // Se a parte inferior da hero-section estiver acima da tela, esconda a seta
        if (heroBottom <= 0) {
            scrollIndicator.classList.add("hidden");
        } else {
            scrollIndicator.classList.remove("hidden");
        }
    });

    // Adiciona comportamento ao clicar na seta
    scrollIndicator.addEventListener("click", () => {
        window.scrollTo({
            top: heroSection.offsetHeight,
            behavior: "smooth",
        });
    });
});

// Animação de digitação no parágrafo do sobre
document.addEventListener("DOMContentLoaded", () => {
    const textsToAnimate = document.querySelectorAll("[data-animate]");

    const typeText = (element, text, speed = 15) => {
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
                typeText(element, text, 7); // Ajuste a velocidade de digitação aqui
                observer.unobserve(element); // Para de observar após animar
            }
        });
    });

    textsToAnimate.forEach((textElement) => observer.observe(textElement));
});

// Pop up dos projetos

function openModal(title, description, image, deployLink, githubLink) {
    // Atualiza o conteúdo do modal com as informações do projeto
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalImage").alt = "Imagem do " + title;
    
    // Exibe ou esconde os botões conforme a presença dos links
    const deployButton = document.querySelector(".modal .deploy");
    const githubButton = document.querySelector(".modal .github");

    // Se o link de Deploy estiver vazio, oculta o botão Deploy
    if (deployLink) {
        deployButton.href = deployLink;
        deployButton.style.display = "inline-block"; // Exibe o botão
    } else {
        deployButton.style.display = "none"; // Oculta o botão
    }

    // Se o link de GitHub estiver vazio, oculta o botão GitHub
    if (githubLink) {
        githubButton.href = githubLink;
        githubButton.style.display = "inline-block"; // Exibe o botão
    } else {
        githubButton.style.display = "none"; // Oculta o botão
    }

    // Exibe o modal
    const modal = document.getElementById("projectModal");
    modal.style.display = "block";
}

function closeModal() {
    // Fecha o modal
    const modal = document.getElementById("projectModal");
    modal.style.display = "none";
}