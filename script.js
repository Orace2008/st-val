/**
 * L'ÉTERNELLE LETTRE - VERSION FINALE
 * Saint-Valentin 2026 - Toni & Baké
 */

const LoveLetterApp = (() => {
    'use strict';

    // État de l'application
    const state = {
        authorName: 'Toni',
        authorGender: 'homme',
        lovedName: 'Baké',
        lovedGender: 'femme',
        deepMessage: 'Mon amour pour toi est infini, comme les étoiles dans le ciel. Chaque jour à tes côtés est un cadeau précieux.',
        specialDate: '2026-02-14',
        favoriteMemory: 'Notre premier regard',
        photoPreview: null,
        isGenerated: true
    };

    // Messages Love Love
    const loveMessages = [
        "L'amour est l'infini à portée de cœur",
        "Je t'aime pour l'éternité",
        "Mon cœur est à toi pour toujours",
        "Tu es mon hier, aujourd'hui et demain",
        "Notre amour est éternel",
        "Chaque instant avec toi est un cadeau",
        "Toi et moi, pour la vie",
        "L'amour est la plus belle des aventures",
        "Mon amour pour toi grandit chaque jour",
        "Tu es la plus belle personne de ma vie"
    ];

    // Banque de phrases pour l'acrostiche
    const acrostichePhrases = {
        'B': [
            "aissée de ta présence chaque jour",
            "onheur infini à tes côtés",
            "elle est mon rayon de soleil",
            "onjour à la vie depuis que tu es là",
            "elle est ma raison de sourire"
        ],
        'A': [
            "vec toi, la vie est plus belle",
            "mour sincère et pur",
            "ttentionnée et douce",
            "ujourd'hui et pour toujours",
            "llez, viens, on s'aime"
        ],
        'K': [
            "érosène dans mon cœur pour toujours",
            "elle est unique à mes yeux",
            "esse de vivre à tes côtés",
            "i toi, je ne serais rien",
            "ère, comme la lumière du soleil"
        ],
        'É': [
            "ternellement reconnaissant de t'avoir",
            "toile qui guide ma vie",
            "crire ton nom dans le ciel",
            "merveilleuse chaque jour",
            "clat de rire qui me fait vibrer"
        ],
        'default': [
            "aime chaque instant passé avec toi",
            "merveilleuse personne",
            "amour de ma vie",
            "tendre et passionnée",
            "magine ma vie sans toi, impossible"
        ]
    };

    // Éléments DOM
    const DOM = {
        // Formulaire
        authorName: document.getElementById('authorName'),
        authorGender: document.getElementById('authorGender'),
        lovedName: document.getElementById('lovedName'),
        lovedGender: document.getElementById('lovedGender'),
        deepMessage: document.getElementById('deepMessage'),
        specialDate: document.getElementById('specialDate'),
        favoriteMemory: document.getElementById('favoriteMemory'),
        uploadArea: document.getElementById('uploadArea'),
        photoUpload: document.getElementById('photoUpload'),
        uploadPreview: document.getElementById('uploadPreview'),
        generateBtn: document.getElementById('generateBtn'),
        
        // Carte
        cardPhoto: document.getElementById('cardPhoto'),
        photoPlaceholder: document.getElementById('photoPlaceholder'),
        authorNameDisplay: document.getElementById('authorNameDisplay'),
        lovedNameDisplay: document.getElementById('lovedNameDisplay'),
        cardDateDisplay: document.getElementById('cardDateDisplay'),
        acrosticheContainer: document.getElementById('acrosticheContainer'),
        personalMessageDisplay: document.getElementById('personalMessageDisplay'),
        memoryDisplay: document.getElementById('memoryDisplay'),
        memorySection: document.getElementById('memorySection'),
        loveLoveDisplay: document.getElementById('loveLoveDisplay'),
        
        // Boutons
        downloadBtn: document.getElementById('downloadBtn'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        nav: document.getElementById('nav'),
        
        // Modals
        loaderModal: document.getElementById('loaderModal'),
        successModal: document.getElementById('successModal'),
        closeSuccessBtn: document.getElementById('closeSuccessModal'),
        
        // Autres
        floatingHearts: document.getElementById('floatingHearts'),
        form: document.getElementById('loveForm')
    };

    // Initialisation
    const init = () => {
        console.log('❤️ Application démarrée - Version finale');
        
        if (!checkElements()) return;
        
        createFloatingHearts();
        createParticles();
        setupEventListeners();
        
        // Générer l'acrostiche initial pour Baké
        generateAcrostiche('BAKÉ');
        
        // Mettre à jour tous les affichages
        updateAllDisplays();
        
        // Activer le bouton de téléchargement
        if (DOM.downloadBtn) DOM.downloadBtn.disabled = false;
    };

    // Vérifier que tous les éléments existent
    const checkElements = () => {
        const required = ['authorName', 'lovedName', 'acrosticheContainer'];
        let allGood = true;
        
        required.forEach(el => {
            if (!DOM[el]) {
                console.error(`Élément manquant: ${el}`);
                allGood = false;
            }
        });
        
        return allGood;
    };

    // Mettre à jour tous les affichages
    const updateAllDisplays = () => {
        if (DOM.authorNameDisplay) 
            DOM.authorNameDisplay.textContent = state.authorName;
        
        if (DOM.lovedNameDisplay) 
            DOM.lovedNameDisplay.textContent = state.lovedName;
        
        if (DOM.personalMessageDisplay) 
            DOM.personalMessageDisplay.textContent = state.deepMessage;
        
        if (DOM.memoryDisplay) 
            DOM.memoryDisplay.innerHTML = `<i class="fas fa-star"></i> ${state.favoriteMemory}`;
        
        updateDateDisplay();
    };

    // Gestionnaires d'événements
    const setupEventListeners = () => {
        // Formulaire - changements en temps réel
        if (DOM.authorName) {
            DOM.authorName.addEventListener('input', (e) => {
                state.authorName = e.target.value || 'Toni';
                if (DOM.authorNameDisplay) 
                    DOM.authorNameDisplay.textContent = state.authorName;
            });
        }
        
        if (DOM.lovedName) {
            DOM.lovedName.addEventListener('input', (e) => {
                state.lovedName = e.target.value || 'Baké';
                if (DOM.lovedNameDisplay) 
                    DOM.lovedNameDisplay.textContent = state.lovedName;
                
                // Régénérer l'acrostiche avec le nouveau prénom
                const cleanName = state.lovedName
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase();
                generateAcrostiche(cleanName);
            });
        }
        
        if (DOM.deepMessage) {
            DOM.deepMessage.addEventListener('input', (e) => {
                state.deepMessage = e.target.value || '';
                if (DOM.personalMessageDisplay) 
                    DOM.personalMessageDisplay.textContent = state.deepMessage;
            });
        }
        
        if (DOM.favoriteMemory) {
            DOM.favoriteMemory.addEventListener('input', (e) => {
                state.favoriteMemory = e.target.value || '';
                if (DOM.memoryDisplay) {
                    if (state.favoriteMemory) {
                        DOM.memoryDisplay.innerHTML = `<i class="fas fa-star"></i> ${state.favoriteMemory}`;
                        DOM.memorySection.style.display = 'block';
                    } else {
                        DOM.memorySection.style.display = 'none';
                    }
                }
            });
        }
        
        if (DOM.specialDate) {
            DOM.specialDate.addEventListener('change', (e) => {
                state.specialDate = e.target.value;
                updateDateDisplay();
            });
        }
        
        // Upload photo
        if (DOM.uploadArea && DOM.photoUpload) {
            DOM.uploadArea.addEventListener('click', () => DOM.photoUpload.click());
            DOM.uploadArea.addEventListener('dragover', (e) => e.preventDefault());
            DOM.uploadArea.addEventListener('drop', handleDrop);
            DOM.photoUpload.addEventListener('change', handleFileSelect);
        }
        
        // Formulaire submit
        if (DOM.form) {
            DOM.form.addEventListener('submit', handleFormSubmit);
        }
        
        // Téléchargement
        if (DOM.downloadBtn) {
            DOM.downloadBtn.addEventListener('click', handleDownload);
        }
        
        // Menu mobile
        if (DOM.mobileMenuBtn && DOM.nav) {
            DOM.mobileMenuBtn.addEventListener('click', () => {
                DOM.nav.classList.toggle('active');
            });
        }
        
        // Fermer les modals
        if (DOM.closeSuccessBtn) {
            DOM.closeSuccessBtn.addEventListener('click', () => {
                DOM.successModal.classList.remove('active');
            });
        }
        
        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (DOM.nav) DOM.nav.classList.remove('active');
            });
        });
        
        // Scroll doux pour le bouton hero
        const scrollBtn = document.querySelector('.hero-scroll');
        if (scrollBtn) {
            scrollBtn.addEventListener('click', () => {
                document.getElementById('create').scrollIntoView({ behavior: 'smooth' });
            });
        }
    };

    // Gestionnaires d'upload
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            processImage(file);
        }
    };

    const processImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            state.photoPreview = e.target.result;
            
            if (DOM.uploadPreview) {
                DOM.uploadPreview.innerHTML = `<img src="${state.photoPreview}" alt="Preview">`;
                DOM.uploadArea.classList.add('has-image');
            }
            
            if (DOM.cardPhoto) {
                DOM.cardPhoto.src = state.photoPreview;
                DOM.cardPhoto.classList.remove('hidden');
            }
            
            if (DOM.photoPlaceholder) {
                DOM.photoPlaceholder.classList.add('hidden');
            }
        };
        reader.readAsDataURL(file);
    };

    // Générer l'acrostiche
    const generateAcrostiche = (name) => {
        if (!DOM.acrosticheContainer) return;
        
        const letters = name.split('');
        let html = '';
        
        letters.forEach((letter, index) => {
            // Prendre une phrase dans la banque correspondant à la lettre
            const phrases = acrostichePhrases[letter] || acrostichePhrases['default'];
            const phraseIndex = index % phrases.length;
            let phrase = phrases[phraseIndex];
            
            // Adapter selon le genre
            if (DOM.lovedGender && DOM.lovedGender.value === 'homme') {
                phrase = phrase
                    .replace('elle est', 'il est')
                    .replace('attentionnée', 'attentionné')
                    .replace('douce', 'doux')
                    .replace('merveilleuse', 'merveilleux')
                    .replace('belle', 'beau');
            }
            
            html += `
                <div class="acrostiche-line">
                    <span class="acrostiche-letter">${letter}</span>
                    <span class="acrostiche-phrase">${phrase}</span>
                </div>
            `;
        });
        
        DOM.acrosticheContainer.innerHTML = html;
    };

    // Mettre à jour l'affichage de la date
    const updateDateDisplay = () => {
        if (!DOM.cardDateDisplay) return;
        
        if (state.specialDate) {
            const date = new Date(state.specialDate);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            DOM.cardDateDisplay.textContent = date.toLocaleDateString('fr-FR', options);
        }
    };

    // Gestionnaire de soumission du formulaire
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Afficher le loader
        if (DOM.loaderModal) {
            DOM.loaderModal.classList.add('active');
        }
        
        setTimeout(() => {
            // Cacher le loader
            if (DOM.loaderModal) {
                DOM.loaderModal.classList.remove('active');
            }
            
            // Mettre à jour l'acrostiche
            const cleanName = state.lovedName
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase();
            generateAcrostiche(cleanName);
            
            // Changer le message Love Love
            if (DOM.loveLoveDisplay) {
                const randomIndex = Math.floor(Math.random() * loveMessages.length);
                DOM.loveLoveDisplay.textContent = loveMessages[randomIndex];
            }
            
            // Afficher le modal de succès
            if (DOM.successModal) {
                DOM.successModal.classList.add('active');
            }
            
            // Lancer des confettis
            createConfetti();
            
        }, 1500);
    };

    // Téléchargement HD
    const handleDownload = async () => {
        const card = document.getElementById('loveCard');
        if (!card) return;
        
        try {
            if (DOM.loaderModal) {
                DOM.loaderModal.classList.add('active');
            }
            
            // S'assurer que html2canvas est chargé
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas non chargé');
            }
            
            const canvas = await html2canvas(card, {
                scale: 2,
                backgroundColor: '#ffffff',
                allowTaint: true,
                useCORS: true,
                logging: false
            });
            
            const link = document.createElement('a');
            link.download = `lettre-${state.authorName}-${state.lovedName}-2026.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            if (DOM.loaderModal) {
                DOM.loaderModal.classList.remove('active');
            }
            
            createConfetti();
            
        } catch (error) {
            console.error('Erreur téléchargement:', error);
            if (DOM.loaderModal) {
                DOM.loaderModal.classList.remove('active');
            }
            alert('Vous pouvez faire une capture d\'écran de la carte !');
        }
    };

    // Création des particules
    const createParticles = () => {
        if (!DOM.particles) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: rgba(255, 138, 159, ${Math.random() * 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s linear infinite;
                pointer-events: none;
            `;
            DOM.particles.appendChild(particle);
        }
    };

    // Création des cœurs flottants
    const createFloatingHearts = () => {
        if (!DOM.floatingHearts) return;
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: 110%;
                font-size: ${10 + Math.random() * 20}px;
                opacity: ${0.1 + Math.random() * 0.2};
                animation: float ${5 + Math.random() * 10}s linear infinite;
                pointer-events: none;
                z-index: -1;
            `;
            DOM.floatingHearts.appendChild(heart);
            
            setTimeout(() => heart.remove(), 15000);
        }, 3000);
    };

    // Création des confettis
    const createConfetti = () => {
        const colors = ['#E63946', '#FF8A9F', '#FFB347', '#2A9D8F', '#FFD700'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10%;
                width: ${5 + Math.random() * 8}px;
                height: ${5 + Math.random() * 8}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                opacity: ${0.5 + Math.random() * 0.5};
                transform: rotate(${Math.random() * 360}deg);
                animation: confetti ${2 + Math.random() * 2}s ease-out forwards;
                pointer-events: none;
                z-index: 9999;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    };

    // Retourner l'API publique
    return { init };
})();

// Démarrer l'application au chargement
document.addEventListener('DOMContentLoaded', () => {
    LoveLetterApp.init();
});