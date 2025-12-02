// --- MAJ DATE COPYRIGHT --- //
const currentYear = new Date().getFullYear() //
const yearElement =  document.getElementById('copyright-annee')

if (yearElement) {
  yearElement.textContent = currentYear
}



// --- SHOWREEL FULLSCREEN BUTTON --- //



// FULLSCREEN BUTTON
const videoElement = document.getElementById('js-showreel-video');
const fullscreenButton = document.getElementById('js-fullscreen-button');

if (videoElement) {
    
  // Fonction qui réinitialise l'état de la vidéo au mode background
  function resetToBackgroundMode() {
    if (document.fullscreenElement === null) { // VÉRIFICATION : Si le document N'EST PLUS en mode plein écran
      videoElement.controls = false;
      videoElement.muted = true;
      videoElement.play(); 
  }
  }

  // 4. Ajouter l'écouteur pour détecter la sortie du mode plein écran
  // L'événement standard est 'fullscreenchange'
  document.addEventListener('fullscreenchange', resetToBackgroundMode);
  
  // (Ajouter les équivalents avec préfixes pour une meilleure compatibilité)
  document.addEventListener('webkitfullscreenchange', resetToBackgroundMode);
  document.addEventListener('mozfullscreenchange', resetToBackgroundMode);
  document.addEventListener('MSFullscreenChange', resetToBackgroundMode);
  
  // Vérifier si les éléments existent avant de continuer
  if (videoElement && fullscreenButton) {

    function toggleFullscreen() {
  
      // 2. LOGIQUE DU SON : Activer le son de la vidéo
      videoElement.muted = false;
      
      // 3. LOGIQUE DES CONTRÔLES : Afficher les contrôles de lecture/pause
      videoElement.controls = true;

      // 4. LOGIQUE PLEIN ÉCRAN : Demander au navigateur de passer en plein écran
      // C'est une API standard, mais elle nécessite un préfixe pour Safari/Chrome (webkitRequestFullscreen)
      if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) { /* Safari / Chrome */
          videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) { /* IE11 */
          videoElement.msRequestFullscreen();
      }

    }

      // 5. Attacher la fonction au bouton
      // La fonction 'toggleFullscreen' est la callback qui s'exécute 'plus tard' (au clic)
      fullscreenButton.addEventListener('click', toggleFullscreen);
  }
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
