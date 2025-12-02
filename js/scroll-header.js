/**
 * Logique du Header Furtif : 
 * Fait disparaître le header au scroll vers le bas et le réapparaître au scroll vers le haut.
 */

// 1. Variable de MEMOIRE : Stocke la position verticale précédente du défilement.
// C'est la clé pour savoir si l'utilisateur scroll vers le haut ou vers le bas.
let lastScrollY = 0; 

// 2. Sélection de l'élément DOM : Trouver le header par sa classe CSS.
const header = document.querySelector('.header-container');

// 3. Point de lancement conditionnel
if (header) {
    
    // Fonction de rappel qui sera exécutée à chaque événement 'scroll'
    function controlHeader() {
        // Position verticale actuelle du défilement
        const currentScrollY = window.scrollY;
        
        // La marge de 100px permet d'éviter que le header ne clignote en haut de page.
        if (currentScrollY > 100) {
            
            // SCROLL VERS LE BAS (current position > last position)
            if (currentScrollY > lastScrollY) {
                // Ajoute la classe CSS (.header-cache) pour déclencher l'animation de masquage
                header.classList.add('js-hidden-header');
            } 
            
            // SCROLL VERS LE HAUT (current position < last position)
            else if (currentScrollY < lastScrollY) {
                // Retire la classe CSS pour faire réapparaître le header
                header.classList.remove('js-hidden-header');
            }
        } 
        
        // Cas spécial : si on est tout en haut (position 0), on s'assure qu'il est visible
        if (currentScrollY <= 0) {
             header.classList.remove('js-hidden-header');
        }

        // METTRE À JOUR LA MÉMOIRE : Stocke la position actuelle pour la prochaine comparaison
        lastScrollY = currentScrollY;
    }

    // 4. Attacher la fonction de contrôle à l'événement de défilement de la fenêtre
    window.addEventListener('scroll', controlHeader);
}