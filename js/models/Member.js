/**
 * Modèle Membre
 */
class Member {
    constructor(data = {}) {
        this.id = data.id || Date.now();
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.role = data.role || '';
        this.department = data.department || '';
        this.avatar = data.avatar || null;
        this.color = data.color || this.generateColor();
        this.skills = data.skills || [];
        this.availability = data.availability || 100; // pourcentage
        this.createdAt = data.createdAt || Date.now();
        this.updatedAt = data.updatedAt || Date.now();
    }

    /**
     * Obtenir le nom complet
     */
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Obtenir les initiales
     */
    getInitials() {
        return `${this.firstName[0] || ''}${this.lastName[0] || ''}`.toUpperCase();
    }

    /**
     * Générer une couleur unique
     */
    generateColor() {
        const colors = [
            '#4f46e5', '#10b981', '#f59e0b', '#ef4444', 
            '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Calculer la charge de travail (nombre de tâches actives)
     */
    getWorkload(tasks) {
        return tasks.filter(t => 
            t.assignee === this.id && 
            t.status !== 'terminé'
        ).length;
    }

    /**
     * Obtenir les projets du membre
     */
    getProjects(projects) {
        return projects.filter(p => p.members.includes(this.id));
    }

    /**
     * Mettre à jour le membre
     */
    update(data) {
        Object.assign(this, data);
        this.updatedAt = Date.now();
        return this;
    }

    /**
     * Valider le membre
     */
    validate() {
        const errors = [];
        
        if (!this.firstName || this.firstName.trim() === '') {
            errors.push('Le prénom est requis');
        }
        
        if (!this.lastName || this.lastName.trim() === '') {
            errors.push('Le nom est requis');
        }
        
        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push('Email valide requis');
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Valider l'email
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Convertir en objet simple
     */
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
            department: this.department,
            avatar: this.avatar,
            color: this.color,
            skills: this.skills,
            availability: this.availability,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
