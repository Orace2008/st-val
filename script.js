/**
 * L'ÉTERNELLE LETTRE - SCRIPT PRINCIPAL
 * Saint-Valentin 2026
 */

const LoveLetterApp = (() => {
    'use strict';

    // État de l'application
    const state = {
        authorName: 'Toni',
        authorGender: 'homme',
        lovedName: 'Baké',
        lovedGender: 'femme',
        deepMessage: 'Mon amour pour toi est infini, comme les étoiles dans le ciel. Chaque jour à tes côtés est un cadeau précieux.\n\nJe me souviens de notre première rencontre, de ton sourire qui a illuminé ma vie. Depuis ce jour, mon cœur n\'appartient qu\'à toi.\n\nLes moments passés ensemble sont les plus beaux de mon existence. Ta douceur, ta gentillesse, ta beauté intérieure et extérieure me rendent chaque jour plus amoureux.\n\nJe t\'aime plus que tout au monde, et je veux passer le reste de ma vie à te le prouver.',
        specialDate: '2026-02-14',
        favoriteMemory: 'Notre premier regard',
        photoPreview: null,
        loveLoveMessage: "L'amour est l'infini à portée de cœur"
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
        
        // Document - Page 1
        coverAuthorName: document.getElementById('coverAuthorName'),
        coverLovedName: document.getElementById('coverLovedName'),
        coverDate: document.getElementById('coverDate'),
        
        // Document - Page 2
        docAuthorNameLarge: document.getElementById('docAuthorNameLarge'),
        docLovedNameLarge: document.getElementById('docLovedNameLarge'),
        docMemoryLarge: document.getElementById('docMemoryLarge'),
        docPhotoLarge: document.getElementById('docPhotoLarge'),
        docPhotoPlaceholderLarge: document.getElementById('docPhotoPlaceholderLarge'),
        
        // Document - Page 3
        acrosticheLovedNameLarge: document.getElementById('acrosticheLovedNameLarge'),
        acrosticheContainerLarge: document.getElementById('acrosticheContainerLarge'),
        
        // Document - Page 4
        docMessageDisplayLarge: document.getElementById('docMessageDisplayLarge'),
        
        // Document - Page 5
        docLoveLoveLarge: document.getElementById('docLoveLoveLarge'),
        signatureNameLarge: document.getElementById('signatureNameLarge'),
        docDateLarge: document.getElementById('docDateLarge'),
        
        // Boutons
        downloadBtn: document.getElementById('downloadBtn'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        nav: document.getElementById('nav'),
        
        // Modals
        loaderModal: document.getElementById('loaderModal'),
        successModal: document.getElementById('successModal'),
        closeSuccessBtn: document.getElementById('closeSuccessModal'),
        
        // Autres
        particles: document.getElementById('particles'),
        floatingHearts: document.getElementById('floatingHearts'),
        form: document.getElementById('loveForm')
    };

    // Initialisation
    const init = () => {
        console.log('❤️ Application démarrée');
        
        if (!checkElements()) return;
        
        createFloatingHearts();
        createParticles();
        setupEventListeners();
        
        // Générer l'acrostiche initial
        updateAcrostiche();
        
        // Mettre à jour tous les affichages
        updateAllDisplays();
    };

    // Vérifier que tous les éléments existent
    const checkElements = () => {
        return true;
    };

    // Mettre à jour tous les affichages
    const updateAllDisplays = () => {
        // Page 1
        if (DOM.coverAuthorName) DOM.coverAuthorName.textContent = state.authorName;
        if (DOM.coverLovedName) DOM.coverLovedName.textContent = state.lovedName;
        
        // Page 2
        if (DOM.docAuthorNameLarge) DOM.docAuthorNameLarge.textContent = state.authorName;
        if (DOM.docLovedNameLarge) DOM.docLovedNameLarge.textContent = state.lovedName;
        if (DOM.docMemoryLarge) DOM.docMemoryLarge.innerHTML = `<i class="fas fa-star"></i> ${state.favoriteMemory}`;
        
        // Page 3
        if (DOM.acrosticheLovedNameLarge) DOM.acrosticheLovedNameLarge.textContent = state.lovedName;
        
        // Page 4
        if (DOM.docMessageDisplayLarge) DOM.docMessageDisplayLarge.textContent = state.deepMessage;
        
        // Page 5
        if (DOM.signatureNameLarge) DOM.signatureNameLarge.textContent = state.authorName;
        if (DOM.docLoveLoveLarge) DOM.docLoveLoveLarge.textContent = state.loveLoveMessage;
        
        updateDateDisplay();
    };

    // Mettre à jour la date
    const updateDateDisplay = () => {
        if (!DOM.coverDate || !DOM.docDateLarge) return;
        
        if (state.specialDate) {
            const date = new Date(state.specialDate);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('fr-FR', options);
            DOM.coverDate.textContent = formattedDate;
            DOM.docDateLarge.textContent = formattedDate;
        }
    };

    // Mettre à jour l'acrostiche
    const updateAcrostiche = () => {
        if (!DOM.acrosticheContainerLarge) return;
        
        const cleanName = state.lovedName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase();
        
        const letters = cleanName.split('');
        let html = '';
        
        letters.forEach((letter, index) => {
            const phrase = AcrosticheData.getPhrase(letter, index, state.lovedGender);
            html += `
                <div class="acrostiche-line-large">
                    <span class="acrostiche-letter-large">${letter}</span>
                    <span class="acrostiche-phrase-large">${phrase}</span>
                </div>
            `;
        });
        
        DOM.acrosticheContainerLarge.innerHTML = html;
    };

    // Gestionnaires d'événements
    const setupEventListeners = () => {
        // Input en temps réel
        if (DOM.authorName) {
            DOM.authorName.addEventListener('input', (e) => {
                state.authorName = e.target.value || 'Toni';
                if (DOM.coverAuthorName) DOM.coverAuthorName.textContent = state.authorName;
                if (DOM.docAuthorNameLarge) DOM.docAuthorNameLarge.textContent = state.authorName;
                if (DOM.signatureNameLarge) DOM.signatureNameLarge.textContent = state.authorName;
            });
        }
        
        if (DOM.lovedName) {
            DOM.lovedName.addEventListener('input', (e) => {
                state.lovedName = e.target.value || 'Baké';
                if (DOM.coverLovedName) DOM.coverLovedName.textContent = state.lovedName;
                if (DOM.docLovedNameLarge) DOM.docLovedNameLarge.textContent = state.lovedName;
                if (DOM.acrosticheLovedNameLarge) DOM.acrosticheLovedNameLarge.textContent = state.lovedName;
                updateAcrostiche();
            });
        }
        
        if (DOM.lovedGender) {
            DOM.lovedGender.addEventListener('change', () => {
                state.lovedGender = DOM.lovedGender.value;
                updateAcrostiche();
            });
        }
        
        if (DOM.deepMessage) {
            DOM.deepMessage.addEventListener('input', (e) => {
                state.deepMessage = e.target.value || '';
                if (DOM.docMessageDisplayLarge) DOM.docMessageDisplayLarge.textContent = state.deepMessage;
            });
        }
        
        if (DOM.favoriteMemory) {
            DOM.favoriteMemory.addEventListener('input', (e) => {
                state.favoriteMemory = e.target.value || '';
                if (DOM.docMemoryLarge) DOM.docMemoryLarge.innerHTML = `<i class="fas fa-star"></i> ${state.favoriteMemory}`;
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
        
        // Bouton télécharger
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
        
        // Fermer le menu mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (DOM.nav) DOM.nav.classList.remove('active');
            });
        });
        
        // Scroll vers aperçu
        document.querySelectorAll('a[href="#preview"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('preview').scrollIntoView({ behavior: 'smooth' });
            });
        });
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
            
            // Prévisualisation
            if (DOM.uploadPreview) {
                DOM.uploadPreview.innerHTML = `<img src="${state.photoPreview}" alt="Preview">`;
                DOM.uploadArea.classList.add('has-image');
            }
            
            // Grande photo
            if (DOM.docPhotoLarge) {
                DOM.docPhotoLarge.src = state.photoPreview;
                DOM.docPhotoLarge.classList.remove('hidden');
            }
            
            if (DOM.docPhotoPlaceholderLarge) {
                DOM.docPhotoPlaceholderLarge.classList.add('hidden');
            }
        };
        reader.readAsDataURL(file);
    };

    // Soumission du formulaire
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (DOM.loaderModal) DOM.loaderModal.classList.add('active');
        
        setTimeout(() => {
            if (DOM.loaderModal) DOM.loaderModal.classList.remove('active');
            
            // Changer le message love love
            const randomIndex = Math.floor(Math.random() * loveMessages.length);
            state.loveLoveMessage = loveMessages[randomIndex];
            if (DOM.docLoveLoveLarge) DOM.docLoveLoveLarge.textContent = state.loveLoveMessage;
            
            if (DOM.successModal) DOM.successModal.classList.add('active');
            createConfetti();
            
        }, 1500);
    };

    // Téléchargement PDF
    const handleDownload = async () => {
        try {
            if (DOM.loaderModal) DOM.loaderModal.classList.add('active');
            
            // Mettre à jour l'acrostiche
            updateAcrostiche();
            
            // Attendre que le DOM soit mis à jour
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Générer le PDF
            const filename = `lettre-${state.authorName}-${state.lovedName}-2026.pdf`;
            await PDFGenerator.generatePDF(filename);
            
            if (DOM.loaderModal) DOM.loaderModal.classList.remove('active');
            createConfetti();
            
        } catch (error) {
            console.error('Erreur PDF:', error);
            if (DOM.loaderModal) DOM.loaderModal.classList.remove('active');
            alert('Erreur lors de la génération du PDF');
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

    return { init };
})();

// Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
    LoveLetterApp.init();
});