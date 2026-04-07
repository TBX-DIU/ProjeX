# 🚀 ProjeX - Outil de Gestion de Projet Amélioré

## 📋 Vue d'ensemble

ProjeX est un outil de gestion de projet moderne et complet, entièrement refactoré avec une **architecture modulaire MVC** et de nombreuses **nouvelles fonctionnalités**.

## ✨ Nouvelles Fonctionnalités

### 🎨 Interface & Expérience Utilisateur
- **Mode Sombre/Clair** : Basculez entre les thèmes avec détection automatique des préférences système
- **Recherche Avancée** : Recherche en temps réel dans tous les projets, tâches et membres
- **Notifications Toast** : Système de notifications élégantes et non-intrusives
- **Animations Fluides** : Transitions et animations améliorées pour une expérience plus agréable

### 💾 Gestion des Données
- **Persistance LocalStorage** : Toutes vos données sont sauvegardées automatiquement
- **Export/Import JSON** : Exportez et importez vos données facilement
- **Historique des Modifications** : Suivez les 50 dernières modifications
- **Auto-sauvegarde** : Sauvegarde automatique avec debouncing pour éviter la surcharge

### 📊 Analytiques & Visualisation
- **Page Analytiques Dédiée** avec 4 graphiques :
  - Progression des projets actifs
  - Répartition des tâches par statut
  - Charge de travail par membre
  - Activité sur les 30 derniers jours
- **Timeline Gantt** : Visualisation chronologique des projets
- **Graphiques Interactifs** : Utilisation de Chart.js pour des graphiques dynamiques

### 🔧 Fonctionnalités Avancées
- **Templates de Projets** : 6 templates prédéfinis (Web, Mobile, Marketing, etc.)
- **Tags Personnalisés** : Organisez vos projets et tâches avec des tags
- **Dépendances entre Tâches** : Gérez les dépendances complexes
- **Commentaires & Pièces Jointes** : Ajoutez du contexte à vos tâches
- **Temps Estimé vs Réel** : Suivez le temps passé sur chaque tâche

## 🏗️ Architecture Technique

### Structure Modulaire

```
js/
├── models/              # Modèles de données
│   ├── Project.js       # Modèle Projet
│   ├── Task.js          # Modèle Tâche
│   └── Member.js        # Modèle Membre
│
├── store/               # Gestion d'état centralisée
│   └── Store.js         # Store avec pattern Observer
│
├── services/            # Services réutilisables
│   ├── StorageService.js        # Persistance LocalStorage
│   ├── NotificationService.js   # Système de notifications
│   ├── ChartService.js          # Création de graphiques
│   └── ThemeService.js          # Gestion des thèmes
│
├── utils/               # Utilitaires
│   ├── helpers.js       # Fonctions utilitaires
│   └── templates.js     # Templates prédéfinis
│
├── components/          # Composants UI
│   ├── GanttTimeline.js     # Timeline Gantt
│   └── SearchComponent.js   # Recherche avancée
│
└── app-new.js           # Application principale
```

### Patterns Utilisés

- **MVC (Model-View-Controller)** : Séparation claire des responsabilités
- **Observer Pattern** : Gestion réactive de l'état avec le Store
- **Singleton** : Services uniques (StorageService, ThemeService, etc.)
- **Factory Pattern** : Création de projets depuis templates

### Caractéristiques Techniques

- **Pas de framework** : JavaScript vanilla pour les performances
- **Modulaire** : Code organisé en modules réutilisables
- **Type-safe** : Validation des données avec les modèles
- **Performant** : Debouncing et throttling pour les opérations coûteuses
- **Responsive** : Interface adaptée à tous les écrans

## 🎯 Fonctionnalités Principales

### Gestion de Projets
- ✅ Création, modification, suppression de projets
- ✅ Statuts : Planifié, En cours, En pause, Terminé
- ✅ Priorités : Basse, Moyenne, Haute
- ✅ Progression automatique calculée depuis les tâches
- ✅ Dates de début et de fin avec calcul des jours restants
- ✅ Attribution de membres à chaque projet
- ✅ Couleurs personnalisées
- ✅ Tags pour l'organisation
- ✅ Templates prédéfinis

### Gestion de Tâches
- ✅ Kanban avec drag & drop
- ✅ Statuts : À faire, En cours, Terminé
- ✅ Priorités multiples
- ✅ Dates d'échéance avec détection des retards
- ✅ Progression en pourcentage
- ✅ Attribution à des membres
- ✅ Dépendances entre tâches
- ✅ Temps estimé vs temps réel
- ✅ Commentaires et historique
- ✅ Pièces jointes (métadonnées)

### Gestion d'Équipe
- ✅ Création de membres
- ✅ Rôles et départements
- ✅ Calcul de la charge de travail
- ✅ Compétences et disponibilité
- ✅ Attribution automatique de couleurs

## 📦 Modèles de Données

