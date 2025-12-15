// --- MAJ DATE COPYRIGHT --- //
const currentYear = new Date().getFullYear()
const yearElement =  document.getElementById('copyright-annee')

if (yearElement) {
  yearElement.textContent = currentYear
}
// --- MENU MOBILE LOGIC --- //

const hamburgerBtn = document.getElementById('js-mobile-menu-toggle');
const closeBtn = document.getElementById('js-mobile-menu-close');
const menuOverlay = document.getElementById('js-menu-overlay');
const body = document.body;

// Fonction pour OUVRIR le menu
function openMenu() {
    if (menuOverlay) {
        menuOverlay.classList.add('is-open'); // Affiche le menu (CSS display: flex)
        body.style.overflow = 'hidden'; // Désactive le scroll de la page
        body.classList.add('no-scroll'); // Utile si on veut styliser d'autres éléments
    }
}

// Fonction pour FERMER le menu
function closeMenu() {
    if (menuOverlay) {
        menuOverlay.classList.remove('is-open'); // Cache le menu
        body.style.overflow = ''; // Réactive le scroll (remet la valeur par défaut)
        body.classList.remove('no-scroll');
    }
}

// Écouteurs d'événements (Clicks)
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMenu);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
}

// BONUS : Fermer le menu si on clique sur un lien (pour aller vers une ancre par exemple)
const menuLinks = document.querySelectorAll('.main-menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});


// --- BACK TO TOP BUTTON LOGIC --- //

const backToTopButton = document.getElementById('js-back-to-top');
const scrollThreshold = 400; // Distance en pixels à partir de laquelle le bouton apparaît

if (backToTopButton) {

    // 1. Fonction de contrôle
    function checkScrollPosition() {
        // window.scrollY est la position actuelle du défilement vertical
        if (window.scrollY > scrollThreshold) {
            // Si on a scrollé plus que le seuil, on ajoute la classe (rend visible)
            backToTopButton.classList.add('is-visible');
        } else {
            // Sinon, on retire la classe (rend invisible)
            backToTopButton.classList.remove('is-visible');
        }
    }

    // 2. Attacher la fonction à l'événement de défilement de la fenêtre
    window.addEventListener('scroll', checkScrollPosition);
}


// --- WORKS TABS LOGIC --- //

const filterButtons = document.querySelectorAll('.filter-btn');
const workCategories = document.querySelectorAll('.works-category');

if (filterButtons.length > 0) {
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      
      // 1. Retirer la classe 'active' de tous les boutons
      filterButtons.forEach(b => b.classList.remove('active'));
      
      // 2. Ajouter la classe 'active' au bouton cliqué
      btn.classList.add('active');
      
      // 3. Récupérer la cible (ex: 'video-games') via l'attribut data-target
      const targetId = btn.getAttribute('data-target');
      
      // 4. Masquer toutes les catégories
      workCategories.forEach(cat => cat.classList.remove('active'));
      
      // 5. Afficher la catégorie correspondante
      const targetCategory = document.getElementById(targetId);
      if (targetCategory) {
        targetCategory.classList.add('active');
      }
      
    });
  });
}



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