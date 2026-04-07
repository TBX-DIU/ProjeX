/**
 * Store - Gestionnaire d'état centralisé
 * Pattern Observer pour la gestion réactive des données
 */
class Store {
    constructor() {
        this.state = {
            projects: [],
            tasks: [],
            members: [],
            activities: [],
            settings: {
                theme: 'light',
                language: 'fr',
                notifications: true
            },
            filters: {
                projects: { status: 'all', priority: 'all' },
                tasks: { status: 'all', priority: 'all', project: 'all' }
            },
            ui: {
                currentPage: 'dashboard',
                projectView: 'grid',
                sidebarCollapsed: false
            }
        };
        
        this.listeners = [];
        this.history = [];
        this.maxHistory = 50;
    }

    /**
     * Obtenir l'état complet
     */
    getState() {
        return this.state;
    }

    /**
     * Obtenir une partie de l'état
     */
    get(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.state);
    }

    /**
     * Mettre à jour l'état
     */
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => obj[key], this.state);
        
        // Sauvegarder dans l'historique
        this.addToHistory(path, target[lastKey], value);
        
        target[lastKey] = value;
        this.notify(path, value);
    }

    /**
     * S'abonner aux changements
     */
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * Notifier les listeners
     */
    notify(path, value) {
        this.listeners.forEach(listener => listener(path, value, this.state));
    }

    /**
     * Ajouter à l'historique
     */
    addToHistory(path, oldValue, newValue) {
        this.history.push({
            timestamp: Date.now(),
            path,
            oldValue,
            newValue
        });
        
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    /**
     * Obtenir l'historique
     */
    getHistory(limit = 10) {
        return this.history.slice(-limit).reverse();
    }

    /**
     * Réinitialiser l'état
     */
    reset() {
        this.state = {
            projects: [],
            tasks: [],
            members: [],
            activities: [],
            settings: {
                theme: 'light',
                language: 'fr',
                notifications: true
            },
            filters: {
                projects: { status: 'all', priority: 'all' },
                tasks: { status: 'all', priority: 'all', project: 'all' }
            },
            ui: {
                currentPage: 'dashboard',
                projectView: 'grid',
                sidebarCollapsed: false
            }
        };
        this.notify('*', this.state);
    }
}

// Instance singleton
const store = new Store();
