/**
 * Service de stockage local
 * Gère la persistance des données avec localStorage
 */
class StorageService {
    constructor() {
        this.prefix = 'projex_';
        this.version = '1.0';
    }

    /**
     * Sauvegarder les données
     */
    save(key, data) {
        try {
            const serialized = JSON.stringify({
                version: this.version,
                timestamp: Date.now(),
                data
            });
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            return false;
        }
    }

    /**
     * Charger les données
     */
    load(key) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            return parsed.data;
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            return null;
        }
    }

    /**
     * Supprimer les données
     */
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return false;
        }
    }

    /**
     * Effacer toutes les données
     */
    clear() {
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith(this.prefix))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'effacement:', error);
            return false;
        }
    }

    /**
     * Sauvegarder l'état complet
     */
    saveState(state) {
        return this.save('state', state);
    }

    /**
     * Charger l'état complet
     */
    loadState() {
        return this.load('state');
    }

    /**
     * Exporter les données en JSON
     */
    exportData() {
        const state = this.loadState();
        if (!state) return null;
        
        return {
            version: this.version,
            exportDate: new Date().toISOString(),
            data: state
        };
    }

    /**
     * Importer les données depuis JSON
     */
    importData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            // Vérifier le format
            if (!data.version || !data.data) {
                throw new Error('Format de données invalide');
            }
            
            // Sauvegarder les données
            this.saveState(data.data);
            return { success: true };
        } catch (error) {
            console.error('Erreur lors de l\'importation:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Obtenir la taille du stockage utilisé
     */
    getStorageSize() {
        let total = 0;
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => {
                total += localStorage.getItem(key).length;
            });
        return this.formatBytes(total);
    }

    /**
     * Formater les octets
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Vérifier si le stockage est disponible
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Auto-sauvegarde avec debounce
     */
    autoSave(state, delay = 1000) {
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        this.autoSaveTimeout = setTimeout(() => {
            this.saveState(state);
            console.log('💾 État sauvegardé automatiquement');
        }, delay);
    }
}

// Instance singleton
const storageService = new StorageService();