### Projet
```javascript
{
  id: number,
  name: string,
  description: string,
  color: string,
  status: 'planifié' | 'en cours' | 'en pause' | 'terminé',
  priority: 'basse' | 'moyenne' | 'haute',
  startDate: Date,
  endDate: Date,
  members: number[],
  progress: number,
  tags: string[],
  template: string | null,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Tâche
```javascript
{
  id: number,
  name: string,
  description: string,
  project: number,
  assignee: number,
  status: 'à faire' | 'en cours' | 'terminé',
  priority: 'basse' | 'moyenne' | 'haute',
  dueDate: Date,
  progress: number,
  tags: string[],
  dependencies: number[],
  estimatedTime: number,
  actualTime: number,
  comments: Comment[],
  attachments: Attachment[],
  createdAt: timestamp,
  updatedAt: timestamp,
  completedAt: timestamp | null
}
```

### Membre
```javascript
{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  department: string,
  avatar: string | null,
  color: string,
  skills: string[],
  availability: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🚀 Utilisation

### Pré-requis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- JavaScript activé

### Installation
1. Clonez ou téléchargez les fichiers
2. Ouvrez `index.html` dans votre navigateur
3. C'est tout ! Aucune installation ou compilation nécessaire

### Raccourcis Clavier
- `Ctrl/Cmd + K` : Ouvrir la recherche (à venir)
- `Ctrl/Cmd + N` : Nouveau projet/tâche (à venir)

## 💡 Avantages de la Nouvelle Architecture

### Maintenabilité
- Code organisé et modulaire
- Séparation des préoccupations (logique / UI)
- Facilité d'ajout de nouvelles fonctionnalités
- Tests unitaires possibles

### Performance
- Chargement initial rapide
- Pas de dépendances lourdes
- Optimisations (debouncing, throttling)
- Gestion efficace de l'état

### Extensibilité
- Architecture ouverte pour plugins
- Services interchangeables
- Composants réutilisables
- API claire et documentée

## 🎨 Personnalisation

### Thèmes
Le mode sombre/clair est automatiquement détecté selon les préférences système. Vous pouvez basculer manuellement avec le bouton dans la barre supérieure.

### Templates
Six templates de projets sont fournis :
1. **Développement Web** : Site web ou application web
2. **Application Mobile** : iOS/Android
3. **Campagne Marketing** : Campagne publicitaire
4. **Organisation d'Événement** : Planification d'événement
5. **Lancement de Produit** : Nouveau produit
6. **Création de Contenu** : Production éditoriale

## 📊 Graphiques & Analytics

### Dashboard
- Carte de progression des projets actifs
- Répartition des tâches (À faire, En cours, Terminé)

### Page Analytics
- 4 graphiques interactifs
- Données en temps réel
- Visualisation claire et professionnelle

### Timeline Gantt
- Vue chronologique des projets
- Barres de progression visuelles
- Dates de début et de fin
- Détails au survol

## 🔄 Import/Export

### Export
1. Cliquez sur le bouton "Export" (icône téléchargement)
2. Un fichier JSON sera téléchargé avec toutes vos données
3. Format : `projex-export-YYYY-MM-DD.json`

### Import
1. Cliquez sur le bouton "Import" (icône upload)
2. Sélectionnez un fichier JSON d'export
3. Vos données seront restaurées

**⚠️ Attention** : L'import remplace toutes les données actuelles

## 🐛 Résolution de Problèmes

### Les données ne se sauvent pas
- Vérifiez que localStorage est activé dans votre navigateur
- Vérifiez le stockage disponible (quota)

### Les graphiques ne s'affichent pas
- Vérifiez votre connexion internet (Chart.js est chargé via CDN)
- Ouvrez la console pour voir les erreurs

### Le mode sombre ne fonctionne pas
- Vérifiez les préférences système de votre OS
- Essayez de basculer manuellement avec le bouton

## 🚧 Améliorations Futures

### Fonctionnalités Prévues
- [ ] Collaboration en temps réel
- [ ] Notifications push
- [ ] Backend API (optionnel)
- [ ] Authentification multi-utilisateur
- [ ] Export PDF des rapports
- [ ] Intégrations (Google Calendar, Slack, etc.)
- [ ] Vue Sprint/Itération Agile
- [ ] Burndown charts
- [ ] Gestion des budgets
- [ ] Suivi du temps intégré

### Améliorations Techniques
- [ ] Service Worker pour le mode hors ligne
- [ ] Tests unitaires avec Jest
- [ ] Tests E2E avec Playwright
- [ ] Build avec Vite/Webpack
- [ ] TypeScript pour plus de sécurité

## 📝 Licence

Ce projet est open-source. Vous êtes libre de l'utiliser et le modifier selon vos besoins.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 💬 Support

Pour toute question ou aide :
1. Consultez cette documentation
2. Ouvrez une issue sur GitHub
3. Contactez l'équipe de développement

---

**Made with ❤️ by ProjeX Team**
