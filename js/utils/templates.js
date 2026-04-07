/**
 * Templates de projets prédéfinis
 */
const projectTemplates = [
    {
        id: 'web-development',
        name: 'Développement Web',
        description: 'Site web ou application web',
        color: '#4f46e5',
        tasks: [
            { name: 'Cahier des charges', priority: 'haute', estimatedTime: 480 },
            { name: 'Maquettes UI/UX', priority: 'haute', estimatedTime: 720 },
            { name: 'Développement frontend', priority: 'haute', estimatedTime: 1440 },
            { name: 'Développement backend', priority: 'haute', estimatedTime: 1440 },
            { name: 'Tests et débogage', priority: 'moyenne', estimatedTime: 480 },
            { name: 'Déploiement', priority: 'haute', estimatedTime: 240 }
        ]
    },
    {
        id: 'mobile-app',
        name: 'Application Mobile',
        description: 'Application iOS/Android',
        color: '#10b981',
        tasks: [
            { name: 'Étude de marché', priority: 'moyenne', estimatedTime: 480 },
            { name: 'Design UI/UX', priority: 'haute', estimatedTime: 720 },
            { name: 'Développement iOS', priority: 'haute', estimatedTime: 2160 },
            { name: 'Développement Android', priority: 'haute', estimatedTime: 2160 },
            { name: 'Tests utilisateurs', priority: 'haute', estimatedTime: 480 },
            { name: 'Publication stores', priority: 'moyenne', estimatedTime: 240 }
        ]
    },
    {
        id: 'marketing-campaign',
        name: 'Campagne Marketing',
        description: 'Campagne publicitaire ou marketing',
        color: '#f59e0b',
        tasks: [
            { name: 'Brief créatif', priority: 'haute', estimatedTime: 240 },
            { name: 'Création des visuels', priority: 'haute', estimatedTime: 720 },
            { name: 'Rédaction des textes', priority: 'moyenne', estimatedTime: 480 },
            { name: 'Configuration des campagnes', priority: 'haute', estimatedTime: 360 },
            { name: 'Lancement', priority: 'haute', estimatedTime: 120 },
            { name: 'Suivi et optimisation', priority: 'moyenne', estimatedTime: 960 }
        ]
    },
    {
        id: 'event-planning',
        name: 'Organisation d\'événement',
        description: 'Planification d\'événement professionnel',
        color: '#8b5cf6',
        tasks: [
            { name: 'Définition du concept', priority: 'haute', estimatedTime: 240 },
            { name: 'Réservation du lieu', priority: 'haute', estimatedTime: 360 },
            { name: 'Liste des invités', priority: 'moyenne', estimatedTime: 240 },
            { name: 'Communication et invitations', priority: 'haute', estimatedTime: 480 },
            { name: 'Logistique et traiteur', priority: 'haute', estimatedTime: 480 },
            { name: 'Coordination le jour J', priority: 'haute', estimatedTime: 480 }
        ]
    },
    {
        id: 'product-launch',
        name: 'Lancement de Produit',
        description: 'Lancement d\'un nouveau produit',
        color: '#ec4899',
        tasks: [
            { name: 'Étude de marché', priority: 'haute', estimatedTime: 720 },
            { name: 'Développement du produit', priority: 'haute', estimatedTime: 2880 },
            { name: 'Stratégie de lancement', priority: 'haute', estimatedTime: 480 },
            { name: 'Support marketing', priority: 'moyenne', estimatedTime: 720 },
            { name: 'Formation équipe vente', priority: 'moyenne', estimatedTime: 360 },
            { name: 'Lancement officiel', priority: 'haute', estimatedTime: 240 }
        ]
    },
    {
        id: 'content-creation',
        name: 'Création de Contenu',
        description: 'Production de contenu éditorial',
        color: '#06b6d4',
        tasks: [
            { name: 'Calendrier éditorial', priority: 'haute', estimatedTime: 240 },
            { name: 'Recherche de sujets', priority: 'moyenne', estimatedTime: 360 },
            { name: 'Rédaction des articles', priority: 'haute', estimatedTime: 1440 },
            { name: 'Création des visuels', priority: 'moyenne', estimatedTime: 720 },
            { name: 'Relecture et édition', priority: 'haute', estimatedTime: 480 },
            { name: 'Publication et promotion', priority: 'moyenne', estimatedTime: 360 }
        ]
    }
];

/**
 * Tags prédéfinis
 */
const predefinedTags = [
    { name: 'urgent', color: '#ef4444', icon: 'fa-fire' },
    { name: 'bug', color: '#dc2626', icon: 'fa-bug' },
    { name: 'feature', color: '#10b981', icon: 'fa-sparkles' },
    { name: 'design', color: '#8b5cf6', icon: 'fa-palette' },
    { name: 'documentation', color: '#06b6d4', icon: 'fa-book' },
    { name: 'refactoring', color: '#f59e0b', icon: 'fa-code' },
    { name: 'tests', color: '#14b8a6', icon: 'fa-flask' },
    { name: 'sécurité', color: '#dc2626', icon: 'fa-shield-alt' },
    { name: 'performance', color: '#f59e0b', icon: 'fa-tachometer-alt' },
    { name: 'UX', color: '#ec4899', icon: 'fa-heart' }
];

/**
 * Obtenir un template par ID
 */
function getTemplate(templateId) {
    return projectTemplates.find(t => t.id === templateId);
}

/**
 * Créer un projet depuis un template
 */
function createProjectFromTemplate(templateId, customData = {}) {
    const template = getTemplate(templateId);
    if (!template) return null;

    const project = new Project({
        name: template.name,
        description: template.description,
        color: template.color,
        ...customData
    });

    // Créer les tâches du template
    const tasks = template.tasks.map((taskData, index) => {
        return new Task({
            name: taskData.name,
            project: project.id,
            priority: taskData.priority,
            estimatedTime: taskData.estimatedTime,
            status: 'à faire'
        });
    });

    return { project, tasks };
}
