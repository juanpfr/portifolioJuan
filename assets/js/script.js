// Meu script

// Aviso
window.alert("Para ter uma melhor experiência, acesse o site pelo computador.")

// Breakpoint para desativar animações
const mediaQuery = window.matchMedia("(max-width: 768px)");

function disableAnimations() {
    // Desativar scroll suave
    window.removeEventListener("scroll", handleScrollEvents);

    // Desativar clique no scroll-indicator
    scrollIndicator?.removeEventListener("click", handleScrollClick);

    // Parar observadores e exibir texto direto
    textsToAnimate.forEach(textElement => {
        observer.unobserve(textElement);
        textElement.style.visibility = "visible"; // Mantém o texto visível sem animação
        clearInterval(typeTextInterval);
    });
}

function enableAnimations() {
    // Scroll suave
    window.addEventListener("scroll", handleScrollEvents);

    // Indicador de scroll
    scrollIndicator?.addEventListener("click", handleScrollClick);

    // Ativar animação de digitação
    textsToAnimate.forEach(textElement => observer.observe(textElement));
}

function handleScrollEvents() {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            currentSection = index;
        }
    });
}

function handleScrollClick() {
    window.scrollTo({
        top: heroSection.offsetHeight,
        behavior: "smooth"
    });
}

function handleMediaChange() {
    if (mediaQuery.matches) {
        disableAnimations();
    } else {
        enableAnimations();
    }
}

// Selecionar elementos relevantes
const sections = document.querySelectorAll("section");
const scrollIndicator = document.querySelector(".scroll-indicator");
const heroSection = document.querySelector(".hero-section");
const textsToAnimate = document.querySelectorAll("[data-animate]");
let currentSection = 0;
let typeTextInterval;
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent.trim();
            element.textContent = "";
            element.style.visibility = "visible";
            let index = 0;
            typeTextInterval = setInterval(() => {
                element.textContent += text[index++];
                if (index === text.length) clearInterval(typeTextInterval);
            }, 7);
            observer.unobserve(element);
        }
    });
});

// Ativa a função na inicialização e ao mudar o tamanho da tela
mediaQuery.addEventListener("change", handleMediaChange);
document.addEventListener("DOMContentLoaded", handleMediaChange);
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