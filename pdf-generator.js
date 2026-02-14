/**
 * GÉNÉRATEUR DE PDF
 */

const PDFGenerator = {
    generatePDF: async function(filename) {
        const { jsPDF } = window.jspdf;
        
        // Récupérer toutes les pages
        const pages = document.querySelectorAll('.document-page');
        
        if (pages.length === 0) {
            throw new Error('Aucune page trouvée');
        }
        
        // Créer le PDF
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [600, 800]
        });
        
        // Pour chaque page
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            
            // Ajouter une page sauf pour la première
            if (i > 0) {
                doc.addPage([600, 800]);
            }
            
            try {
                // Capturer la page
                const canvas = await html2canvas(page, {
                    scale: 2,
                    backgroundColor: '#F9F1E0',
                    allowTaint: true,
                    useCORS: true,
                    logging: false,
                    windowWidth: 600,
                    windowHeight: 800
                });
                
                // Convertir en image
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                
                // Ajouter au PDF
                doc.addImage(imgData, 'JPEG', 0, 0, 600, 800, undefined, 'FAST');
                
            } catch (error) {
                console.error(`Erreur page ${i+1}:`, error);
                
                // Fallback
                doc.setFontSize(20);
                doc.setTextColor(230, 57, 70);
                doc.text(`Page ${i+1}`, 50, 50);
            }
            
            // Pause pour éviter de surcharger
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Sauvegarder
        doc.save(filename);
        return true;
    }
};