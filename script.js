document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os sliders da página
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(sliderContainer => {
        const afterImage = sliderContainer.querySelector('.after-image');
        const sliderHandle = sliderContainer.querySelector('.slider-handle');
        
        let isDragging = false;
        
        const updateSlider = (x) => {
            const containerRect = sliderContainer.getBoundingClientRect();
            const percentage = ((x - containerRect.left) / containerRect.width) * 100;
            
            // Limita o percentual entre 0 e 100
            const clampedPercentage = Math.max(0, Math.min(percentage, 100));
            
            afterImage.style.clipPath = `polygon(0 0, ${clampedPercentage}% 0, ${clampedPercentage}% 100%, 0 100%)`;
            sliderHandle.style.left = `${clampedPercentage}%`;
        };
        
        // Eventos de mouse
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Eventos de toque para dispositivos móveis
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Adiciona evento de clique no container para atualizar o slider
        sliderContainer.addEventListener('click', (e) => {
            updateSlider(e.clientX);
        });
    });
    
    // Rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});




 
    // Adiciona funcionalidade para os botões de mostrar/ocultar
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Encontra o conteúdo oculto relacionado a este botão
            const hiddenContent = this.previousElementSibling;
            
            // Alterna a visibilidade do conteúdo
            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                hiddenContent.style.display = 'block';
                this.textContent = 'Ver menos';
            } else {
                hiddenContent.style.display = 'none';
                this.textContent = 'Ver mais';
            }
        });
    });
    
    // Inicialmente esconde todo o conteúdo oculto
    document.querySelectorAll('.hidden-content').forEach(content => {
        content.style.display = 'none';
    });