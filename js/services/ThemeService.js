/**
 * Service de gestion des thèmes
 */
class ThemeService {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    /**
     * Initialiser le thème
     */
    init() {
        const savedTheme = localStorage.getItem('projex_theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Détecter la préférence système
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }

        // Écouter les changements de préférence système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('projex_theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Définir le thème
     */
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('projex_theme', theme);
        
        // Mettre à jour l'icône du bouton
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    /**
     * Basculer le thème
     */
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }

    /**
     * Obtenir le thème actuel
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Vérifier si le mode sombre est actif
     */
    isDark() {
        return this.currentTheme === 'dark';
    }
}

// Instance singleton
const themeService = new ThemeService();
