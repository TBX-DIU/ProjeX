/**
 * Modèle Projet
 */
class Project {
    constructor(data = {}) {
        this.id = data.id || Date.now();
        this.name = data.name || '';
        this.description = data.description || '';
        this.color = data.color || '#4f46e5';
        this.status = data.status || 'planifié';
        this.priority = data.priority || 'moyenne';
        this.startDate = data.startDate || null;
        this.endDate = data.endDate || null;
        this.releaseDate = data.releaseDate || null; // Date de mise en production
        this.members = data.members || [];
        this.progress = data.progress || 0;
        this.tags = data.tags || [];
        this.template = data.template || null;
        this.createdAt = data.createdAt || Date.now();
        this.updatedAt = data.updatedAt || Date.now();
    }

    /**
     * Mettre à jour le projet
     */
    update(data) {
        Object.assign(this, data);
        this.updatedAt = Date.now();
        return this;
    }

    /**
     * Calculer la progression automatiquement
     */
    calculateProgress(tasks) {
        const projectTasks = tasks.filter(t => t.project === this.id);
        if (projectTasks.length === 0) return 0;
        
        const totalProgress = projectTasks.reduce((sum, task) => sum + task.progress, 0);
        return Math.round(totalProgress / projectTasks.length);
    }

    /**
     * Vérifier si le projet est en retard
     */
    isOverdue() {
        if (!this.endDate) return false;
        const today = new Date();
        const end = new Date(this.endDate);
        return end < today && this.status !== 'terminé';
    }

    /**
     * Obtenir le nombre de jours restants
     */
    getDaysRemaining() {
        if (!this.endDate) return null;
        const today = new Date();
        const end = new Date(this.endDate);
        const diffTime = end - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Valider le projet
     */
    validate() {
        const errors = [];
        
        if (!this.name || this.name.trim() === '') {
            errors.push('Le nom du projet est requis');
        }
        
        if (this.startDate && this.endDate) {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            if (end < start) {
                errors.push('La date de fin doit être après la date de début');
            }
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Convertir en objet simple
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            color: this.color,
            status: this.status,
            priority: this.priority,
            startDate: this.startDate,
            endDate: this.endDate,
            releaseDate: this.releaseDate,
            members: this.members,
            progress: this.progress,
            tags: this.tags,
            template: this.template,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    /**
     * Créer un projet depuis un template
     */
    static fromTemplate(template, customData = {}) {
        return new Project({
            ...template,
            id: Date.now(),
            template: template.name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            ...customData
        });
    }
}
