// --- MAJ DATE COPYRIGHT --- //
const currentYear = new Date().getFullYear()
const yearElement =  document.getElementById('copyright-annee')

if (yearElement) {
  yearElement.textContent = currentYear
}

// --- MENU MOBILE LOGIC --- //
// ... (GARDE TOUT LE CODE DU MENU MOBILE INCHANGÉ) ...
const hamburgerBtn = document.getElementById('js-mobile-menu-toggle');
// ...


// --- BACK TO TOP BUTTON LOGIC --- //
// ... (GARDE TOUT LE CODE BACK TO TOP INCHANGÉ) ...


// --- WORKS TABS LOGIC --- //
// ... (GARDE TOUT LE CODE DES TABS INCHANGÉ) ...


/// --- LOGIQUE SHOWREEL FULLSCREEN (OVERLAY VIMEO) ---

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.querySelector('.open-showreel');
    const closeBtn = document.querySelector('.close-showreel');
    const overlay = document.getElementById('showreel-overlay');
    const videoContainer = document.querySelector('.showreel-video-container');
    
    // 1. CIBLER LA VIDÉO D'ARRIÈRE-PLAN
    const bgVideo = document.getElementById('js-showreel-video');
    
    const showreelCard = document.querySelector('.home-showreel'); 

    if (openBtn && overlay && showreelCard) {
        
        // --- OUVERTURE ---
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const vimeoId = showreelCard.getAttribute('data-video-id');
            if (!vimeoId) return;

            // Pause de la vidéo de fond pour économiser les perfs
            if (bgVideo) bgVideo.pause();

            const iframeSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=0`;
            const iframeHTML = `<iframe src="${iframeSrc}" 
                                        frameborder="0" 
                                        allow="autoplay; fullscreen; picture-in-picture" 
                                        allowfullscreen>
                                </iframe>`;

            videoContainer.innerHTML = iframeHTML;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // --- FERMETURE (Fonction commune) ---
        const closeOverlay = () => {
            overlay.classList.remove('active');
            videoContainer.innerHTML = ''; // Coupe la vidéo Vimeo
            document.body.style.overflow = '';
            
            // Relance la vidéo de fond
            if (bgVideo) bgVideo.play();
        };

        // Clic sur la croix
        closeBtn.addEventListener('click', closeOverlay);
        
        // Touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeOverlay();
            }
        });
    }
});