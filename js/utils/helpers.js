/**
 * Fonctions utilitaires
 */

/**
 * Formater une date
 */
function formatDate(dateString, format = 'short') {
    if (!dateString) return '—';
    
    const date = new Date(dateString);
    const options = {
        short: { year: 'numeric', month: '2-digit', day: '2-digit' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        relative: null
    };

    if (format === 'relative') {
        return getRelativeTime(date);
    }

    return date.toLocaleDateString('fr-FR', options[format] || options.short);
}

/**
 * Obtenir le temps relatif
 */
function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    return formatDate(date);
}

/**
 * Générer un ID unique
 */
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce une fonction
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle une fonction
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Échapper le HTML
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Formater le nombre avec séparateurs
 */
function formatNumber(num) {
    return new Intl.NumberFormat('fr-FR').format(num);
}

/**
 * Truncate le texte
 */
function truncate(text, length = 50) {
    if (!text || text.length <= length) return text;
    return text.substr(0, length) + '...';
}

/**
 * Obtenir une couleur aléatoire
 */
function randomColor() {
    const colors = [
        '#4f46e5', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Générer une couleur pour un membre basée sur l'ID
 */
function memberColor(id) {
    const colors = [
        '#4f46e5', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'
    ];
    return colors[id % colors.length];
}

/**
 * Valider un email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Copier dans le presse-papier
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Erreur lors de la copie:', error);
        return false;
    }
}

/**
 * Télécharger un fichier
 */
function downloadFile(content, filename, type = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Lire un fichier
 */
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

/**
 * Filtrer un tableau avec plusieurs critères
 */
function filterArray(array, filters) {
    return array.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === 'all' || !value) return true;
            return item[key] === value;
        });
    });
}

/**
 * Grouper un tableau par clé
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

/**
 * Trier un tableau par multiple clés
 */
function sortBy(array, keys) {
    return array.sort((a, b) => {
        for (const key of keys) {
            const desc = key.startsWith('-');
            const prop = desc ? key.substring(1) : key;
            const aVal = a[prop];
            const bVal = b[prop];
            
            if (aVal < bVal) return desc ? 1 : -1;
            if (aVal > bVal) return desc ? -1 : 1;
        }
        return 0;
    });
}

/**
 * État vide pour UI
 */
function emptyState(icon, title, description) {
    return `
        <div class="empty-state">
            <i class="fas ${icon}"></i>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
}

/**
 * Tag de statut
 */
function getStatusTag(status) {
    const statusMap = {
        'planifié': { color: 'gray', icon: 'fa-clock' },
        'en cours': { color: 'blue', icon: 'fa-spinner' },
        'en pause': { color: 'orange', icon: 'fa-pause' },
        'terminé': { color: 'green', icon: 'fa-check' },
        'à faire': { color: 'gray', icon: 'fa-circle' }
    };
    
    const s = statusMap[status] || statusMap['planifié'];
    return `<span class="tag tag-${s.color}"><i class="fas ${s.icon}"></i> ${status}</span>`;
}

/**
 * Tag de priorité
 */
function getPriorityTag(priority) {
    const priorityMap = {
        'haute': { color: 'red', icon: 'fa-arrow-up' },
        'moyenne': { color: 'orange', icon: 'fa-minus' },
        'basse': { color: 'gray', icon: 'fa-arrow-down' }
    };
    
    const p = priorityMap[priority] || priorityMap['moyenne'];
    return `<span class="tag tag-${p.color}"><i class="fas ${p.icon}"></i> ${priority}</span>`;
}

/**
 * Label de type de tâche
 */
function getTypeLabel(type) {
    const typeMap = {
        'feature': 'Fonctionnalité',
        'bug': 'Bug',
        'improvement': 'Amélioration',
        'task': 'Tâche',
        'spike': 'Spike',
        'documentation': 'Documentation'
    };
    return typeMap[type] || type;
}

/**
 * Calculer le pourcentage
 */
function percentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

/**
 * Formater la durée (minutes en heures/jours)
 */
function formatDuration(minutes) {
    if (minutes < 60) return `${minutes}min`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}j`;
}
