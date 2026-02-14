/**
 * BANQUE DE PHRASES POUR ACROSTICHE
 */

const AcrosticheData = {
    phrases: {
        'A': [
            "Aimé(e) dès le premier regard",
            "Ange envoyé du ciel",
            "Amour de ma vie",
            "Avec toi, tout est possible",
            "Aussi belle que la lumière du jour"
        ],
        'B': [
            "Belle comme un coucher de soleil",
            "Bonheur infini à tes côtés",
            "Beauté qui éclaire ma vie",
            "Bénie soit notre rencontre",
            "Baiser doux comme le miel"
        ],
        'C': [
            "Câlin qui réchauffe mon cœur",
            "Cadeau précieux de la vie",
            "Ciel étoilé dans tes yeux",
            "Complice à jamais",
            "Cœur qui bat pour toi"
        ],
        'D': [
            "Douceur infinie de ta peau",
            "Désir de te voir chaque jour",
            "Délices de nos instants partagés",
            "Danse de nos âmes sœurs",
            "Doux parfum de ta présence"
        ],
        'E': [
            "Éclat de rire qui me fait vibrer",
            "Étoile qui guide mes nuits",
            "Émerveillement quotidien",
            "Éternellement reconnaissant",
            "Envie de toi chaque matin"
        ],
        'F': [
            "Flamme qui brûle en moi",
            "Fleur éclose dans mon jardin",
            "Folie douce de t'aimer",
            "Fidèle comme la lune",
            "Force qui me porte"
        ],
        'G': [
            "Grâce à toi je vis",
            "Gentillesse infinie",
            "Gaieté de nos rires",
            "Gourmandise de tes lèvres",
            "Grandiose est notre histoire"
        ],
        'H': [
            "Harmonie parfaite entre nous",
            "Hymne à notre amour",
            "Heureux(se) de t'avoir",
            "Honneur de t'aimer",
            "Horizon avec toi"
        ],
        'I': [
            "Immense est mon amour",
            "Infiniment reconnaissant",
            "Instants magiques partagés",
            "Irrésistible attirance",
            "Incroyable destin"
        ],
        'J': [
            "Jardin secret de nos cœurs",
            "Joie de vivre à tes côtés",
            "Jours heureux avec toi",
            "Jalousie du temps qui passe",
            "Jamais je ne t'oublierai"
        ],
        'K': [
            "Karma qui nous a réunis",
            "Klaxon de la vie qui sonne",
            "Kiffe de chaque instant",
            "Kilos de bonheur avec toi",
            "Kinésithérapie du cœur"
        ],
        'L': [
            "Lumière de mes jours",
            "Lien indestructible",
            "Liberté d'être moi avec toi",
            "Larmes de joie partagées",
            "Lune complice de nos nuits"
        ],
        'M': [
            "Merveilleuse personne",
            "Mélodie de ta voix",
            "Matin à tes côtés",
            "Magie de notre rencontre",
            "Mots doux échangés"
        ],
        'N': [
            "Notre histoire unique",
            "Nuit étoilée avec toi",
            "Nid douillet de notre amour",
            "Naissance de nos sentiments",
            "Naturellement attirés"
        ],
        'O': [
            "Océan d'amour infini",
            "Oasis dans ma vie",
            "Ode à la tendresse",
            "Oiseau libre comme nous",
            "Orchidée de mon jardin"
        ],
        'P': [
            "Passion dévorante",
            "Poème vivant",
            "Promesse d'éternité",
            "Pétales de nos souvenirs",
            "Pure merveille"
        ],
        'Q': [
            "Quotidien plus beau avec toi",
            "Quête du bonheur accomplie",
            "Quiétude de nos soirées",
            "Qualité de ton cœur",
            "Quatuor de nos mains"
        ],
        'R': [
            "Rêve devenu réalité",
            "Rayon de soleil",
            "Rire communicatif",
            "Rendez-vous du destin",
            "Rythme de nos cœurs"
        ],
        'S': [
            "Sourire qui m'apaise",
            "Sérénité à tes côtés",
            "Sentiments profonds",
            "Secret bien gardé",
            "Synchronicité parfaite"
        ],
        'T': [
            "Tendresse infinie",
            "Toi et moi pour toujours",
            "Trésor de ma vie",
            "Tourbillon d'émotions",
            "Temps suspendu"
        ],
        'U': [
            "Unique à mes yeux",
            "Univers qui tourne autour de toi",
            "Union sacrée",
            "Urgence de te dire je t'aime",
            "Usons nos vies ensemble"
        ],
        'V': [
            "Vie plus belle avec toi",
            "Vérité de nos cœurs",
            "Voyage au bout de nous",
            "Vague d'émotions",
            "Vibrations amoureuses"
        ],
        'W': [
            "Wagon de nos souvenirs",
            "Week-end amoureux",
            "Wanted: recherché(e) pour vol de cœur",
            "Wonderful comme notre histoire",
            "Wifi de nos âmes connectées"
        ],
        'X': [
            "Xylophone de nos rires",
            "Xénophile amoureux(se)",
            "Xavier, Xéna, tous les prénoms me font penser à toi",
            "XOXO bisous câlins",
            "XVe arrondissement de Paris où tout a commencé"
        ],
        'Y': [
            "Yeux qui brillent d'amour",
            "Yoga de nos corps enlacés",
            "Yacht sur l'océan de nos rêves",
            "Yéyé de notre jeunesse",
            "Yéti, même au bout du monde je te trouverai"
        ],
        'Z': [
            "Zénith de mon bonheur",
            "Zèbre, sauvage et libre comme notre amour",
            "Zéro défaut à mes yeux",
            "Zeste de fantaisie dans nos vies",
            "Zodiac compatible à jamais"
        ],
        'É': [
            "Éclat de ton regard",
            "Émotion à fleur de peau",
            "Éternité avec toi",
            "Équilibre parfait",
            "Évidence de nous"
        ],
        'default': [
            "Amour de ma vie",
            "Magnifique personne",
            "Merveille à mes yeux",
            "Tendre et passionné(e)",
            "Unique à jamais"
        ]
    },

    getPhrase: function(letter, index, gender = 'femme') {
        const list = this.phrases[letter] || this.phrases['default'];
        let phrase = list[index % list.length];
        
        // Adapter au genre
        if (gender === 'homme') {
            phrase = phrase
                .replace(/évaluée/g, 'évalué')
                .replace(/elle est/g, 'il est')
                .replace(/attentionnée/g, 'attentionné')
                .replace(/douce/g, 'doux')
                .replace(/merveilleuse/g, 'merveilleux')
                .replace(/belle/g, 'beau')
                .replace(/heureuse/g, 'heureux');
        }
        
        return phrase;
    }
};