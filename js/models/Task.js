/**
 * Modèle Tâche
 */
class Task {
    constructor(data = {}) {
        this.id = data.id || Date.now();
        this.name = data.name || '';
        this.description = data.description || '';
        this.project = data.project || null;
        this.assignee = data.assignee || null;
        this.status = data.status || 'à faire';
        this.priority = data.priority || 'moyenne';
        this.blockedReason = data.blockedReason || null;
        this.dueDate = data.dueDate || null;
        this.progress = data.progress || 0;
        this.tags = data.tags || [];
        
        // Champs backlog - Hiérarchie
        this.epic = data.epic || '';
        this.userStory = data.userStory || '';
        
        // Champs backlog - Organisation
        this.type = data.type || 'feature'; // feature, bug, tech, amélioration, doc
        this.domain = data.domain || '';
        this.subdomain = data.subdomain || '';
        
        // Champs backlog - Analyse
        this.hypothesis = data.hypothesis || '';
        this.solution = data.solution || '';
        this.acceptanceCriteria = data.acceptanceCriteria || '';
        this.risks = data.risks || '';
        
        // Champs backlog - Estimation
        this.estimationDays = data.estimationDays || null;
        this.estimationHours = data.estimationHours || null;
        this.storyPoints = data.storyPoints || null;
        
        // Champs backlog - Dates
        this.startDate = data.startDate || null;
        
        this.dependencies = data.dependencies || [];
        this.estimatedTime = data.estimatedTime || null;
        this.actualTime = data.actualTime || null;
        this.comments = data.comments || [];
        this.attachments = data.attachments || [];
        this.createdAt = data.createdAt || Date.now();
        this.updatedAt = data.updatedAt || Date.now();
        this.completedAt = data.completedAt || null;
    }

    /**
     * Mettre à jour la tâche
     */
    update(data) {
        Object.assign(this, data);
        this.updatedAt = Date.now();
        
        // Si la tâche est marquée comme terminée
        if (data.status === 'terminé' && this.status !== 'terminé') {
            this.completedAt = Date.now();
            this.progress = 100;
        }
        
        return this;
    }

    /**
     * Vérifier si la tâche est en retard
     */
    isOverdue() {
        if (!this.dueDate || this.status === 'terminé') return false;
        const today = new Date();
        const due = new Date(this.dueDate);
        return due < today;
    }

    /**
     * Obtenir le nombre de jours restants
     */
    getDaysRemaining() {
        if (!this.dueDate) return null;
        const today = new Date();
        const due = new Date(this.dueDate);
        const diffTime = due - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Ajouter un commentaire
     */
    addComment(comment) {
        this.comments.push({
            id: Date.now(),
            text: comment.text,
            author: comment.author,
            timestamp: Date.now()
        });
        this.updatedAt = Date.now();
    }

    /**
     * Ajouter une pièce jointe
     */
    addAttachment(attachment) {
        this.attachments.push({
            id: Date.now(),
            name: attachment.name,
            url: attachment.url,
            type: attachment.type,
            size: attachment.size,
            timestamp: Date.now()
        });
        this.updatedAt = Date.now();
    }

    /**
     * Vérifier si les dépendances sont complétées
     */
    canStart(allTasks) {
        if (this.dependencies.length === 0) return true;
        
        return this.dependencies.every(depId => {
            const depTask = allTasks.find(t => t.id === depId);
            return depTask && depTask.status === 'terminé';
        });
    }

    /**
     * Valider la tâche
     */
    validate() {
        const errors = [];
        
        if (!this.name || this.name.trim() === '') {
            errors.push('Le nom de la tâche est requis');
        }
        
        if (!this.project) {
            errors.push('La tâche doit être associée à un projet');
        }
        
        if (this.progress < 0 || this.progress > 100) {
            errors.push('La progression doit être entre 0 et 100');
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
            project: this.project,
            assignee: this.assignee,
            status: this.status,
            priority: this.priority,
            dueDate: this.dueDate,
            progress: this.progress,
            tags: this.tags,
            dependencies: this.dependencies,
            estimatedTime: this.estimatedTime,
            actualTime: this.actualTime,
            comments: this.comments,
            attachments: this.attachments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            completedAt: this.completedAt
        };
    }
}
