/**
 * APPLICATION LETTRE D'AMOUR
 */

const App = {
    // État
    state: {
        authorName: 'Toni',
        lovedName: 'Baké',
        deepMessage: 'Mon amour pour toi est infini. Chaque jour à tes côtés est un cadeau précieux.',
        favoriteMemory: 'Notre premier regard',
        specialDate: '2026-02-14',
        photoPreview: null
    },

    // Messages Love Love
    loveMessages: [
        "L'amour est l'infini à portée de cœur",
        "Je t'aime pour l'éternité",
        "Mon cœur est à toi pour toujours",
        "Tu es mon hier, aujourd'hui et demain",
        "Notre amour est éternel"
    ],

    // Banque de phrases pour acrostiche (lettre + phrase)
    acrostichePhrases: {
        'B': 'aissée de ta présence chaque jour',
        'A': 'mour sincère et pur',
        'K': 'érosène dans mon cœur',
        'É': 'ternellement reconnaissant',
        'R': 'ayon de soleil dans ma vie',
        'O': 'xygène de mon cœur',
        'N': 'otre histoire est unique',
        'I': 'nstant précieux avec toi',
        'S': 'ourire qui me fait fondre',
        'T': 'endresse infinie',
        'default': 'aime chaque instant avec toi'
    },

    // Initialisation
    init: function() {
        console.log('Application démarrée');
        this.cacheDOM();
        this.bindEvents();
        this.updateDisplays();
        this.generateAcrostiche('BAKÉ');
        
        // Activer bouton téléchargement
        if (this.downloadBtn) this.downloadBtn.disabled = false;
    },

    // Récupérer les éléments DOM
    cacheDOM: function() {
        this.authorName = document.getElementById('authorName');
        this.lovedName = document.getElementById('lovedName');
        this.deepMessage = document.getElementById('deepMessage');
        this.favoriteMemory = document.getElementById('favoriteMemory');
        this.specialDate = document.getElementById('specialDate');
        this.uploadArea = document.getElementById('uploadArea');
        this.photoUpload = document.getElementById('photoUpload');
        this.uploadPreview = document.getElementById('uploadPreview');
        this.authorNameDisplay = document.getElementById('authorNameDisplay');
        this.lovedNameDisplay = document.getElementById('lovedNameDisplay');
        this.cardDateDisplay = document.getElementById('cardDateDisplay');
        this.acrosticheContainer = document.getElementById('acrosticheContainer');
        this.personalMessageDisplay = document.getElementById('personalMessageDisplay');
        this.memoryDisplay = document.getElementById('memoryDisplay');
        this.memorySection = document.getElementById('memorySection');
        this.loveLoveDisplay = document.getElementById('loveLoveDisplay');
        this.cardPhoto = document.getElementById('cardPhoto');
        this.photoPlaceholder = document.getElementById('photoPlaceholder');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.loaderModal = document.getElementById('loaderModal');
        this.successModal = document.getElementById('successModal');
        this.closeSuccessBtn = document.getElementById('closeSuccessBtn');
        this.form = document.getElementById('loveForm');
    },

    // Écouteurs d'événements
    bindEvents: function() {
        // Formulaire
        if (this.authorName) {
            this.authorName.addEventListener('input', (e) => {
                this.state.authorName = e.target.value || 'Toni';
                if (this.authorNameDisplay) this.authorNameDisplay.textContent = this.state.authorName;
            });
        }

        if (this.lovedName) {
            this.lovedName.addEventListener('input', (e) => {
                this.state.lovedName = e.target.value || 'Baké';
                if (this.lovedNameDisplay) this.lovedNameDisplay.textContent = this.state.lovedName;
                this.generateAcrostiche(this.state.lovedName.toUpperCase());
            });
        }

        if (this.deepMessage) {
            this.deepMessage.addEventListener('input', (e) => {
                this.state.deepMessage = e.target.value || '';
                if (this.personalMessageDisplay) this.personalMessageDisplay.textContent = this.state.deepMessage;
            });
        }

        if (this.favoriteMemory) {
            this.favoriteMemory.addEventListener('input', (e) => {
                this.state.favoriteMemory = e.target.value || '';
                if (this.memoryDisplay) {
                    if (this.state.favoriteMemory) {
                        this.memoryDisplay.textContent = this.state.favoriteMemory;
                        this.memorySection.style.display = 'block';
                    } else {
                        this.memorySection.style.display = 'none';
                    }
                }
            });
        }

        if (this.specialDate) {
            this.specialDate.addEventListener('change', (e) => {
                this.state.specialDate = e.target.value;
                this.updateDate();
            });
        }

        // Upload photo
        if (this.uploadArea && this.photoUpload) {
            this.uploadArea.addEventListener('click', () => this.photoUpload.click());
            this.uploadArea.addEventListener('dragover', (e) => e.preventDefault());
            this.uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) this.processImage(file);
            });
            this.photoUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) this.processImage(file);
            });
        }

        // Formulaire submit
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Téléchargement
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.handleDownload());
        }

        // Fermer modal
        if (this.closeSuccessBtn) {
            this.closeSuccessBtn.addEventListener('click', () => {
                this.successModal.classList.remove('active');
            });
        }
    },

    // Générer acrostiche (lettre + phrase sur la même ligne)
    generateAcrostiche: function(name) {
        if (!this.acrosticheContainer) return;
        
        const letters = name.split('');
        let html = '';
        
        letters.forEach((letter, index) => {
            const phrase = this.acrostichePhrases[letter] || this.acrostichePhrases['default'];
            
            html += `
                <div class="acrostiche-line">
                    <span class="acrostiche-letter">${letter}</span>
                    <span class="acrostiche-phrase">${phrase}</span>
                </div>
            `;
        });
        
        this.acrosticheContainer.innerHTML = html;
    },

    // Mettre à jour la date
    updateDate: function() {
        if (!this.cardDateDisplay) return;
        
        if (this.state.specialDate) {
            const date = new Date(this.state.specialDate);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            this.cardDateDisplay.textContent = date.toLocaleDateString('fr-FR', options);
        }
    },

    // Mettre à jour les affichages
    updateDisplays: function() {
        if (this.authorNameDisplay) this.authorNameDisplay.textContent = this.state.authorName;
        if (this.lovedNameDisplay) this.lovedNameDisplay.textContent = this.state.lovedName;
        if (this.personalMessageDisplay) this.personalMessageDisplay.textContent = this.state.deepMessage;
        if (this.memoryDisplay) this.memoryDisplay.textContent = this.state.favoriteMemory;
        this.updateDate();
        
        // Message Love Love aléatoire
        if (this.loveLoveDisplay) {
            const randomIndex = Math.floor(Math.random() * this.loveMessages.length);
            this.loveLoveDisplay.textContent = this.loveMessages[randomIndex];
        }
    },

    // Traitement image
    processImage: function(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.state.photoPreview = e.target.result;
            
            if (this.uploadPreview) {
                this.uploadPreview.innerHTML = `<img src="${this.state.photoPreview}" alt="Preview">`;
                this.uploadArea.classList.add('has-image');
            }
            
            if (this.cardPhoto) {
                this.cardPhoto.src = this.state.photoPreview;
                this.cardPhoto.classList.remove('hidden');
            }
            
            if (this.photoPlaceholder) {
                this.photoPlaceholder.classList.add('hidden');
            }
        };
        reader.readAsDataURL(file);
    },

    // Soumission formulaire
    handleSubmit: function(e) {
        e.preventDefault();
        
        if (this.loaderModal) this.loaderModal.classList.add('active');
        
        setTimeout(() => {
            if (this.loaderModal) this.loaderModal.classList.remove('active');
            
            // Mettre à jour l'acrostiche
            this.generateAcrostiche(this.state.lovedName.toUpperCase());
            
            // Nouveau message Love Love
            if (this.loveLoveDisplay) {
                const randomIndex = Math.floor(Math.random() * this.loveMessages.length);
                this.loveLoveDisplay.textContent = this.loveMessages[randomIndex];
            }
            
            if (this.successModal) this.successModal.classList.add('active');
            this.createConfetti();
        }, 1500);
    },

    // Téléchargement
    handleDownload: async function() {
        const card = document.getElementById('loveCard');
        if (!card) return;
        
        try {
            if (this.loaderModal) this.loaderModal.classList.add('active');
            
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas non chargé');
            }
            
            const canvas = await html2canvas(card, {
                scale: 2,
                backgroundColor: '#ffffff'
            });
            
            const link = document.createElement('a');
            link.download = `lettre-${this.state.authorName}-${this.state.lovedName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            if (this.loaderModal) this.loaderModal.classList.remove('active');
            this.createConfetti();
            
        } catch (error) {
            console.error('Erreur:', error);
            if (this.loaderModal) this.loaderModal.classList.remove('active');
            alert('Faites une capture d\'écran de la carte');
        }
    },

    // Confettis
    createConfetti: function() {
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10%;
                width: ${5 + Math.random() * 8}px;
                height: ${5 + Math.random() * 8}px;
                background: hsl(${Math.random() * 360}, 80%, 60%);
                opacity: 0.7;
                transform: rotate(${Math.random() * 360}deg);
                animation: confetti ${2 + Math.random() * 2}s ease-out forwards;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }
};

// Animation confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Démarrage
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});