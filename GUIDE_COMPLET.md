# 🚀 ProjeX - Guide Complet

**ProjeX** est une application web complète de gestion de projet développée avec une architecture moderne et modulaire. Conçu pour gérer des projets complexes avec une approche Agile/Scrum, cet outil offre une expérience utilisateur intuitive et des fonctionnalités avancées.

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Architecture technique](#-architecture-technique)
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Pages et interfaces](#-pages-et-interfaces)
- [Gestion des projets](#-gestion-des-projets)
- [Gestion des tâches](#-gestion-des-tâches)
- [Backlog et méthodologie Agile](#-backlog-et-méthodologie-agile)
- [Analytiques et rapports](#-analytiques-et-rapports)
- [Fonctionnalités avancées](#-fonctionnalités-avancées)
- [Import/Export](#-importexport)
- [Thèmes et personnalisation](#-thèmes-et-personnalisation)
- [Guide d'utilisation](#-guide-dutilisation-rapide)

---

## 🎯 Vue d'ensemble

ProjeX est un outil de gestion de projet qui combine :
- **Gestion de projets** avec suivi budgétaire et dates de MEP (Mise En Production)
- **Gestion de tâches** avec système Kanban et hiérarchie Agile (Epic → User Story → Tâche)
- **Gestion d'équipe** avec affectation et suivi de la charge de travail
- **Calendrier interactif** pour planifier et visualiser les échéances
- **Timeline Gantt** avec jalons et indicateurs de progression
- **Analytiques avancées** avec graphiques et KPIs
- **Export/Import** de données (CSV, PDF, JSON)

---

## 🏗️ Architecture technique

### Structure modulaire MVC

L'application est construite avec une architecture **MVC (Model-View-Controller)** modulaire :

```
📁 Project Management
├── 📁 js/
│   ├── 📁 models/           # Modèles de données
│   │   ├── Project.js       # Modèle Projet
│   │   ├── Task.js          # Modèle Tâche
│   │   └── Member.js        # Modèle Membre
│   ├── 📁 services/         # Services métier
│   │   ├── StorageService.js      # Gestion LocalStorage
│   │   ├── NotificationService.js # Notifications toast
│   │   ├── ChartService.js        # Graphiques Chart.js
│   │   └── ThemeService.js        # Thèmes dark/light
│   ├── 📁 components/       # Composants réutilisables
│   │   ├── GanttTimeline.js       # Timeline Gantt
│   │   └── SearchComponent.js     # Recherche universelle
│   ├── 📁 store/            # Gestion d'état centralisée
│   │   └── Store.js         # Store avec pattern Observer
│   ├── 📁 utils/            # Utilitaires
│   │   ├── helpers.js       # Fonctions utilitaires
│   │   └── templates.js     # Templates HTML
│   └── app-new.js           # Application principale (Controller)
├── index.html               # Point d'entrée
├── style.css                # Styles de base
└── styles-extended.css      # Styles étendus
```

### Technologies utilisées

- **JavaScript ES6+** : Classes, modules, async/await
- **Chart.js 4.4.0** : Graphiques et visualisations
- **Font Awesome 6.4.0** : Icônes
- **LocalStorage** : Persistance des données côté client
- **CSS Variables** : Système de thèmes dynamiques
- **Pattern Observer** : Réactivité de l'interface

### Caractéristiques techniques

- ✅ **Architecture MVC** avec séparation des responsabilités
- ✅ **Store centralisé** avec pattern Observer pour la réactivité
- ✅ **Auto-sauvegarde** avec debounce (1000ms)
- ✅ **Services singleton** pour les fonctionnalités transverses
- ✅ **Composants réutilisables** (Timeline, Recherche)
- ✅ **Gestion d'erreurs** et notifications utilisateur
- ✅ **Responsive design** adapté mobile/tablette/desktop

---

## ✨ Fonctionnalités principales

### 1. 📊 Tableau de bord

Page d'accueil avec vue d'ensemble :

**Statistiques en temps réel** :
- Nombre total de projets
- Tâches terminées
- Tâches en cours
- Tâches en retard

**Widgets** :
- **Projets récents** : Aperçu des derniers projets actifs
- **Tâches urgentes** : Liste des tâches à échéance proche
- **Activités récentes** : Historique des actions (créations, modifications)

**Graphiques analytiques** :
- Progression des projets actifs (barres)
- Charge de travail par membre (barres)
- Timeline d'activité par jour (ligne)

### 2. 📁 Gestion des projets

**Modes d'affichage** :
- **Vue Grid** : Cartes visuelles avec code couleur
- **Vue Liste** : Format compact avec détails

**Filtres avancés** :
- Par statut (planifié, en cours, en pause, terminé)
- Par priorité (haute, moyenne, basse)

**Informations projet** :
- Nom et description
- Couleur personnalisée (8 couleurs disponibles)
- Statut et priorité
- Dates (début, fin, MEP)
- Budget et dépenses réelles
- Membres assignés avec avatars
- Barre de progression visuelle
- Liens SharePoint organisés hiérarchiquement

**Actions disponibles** :
- ➕ Créer un nouveau projet
- ✏️ Modifier un projet existant
- 🗑️ Supprimer un projet (avec confirmation)
- 🔗 Voir tous les liens SharePoint du projet (modal dédiée)

### 3. ✅ Gestion des tâches

#### Vue Kanban

Tableau Kanban avec **4 colonnes** :
- **À faire** : Tâches en backlog
- **En cours** : Tâches actives
- **Bloqué** : Tâches bloquées avec raison
- **Terminé** : Tâches complétées

**Fonctionnalités Kanban** :
- 🖱️ **Drag & Drop** : Déplacer les tâches entre colonnes
- 🔢 **Compteurs** : Nombre de tâches par colonne
- 🎨 **Codes couleur** : Badges de priorité et statut
- 👤 **Assignation** : Initiales du membre assigné
- 📅 **Échéances** : Dates avec indicateur de retard
- 🚫 **Indicateur de blocage** : Icône et raison visible

#### Modal de visualisation détaillée

**Clic sur une tâche** → Ouverture d'une modal complète avec **toutes les informations** :

**📋 Informations principales** :
- Nom et description
- Type (fonctionnalité, bug, amélioration, tâche, spike, documentation)
- Statut et priorité (badges colorés)
- Barre de progression (0-100%)

**🏗️ Structure Backlog** :
- Epic (📦)
- User Story (📋)

**🎯 Domaine et contexte** :
- Domaine métier
- Sous-domaine

**💡 Hypothèse et solution** :
- Hypothèse initiale
- Solution proposée

**✅ Critères d'acceptation** :
- Liste des critères (multiligne)

**⚠️ Risques identifiés** :
- Description des risques (encadré rouge)

**🔗 Dépendances** :
- Liens avec d'autres tâches

**⏱️ Estimation** :
- Jours estimés
- Heures estimées
- Story Points (Fibonacci: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)

**📅 Planning et affectation** :
- Projet parent
- Membre assigné (avec avatar coloré)
- Date de début
- Date d'échéance (indicateur de retard en rouge)

**🚫 Section Blocage** (si bloqué) :
- Raison du blocage (encadré rouge)

**⚡ Actions rapides** :
Boutons pour changer le statut **instantanément** :
- 🔵 **À faire** (gris) - Remettre en backlog
- 🔄 **En cours** (bleu) - Démarrer la tâche
- 🚫 **Bloquer** (rouge) - Bloquer avec demande de raison
- ✅ **Terminer** (vert) - Marquer comme terminé (met à 100%)

**Comportement intelligent** :
- Bloquer → demande la raison automatiquement
- Débloquer → efface la raison du blocage
- Terminer → progression mise à 100%
- Modal rechargée automatiquement après changement
- Kanban rafraîchi instantanément

#### Modal d'édition

Formulaire complet **organisé en 9 sections** :

1. **Informations générales**
   - Nom de la tâche (requis)
   - Description détaillée (textarea)
   - Type de tâche (select)

2. **Hiérarchie Agile**
   - Epic (texte)
   - User Story (texte)

3. **Classification**
   - Domaine (texte)
   - Sous-domaine (texte)

4. **Analyse**
   - Hypothèse (textarea)
   - Solution proposée (textarea)

5. **Critères d'acceptation**
   - Zone de texte multiligne

6. **Risques**
   - Identification des risques (textarea)

7. **Planification**
   - Projet parent (select, requis)
   - Membre assigné (select)
   - Date de début (date picker)
   - Date d'échéance (date picker)

8. **Estimation**
   - Jours (nombre)
   - Heures (nombre)
   - Story Points (select Fibonacci)

9. **Statut et progression**
   - Statut (select : à faire, en cours, bloqué, terminé)
   - Priorité (select : haute, moyenne, basse)
   - Progression (slider 0-100%)
   - Raison du blocage (textarea, si statut = bloqué)
   - Dépendances (IDs séparés par virgules)

**Taille de modal** : 700px de large (optimisé desktop)

**Validation** :
- Nom requis
- Projet requis
- Raison de blocage requise si statut = "bloqué"

#### Filtres de tâches

- Par statut
- Par priorité
- Par projet
- **Mode Focus** : Filtrer par membre (🎯)

#### Actions

- ➕ Créer une nouvelle tâche
- ✏️ Modifier une tâche
- 🗑️ Supprimer une tâche (avec confirmation)
- 👁️ Visualiser tous les détails (clic sur carte)
- ⚡ Changement rapide de statut (actions rapides)

### 4. 👥 Gestion d'équipe

Interface pour gérer les membres de l'équipe :

**Vue en cartes** avec :
- Avatar avec initiales colorées (génération automatique)
- Nom et prénom
- Rôle et compétences
- Email
- Nombre de tâches assignées

**Informations membre** :
- Nom complet
- Rôle dans l'équipe
- Compétences techniques
- Email de contact
- Couleur d'identification unique (automatique)

**Actions** :
- ➕ Ajouter un membre
- ✏️ Modifier les informations
- 🗑️ Supprimer un membre (avec confirmation)

### 5. 📅 Calendrier

Calendrier interactif mensuel :

**Navigation** :
- Boutons ← → pour changer de mois
- Affichage du mois/année courant

**Fonctionnalités** :
- Vue mensuelle avec grille 7 jours
- Affichage des événements (tâches à échéance)
- Indicateur du jour actuel (bordure bleue)
- **Clic sur un jour** → Création rapide de tâche avec date pré-remplie
- Notification confirmant la date sélectionnée

**Visualisation** :
- Tâches du jour affichées sur les cellules
- Couleur selon la priorité
- Icône selon le type de tâche
- Limite de 3 tâches affichées (+ compteur si plus)

### 6. 📈 Timeline Gantt

Vue chronologique des projets :

**Affichage** :
- Barres horizontales pour chaque projet
- Durée visualisée (date début → date fin)
- Progression (remplissage de la barre avec couleur du projet)
- Nom du projet sur la gauche

**Jalons spéciaux** :
- 🚀 **MEP (Mise En Production)** : Milestone rouge avec date exacte
- ✓ **Fin de projet** : Milestone vert

**Indicateurs temporels** (en haut de chaque barre) :
- **Jours restants jusqu'à la MEP** (si définie)
  - Vert : > 30 jours
  - Orange : 10-30 jours
  - Rouge : < 10 jours
- **Jours restants jusqu'à la fin**
  - Même code couleur

**Interaction** :
- Survol : Affichage des détails
- Échelle temporelle proportionnelle
- Scroll horizontal si nombreux projets

### 7. 📊 Analytiques

Page de visualisation avancée avec **4 graphiques** :

**1. Progression des projets**
- Type : Barres horizontales
- Affiche : Chaque projet avec son % de progression
- Couleurs : Code couleur unique par projet
- Tri : Par progression croissante

**2. Répartition des tâches**
- Type : Camembert (Doughnut)
- Affiche : Distribution par statut
  - À faire (gris)
  - En cours (bleu)
  - Bloqué (rouge)
  - Terminé (vert)
- Centre : Total de tâches

**3. Charge de travail par membre**
- Type : Barres verticales
- Affiche : Nombre de tâches par membre
- Couleurs : Couleur unique du membre
- Tri : Par charge décroissante

**4. Timeline d'activité**
- Type : Ligne
- Affiche : Nombre d'actions par jour (30 derniers jours)
- Couleur : Dégradé bleu
- Axe X : Dates
- Axe Y : Nombre d'activités

**Interactivité** :
- Hover : Affichage des valeurs exactes
- Responsive : S'adapte à la taille de l'écran
- Légendes : Cliquables pour filtrer

---

## 📦 Backlog et méthodologie Agile

### Structure hiérarchique

ProjeX supporte une **hiérarchie Agile complète** :

```
Epic (📦) - Initiative majeure
└── User Story (📋) - Besoin utilisateur
    └── Tâche - Unité de travail
        ├── Description
        ├── Critères d'acceptation
        ├── Risques
        ├── Estimation (j/h/SP)
        └── Dépendances
```

### Champs backlog

**Organisation** :
- **Epic** : Fonctionnalité majeure ou initiative stratégique (ex: "Système de paiement")
- **User Story** : Besoin utilisateur spécifique (ex: "En tant qu'utilisateur, je veux payer par carte")
- **Type** : Feature, Bug, Amélioration, Tâche, Spike, Documentation
- **Domaine** : Domaine métier (ex: "E-commerce", "Authentification")
- **Sous-domaine** : Spécialisation (ex: "Paiement", "OAuth")

**Analyse** :
- **Hypothèse** : Hypothèse de départ ou problématique
- **Solution** : Solution technique proposée
- **Critères d'acceptation** : Conditions de validation (format GIVEN/WHEN/THEN recommandé)
- **Risques** : Risques identifiés et impact potentiel

**Estimation** :
- **Jours** : Estimation en jours/homme
- **Heures** : Estimation en heures
- **Story Points** : Complexité relative (suite de Fibonacci: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)

**Liens** :
- **Dépendances** : IDs des tâches dont celle-ci dépend (ex: "12, 45, 67")

### Export Backlog

#### Export CSV (Excel)

Format : **26 colonnes** avec toutes les données :

**Colonnes** :
1. ID
2. Titre
3. Type
4. Epic
5. User Story
6. Description
7. Domaine
8. Sous-domaine
9. Statut
10. Priorité
11. Projet
12. Assigné à
13. Hypothèse
14. Solution
15. Critères d'acceptation
16. Risques
17. Dépendances
18. Estimation (j)
19. Estimation (h)
20. Story Points
21. Date début
22. Date échéance
23. Progression (%)
24. Bloqué
25. Raison blocage
26. Créée le
27. Modifiée le

**Format** : CSV UTF-8 avec séparateur point-virgule
**Nom fichier** : `backlog-projex-YYYY-MM-DD.csv`
**Utilisation** : Excel, Google Sheets, import Jira

#### Export PDF

Format : **Cartes détaillées** professionnelles

**Mise en page** :
- Format carte élégant par tâche
- Évite les coupures de page (page-break-inside: avoid)
- Fond blanc pour impression
- Bouton "Imprimer/Sauver en PDF" intégré

**Chaque tâche affichée avec** :

**En-tête** :
- ID (badge bleu)
- Titre (h3)
- Badges : Statut (coloré) + Priorité (coloré)

**Sections** :
- **Description** (si présente)
  - Fond gris clair
  - Bordure gauche grise

- **Métadonnées** (3 lignes)
  - Epic, User Story, Domaine, Sous-domaine
  - Projet, Assigné, Échéance
  - Estimation (jours, heures, SP), Progression

- **Hypothèse** (si présente)
  - Label en majuscules
  - Fond gris clair

- **Solution proposée** (si présente)
  - Label en majuscules
  - Fond gris clair

- **Critères d'acceptation** (si présents)
  - Label en majuscules
  - Fond gris clair
  - Retours à la ligne préservés

- **Risques identifiés** (si présents)
  - Label avec ⚠️
  - **Fond rouge clair**
  - **Bordure gauche rouge**

- **Dépendances** (si présentes)
  - Label en majuscules
  - Fond gris clair

- **Blocage** (si bloqué)
  - Label avec 🚫
  - **Fond rouge clair**
  - **Bordure gauche rouge foncé**
  - **Texte rouge foncé en gras**

**Styles** :
- Police : Segoe UI (professionnelle)
- Tailles : 10pt (body), 13pt (titres tâches)
- Couleurs statut :
  - À faire : gris
  - En cours : bleu
  - Bloqué : rouge
  - Terminé : vert
- Couleurs priorité :
  - Haute : rouge
  - Moyenne : orange
  - Basse : gris

**Bouton d'impression** :
- Visible à l'écran (masqué impression)
- Couleur : Indigo (#4f46e5)
- Texte : "🖨️ Imprimer / Sauver en PDF"

**Utilisation** :
1. Clic sur "Exporter Backlog" → PDF
2. Nouvelle fenêtre s'ouvre avec aperçu
3. Clic sur "Imprimer/Sauver en PDF" ou Ctrl+P
4. Choisir "Microsoft Print to PDF" ou imprimante

---

## 🔗 Fonctionnalités avancées

### Liens SharePoint

**Sur chaque projet** : Gestion de liens organisés vers SharePoint ou autres documents

**Structure hiérarchique** :
- **Chemin** : Arborescence (ex: `Projet/Layout/Traductions`)
- **Label** : Nom descriptif du document
- **URL** : Lien complet vers le fichier

**Dans le formulaire projet** :
- Section "Liens SharePoint"
- Bouton "➕ Ajouter un lien"
- Champs dynamiques :
  - Chemin (text)
  - Label (text)
  - URL (url)
- Bouton "🗑️" pour supprimer un lien
- Sauvegarde avec le projet

**Affichage sur carte projet** :
- Les 3 premiers liens visibles (compacts)
- Compteur "+X autre(s)" si > 3 liens
- **Bouton "Voir les liens SharePoint (X)"** pour tous les voir

**Modal de visualisation des liens** :
- Titre : "Liens SharePoint - [Nom du projet]"
- Liste complète de tous les liens
- **Chaque lien affiché avec** :
  - Icône 📁 (dégradé bleu)
  - Chemin hiérarchique avec flèches →
  - Label (titre gras)
  - URL complète (fond gris, police monospace)
  - Boutons d'action :
    - 🔗 **Ouvrir** (bleu, nouvel onglet)
    - 📋 **Copier** (gris, copie l'URL dans le presse-papier)

**Design** :
- Carte avec bordure
- Hover : bordure bleue + ombre
- Responsive : adapt mobile

### Système de notifications

**Centre de notifications** accessible via icône 🔔 en haut à droite :

**Badge de compteur** :
- Cercle rouge en haut à droite de l'icône
- Affiche le nombre de notifications (max 99+)
- Masqué si aucune notification

**Dropdown** :
- **Clic sur icône** → Toggle du menu
- Position : Absolute, en dessous de l'icône
- Largeur : 380px
- Max-height : 500px (scrollable)
- Animation : slideDown

**Contenu** :
- En-tête :
  - Titre "Notifications"
  - Bouton "Effacer tout"
- Liste des **10 dernières activités** (ordre inverse)
- Chaque notification avec :
  - Icône colorée selon le type
  - Message descriptif (texte HTML supporté)
  - Temps écoulé ("Il y a 2h", "Il y a 5 min", "Il y a 3j")

**Types de notifications** :
- 📁 **Projet** (bleu) : fa-folder
- ✅ **Tâche** (vert) : fa-check-circle
- 👤 **Membre** (bleu) : fa-user
- 💬 **Commentaire** (orange) : fa-comment
- ⚠️ **Alerte** (rouge) : fa-exclamation-triangle
- ✓ **Succès** (vert) : fa-check-circle
- ℹ️ **Info** (bleu) : fa-info-circle

**État vide** :
- Icône 🔕 (grande)
- Message "Aucune nouvelle notification"
- Centré verticalement/horizontalement

**Actions** :
- 🗑️ **Effacer tout** : Vider les notifications (avec confirmation)
- **Clic extérieur** : Ferme automatiquement le dropdown

**Génération automatique** :
- Création projet → Notification
- Création tâche → Notification
- Modification → Notification
- Suppression → Notification
- Sauvegardées dans `store.state.activities`

### Recherche universelle

**Barre de recherche** en haut à droite :

**Interface** :
- Icône 🔍
- Champ de texte : "Rechercher..."
- Width : 300px (desktop)

**Recherche multicritères** dans :
- Nom de projet
- Description de projet
- Nom de tâche
- Description de tâche
- Nom de membre
- Compétences de membre

**Fonctionnalités** :
- Recherche en temps réel (keyup)
- Case-insensitive
- Multi-mots supportés
- Résultats groupés par type

**Résultats** :
- Dropdown avec sections :
  - Projets trouvés
  - Tâches trouvées
  - Membres trouvés
- Clic sur résultat :
  - Projet → Va à la page Projets
  - Tâche → Ouvre la modal de visualisation
  - Membre → Va à la page Équipe

### Mode Focus

**Filtrage par membre** :

**Activation** :
- Via bouton "🎯 Mode Focus" (ou avatar membre)
- Sélection du membre dans un select
- Badge indiquant le mode actif

**Comportement** :
- **Filtre toutes les tâches** pour ne garder que celles assignées au membre
- Affichage : "Mode Focus : [Nom du membre]"
- Combinable avec autres filtres (statut, priorité, projet)

**Désactivation** :
- Clic sur "❌ Désactiver Focus"
- Retour à la vue complète

**Utilisation** :
- Daily standup (chacun voit ses tâches)
- Revue individuelle
- Suivi personnel

### Gestion du statut "Bloqué"

**Fonctionnalités spéciales** :

**Lors du blocage** :
- Icône 🚫 ajoutée sur la carte Kanban
- **Champ "Raison du blocage" devient obligatoire**
- Carte déplacée dans colonne "Bloqué"
- Bordure rouge sur la carte
- Raison affichée en rouge sous le titre

**Affichage** :
- Badge rouge "bloqué"
- Encadré rouge avec la raison
- Dans la modal de visualisation : section dédiée avec bordure rouge
- Dans l'export PDF : section bloquage en rouge

**Lors du déblocage** :
- Raison effacée automatiquement
- Carte redevient normale
- Déplacement vers nouvelle colonne

**Actions rapides** :
- Bouton "🚫 Bloquer" dans modal de visualisation
- Demande automatiquement la raison (prompt)
- Si raison vide → Annulation du blocage

### Budget et suivi financier

**Sur les projets** :

**Champs** :
- **Budget initial** : Montant alloué au projet
- **Dépenses réelles** : Montant déjà dépensé

**Affichage** :
- Sur la carte projet (optionnel)
- Dans le formulaire d'édition
- Format : € (euros par défaut)

**Calculs** :
- % du budget consommé
- Reste disponible
- Alerte si dépassement (rouge)

**Utilisation** :
- Gestion de projet avec contrainte budgétaire
- Suivi des coûts
- Reporting financier

---

## 💾 Import/Export

### Export de données

**1. Export JSON complet** :
- **Bouton** : "💾 Exporter les données" (page Paramètres)
- **Contenu** : TOUTES les données de l'application
  - Projets (avec liens)
  - Tâches (avec tous les champs backlog)
  - Membres
  - Activités
  - Paramètres
- **Format** : JSON
- **Nom fichier** : `projex-backup-YYYY-MM-DD.json`
- **Utilisation** :
  - Sauvegarde complète
  - Transfert vers autre navigateur/machine
  - Archive historique

**2. Export Backlog CSV** :
- **Bouton** : "📤 Exporter Backlog" → CSV
- **Contenu** : 26 colonnes avec tous les champs de tâches
- **Format** : CSV UTF-8, séparateur point-virgule
- **Nom fichier** : `backlog-projex-YYYY-MM-DD.csv`
- **Utilisation** :
  - Import dans Excel/Google Sheets
  - Analyse de données
  - Import dans Jira/Azure DevOps

**3. Export Backlog PDF** :
- **Bouton** : "📤 Exporter Backlog" → PDF
- **Contenu** : Cartes détaillées professionnelles
- **Format** : HTML optimisé pour impression
- **Utilisation** :
  - Impression papier
  - Sauvegarde PDF (Ctrl+P → Microsoft Print to PDF)
  - Présentation stakeholders
  - Documentation projet

### Import de données

**Import JSON** :
- **Bouton** : "📥 Importer les données" (page Paramètres)
- **Action** :
  1. Sélection du fichier JSON (input file)
  2. Validation du format
  3. Confirmation (⚠️ écrase les données actuelles)
  4. Restauration complète
  5. Notification de succès
- **Utilisation** :
  - Restauration d'un backup
  - Migration de données
  - Récupération après problème

**Gestion d'erreurs** :
- Fichier invalide → Message d'erreur
- Format incorrect → Erreur détaillée
- Données corrompues → Rollback automatique

---

## 🎨 Thèmes et personnalisation

### Thèmes

**2 thèmes disponibles** :
- ☀️ **Clair** : Fond blanc (#ffffff), texte noir
- 🌙 **Sombre** : Fond noir (#0f172a), texte blanc

**Variables CSS** utilisées :
- `--background` : Fond principal
- `--bg-card` : Fond des cartes
- `--bg` : Fond secondaire
- `--text` : Couleur du texte principal
- `--text-light` : Texte secondaire
- `--border` : Couleur des bordures
- `--primary` : Couleur primaire (indigo)

**Détection automatique** :
- Au démarrage : détecte `prefers-color-scheme`
- Applique le thème système si non défini

**Changement manuel** :
- Bouton 🌓 en haut à droite
- Transition fluide (0.3s)
- Sauvegarde du choix dans LocalStorage
- Persistance entre sessions

**Service** : `ThemeService.js`
- Méthode : `init()`, `toggle()`
- Event listeners sur changement système

### Couleurs des projets

**8 couleurs disponibles** pour personnaliser :

1. 🟣 **Indigo** (#4f46e5) - Par défaut
2. 🔵 **Bleu** (#3b82f6)
3. 🟢 **Vert** (#10b981)
4. 🟡 **Jaune** (#f59e0b)
5. 🔴 **Rouge** (#ef4444)
6. 🟣 **Violet** (#8b5cf6)
7. 🩷 **Rose** (#ec4899)
8. ⚫ **Gris** (#6b7280)

**Utilisation** :
- Picker de couleur dans formulaire projet (8 cercles cliquables)
- Affichée sur :
  - Carte projet (--project-color CSS variable)
  - Barre de progression
  - Bordure latérale (vue liste)
  - Barres Gantt
  - Graphiques
- Permet de différencier visuellement les projets

### Couleurs des membres

**Génération automatique** :
- Basée sur l'ID du membre
- Algorithme : HSL avec variation de teinte
- Formule : `hsl(${(id * 137) % 360}, 70%, 60%)`

**Utilisation** :
- Avatar avec initiales colorées
- Identification rapide dans :
  - Cartes de tâches
  - Liste d'équipe
  - Graphiques de charge
  - Assignation dans modals

**Avantage** :
- Pas besoin de choisir manuellement
- Toujours cohérent pour un membre
- Visibilité optimale

---

## 📱 Responsive Design

**Adapté à tous les écrans** :

### Desktop (> 1024px)

**Layout** :
- Sidebar fixe à gauche (250px)
- Contenu principal à droite
- Header fixe en haut
- Grilles multi-colonnes

**Optimisations** :
- Vue Grid : 3 colonnes
- Kanban : 4 colonnes visibles
- Modals : 700px de large
- Graphiques : Taille complète
- Tooltips au survol

### Tablette (768px - 1024px)

**Layout** :
- Sidebar repliable (bouton hamburger)
- Contenu pleine largeur
- Grilles 2 colonnes

**Optimisations** :
- Vue Grid : 2 colonnes
- Kanban : 4 colonnes (scroll horizontal)
- Modals : 90% de largeur
- Graphiques : Adaptés
- Touch-friendly

### Mobile (< 768px)

**Layout** :
- Sidebar en overlay (masquée par défaut)
- Bouton hamburger visible
- Contenu pleine largeur
- Single column

**Optimisations** :
- Vue Grid : 1 colonne (force la vue liste)
- Kanban : Scroll horizontal (touch + swipe)
- Modals : Plein écran (100%)
- Graphiques : Hauteur réduite
- Boutons plus grands (touch targets 44px min)
- Formulaires : Champs empilés
- Padding réduit pour maximiser l'espace

**Gestes** :
- Swipe gauche/droite : Navigation Kanban
- Drag & drop : Fonctionne en touch
- Pinch to zoom : Graphiques
- Pull to refresh : (non implémenté)

---

## 🔒 Stockage des données

### LocalStorage

**Technologie** :
- API Web Storage (LocalStorage)
- Capacité : ~5-10 Mo (varie selon navigateur)
- Persistance : Permanente (jusqu'à suppression manuelle)

**Structure de stockage** :
```json
{
  "projex_state": {
    "projects": [...],
    "tasks": [...],
    "members": [...],
    "activities": [...],
    "settings": {...}
  }
}
```

**Auto-sauvegarde** :
- Déclenchée à chaque modification de l'état
- Debounce de 1000ms (évite surcharge)
- Sérialisation JSON automatique
- Gestion d'erreurs (quota exceeded)

**Sécurité** :
- Données stockées **localement uniquement**
- Pas de transmission réseau
- Isolées par domaine (origin)
- Accessibles uniquement par l'application

**Limitations** :
- ⚠️ Pas de synchronisation multi-appareils
- ⚠️ Suppression si cache navigateur vidé
- ⚠️ Pas de versioning automatique
- ⚠️ Pas de chiffrement

**Recommandations** :
- ✅ Exporter régulièrement (backup JSON)
- ✅ Sauvegarder dans le cloud (Drive, Dropbox)
- ✅ Versionner les exports importants
- ✅ Ne pas stocker de données sensibles

---

## 🎓 Guide d'utilisation rapide

### Premier lancement

1. **Ouvrir** `index.html` dans un navigateur moderne (Chrome, Firefox, Edge, Safari)
2. **Découvrir** les données de démonstration :
   - 2 projets exemples (Refonte Site Web, Application Mobile)
   - 6 tâches exemples
   - 3 membres exemples (Alice, Bob, Charlie)
   - Activités récentes
3. **Explorer** les différentes pages via la sidebar

### Créer votre premier projet

1. **Cliquer** sur "Projets" dans la sidebar
2. **Cliquer** sur le bouton "➕ Nouveau projet" (en haut à droite)
3. **Remplir le formulaire** :
   - **Nom** : "Mon premier projet"
   - **Description** : Description détaillée
   - **Couleur** : Choisir parmi les 8 couleurs
   - **Statut** : "planifié" ou "en cours"
   - **Priorité** : "haute", "moyenne" ou "basse"
   - **Dates** :
     - Date de début (optionnel)
     - Date de fin (optionnel)
     - **Date MEP** (optionnel, pour le jalons rouge)
   - **Budget** (optionnel)
   - **Membres** : Cocher les membres assignés
   - **Liens SharePoint** (optionnel) :
     - Cliquer "➕ Ajouter un lien"
     - Chemin : ex. "Projet/Documentation"
     - Label : ex. "Cahier des charges"
     - URL : Lien complet
4. **Cliquer** "Enregistrer"
5. **Voir** le projet apparaître dans la liste

### Créer une tâche complète

1. **Aller** sur la page "Tâches"
2. **Cliquer** sur "➕ Nouvelle tâche"
3. **Remplir les 9 sections** :

   **Section 1 : Informations générales**
   - Nom : "Implémenter l'authentification"
   - Description : "Mise en place du système d'auth avec JWT"
   - Type : "Fonctionnalité"

   **Section 2 : Hiérarchie Agile**
   - Epic : "Sécurité"
   - User Story : "En tant qu'utilisateur, je veux me connecter de façon sécurisée"

   **Section 3 : Classification**
   - Domaine : "Authentification"
   - Sous-domaine : "JWT"

   **Section 4 : Analyse**
   - Hypothèse : "JWT offre un bon compromis sécurité/performance"
   - Solution : "Utilisation de jsonwebtoken avec Redis pour le refresh token"

   **Section 5 : Critères d'acceptation**
   ```
   GIVEN un utilisateur avec email/password valides
   WHEN il se connecte
   THEN il reçoit un access token JWT
   AND un refresh token stocké en httpOnly cookie
   ```

   **Section 6 : Risques**
   ```
   - Token peut être volé si XSS
   - Gestion de l'expiration complexe
   - Performance Redis à surveiller
   ```

   **Section 7 : Planification**
   - Projet : Sélectionner le projet
   - Assigné à : Sélectionner le membre
   - Date début : 2026-04-08
   - Échéance : 2026-04-15

   **Section 8 : Estimation**
   - Jours : 3
   - Heures : 24
   - Story Points : 8

   **Section 9 : Statut et progression**
   - Statut : "à faire"
   - Priorité : "haute"
   - Progression : 0%

4. **Cliquer** "Enregistrer"
5. **Voir** la tâche dans la colonne "À faire" du Kanban

### Gérer les tâches au quotidien

**Déplacer une tâche** :
- **Glisser-déposer** la carte d'une colonne à l'autre
- OU **Cliquer** sur la carte → Actions rapides → Choisir le statut

**Voir les détails** :
- **Cliquer** sur n'importe quelle carte
- Modal s'ouvre avec toutes les informations
- Sections organisées et lisibles

**Modifier une tâche** :
- **Option 1** : Cliquer sur ✏️ (bouton modifier sur la carte)
- **Option 2** : Ouvrir la visualisation → Clic "Modifier"

**Changer rapidement le statut** :
- **Ouvrir la visualisation** (clic sur carte)
- **Scroller** jusqu'à "Actions rapides"
- **Cliquer** sur le bouton du statut souhaité :
  - 🔵 À faire
  - 🔄 En cours
  - 🚫 Bloquer (demande raison)
  - ✅ Terminer (met à 100%)
- **Confirmation** automatique et rafraîchissement

**Bloquer une tâche** :
- **Actions rapides** → "🚫 Bloquer"
- **Entrer** la raison du blocage (prompt)
- Tâche déplacée en colonne "Bloqué"
- Raison visible sur la carte

**Terminer une tâche** :
- **Actions rapides** → "✅ Terminer"
- Progression mise à 100% automatiquement
- Tâche déplacée en colonne "Terminé"

**Filtrer les tâches** :
- **Par statut** : Select en haut du Kanban
- **Par priorité** : Select priorité
- **Par projet** : Select projet
- **Mode Focus** : Bouton "🎯" → Sélectionner membre → Voir uniquement ses tâches

### Planifier avec le calendrier

1. **Aller** sur "Calendrier"
2. **Naviguer** entre les mois (← →)
3. **Voir** les tâches à échéance sur les jours
4. **Créer une tâche** :
   - Cliquer sur un jour
   - Modal de création s'ouvre
   - Date d'échéance **pré-remplie** avec le jour cliqué
   - Notification confirme : "Échéance définie au X mois YYYY"

### Suivre la progression (Timeline)

1. **Aller** sur "Timeline" (page Projets → Onglet Timeline)
2. **Visualiser** :
   - Barres colorées par projet
   - Durée de chaque projet
   - Progression (remplissage)
   - Jalons MEP (🚀 rouge)
   - Fin de projet (✓ vert)
3. **Indicateurs temporels** :
   - Jours restants MEP (couleur selon urgence)
   - Jours restants fin projet

### Analyser les données

1. **Aller** sur "Analytiques"
2. **Observer** les 4 graphiques :
   - Progression par projet
   - Répartition tâches (camembert)
   - Charge par membre
   - Timeline d'activité
3. **Interpréter** :
   - Identifier les projets en retard
   - Voir les membres surchargés
   - Détecter les tendances

### Exporter le backlog

**Pour Excel/Google Sheets** :
1. Page "Tâches"
2. Bouton "📤 Exporter Backlog"
3. Choisir "CSV"
4. Fichier téléchargé automatiquement
5. Ouvrir dans Excel

**Pour impression/PDF** :
1. Page "Tâches"
2. Bouton "📤 Exporter Backlog"
3. Choisir "PDF"
4. Nouvelle fenêtre avec aperçu
5. Bouton "Imprimer/Sauver en PDF" ou Ctrl+P
6. Sélectionner "Microsoft Print to PDF"
7. Choisir emplacement et nom

### Gérer les liens SharePoint

**Ajouter des liens** :
1. Modifier un projet (✏️)
2. Section "Liens SharePoint"
3. Cliquer "➕ Ajouter un lien"
4. Remplir :
   - Chemin : "Projet/Documents/Specs"
   - Label : "Spécifications fonctionnelles"
   - URL : https://...
5. Répéter pour chaque lien
6. Enregistrer

**Voir tous les liens** :
1. Sur la carte projet : "Voir les liens SharePoint (X)"
2. Modal s'ouvre avec liste complète
3. Actions :
   - "Ouvrir" → Nouvel onglet
   - "Copier" → URL dans presse-papier

### Sauvegarder et restaurer

**Backup complet** :
1. Paramètres (⚙️ en bas de sidebar)
2. Section "Données"
3. "💾 Exporter les données"
4. Fichier JSON téléchargé
5. **Conserver** en lieu sûr (cloud recommandé)

**Restauration** :
1. Paramètres
2. "📥 Importer les données"
3. Sélectionner fichier JSON
4. Confirmer (⚠️ écrase données actuelles)
5. Données restaurées

### Gérer les notifications

**Voir les notifications** :
1. Cliquer sur 🔔 (en haut à droite)
2. Dropdown s'ouvre
3. 10 dernières activités affichées

**Effacer toutes** :
1. Dropdown ouvert
2. Bouton "Effacer tout"
3. Confirmer
4. Badge disparaît

---

## 📊 Statistiques de l'outil

**Code** :
- **17+ fichiers JavaScript** modulaires
- **~3000+ lignes de code**
- **4 modèles de données** (Project, Task, Member, Store)
- **4 services** (Storage, Notification, Chart, Theme)
- **2 composants** réutilisables (Gantt, Search)

**Fonctionnalités** :
- **7 pages** complètes (Dashboard, Projects, Tasks, Team, Calendar, Analytics, Settings)
- **26 colonnes d'export** pour le backlog CSV
- **9 sections de formulaire** pour les tâches
- **8 couleurs** de personnalisation
- **2 thèmes** (clair/sombre)

**Technologies** :
- **100%** JavaScript Vanilla (aucun framework lourd)
- **0 dépendance** serveur (tout en local)
- **Chart.js 4.4.0** pour graphiques
- **Font Awesome 6.4.0** pour icônes

**Performance** :
- **< 1 seconde** de chargement initial
- **Auto-sauvegarde** avec debounce (1000ms)
- **Responsive** design adaptatif
- **Offline-first** (fonctionne sans connexion)

---

## 🔮 Évolutions futures possibles

**Backend & Collaboration** :
- [ ] Backend Node.js + Express
- [ ] API REST complète
- [ ] Base de données (PostgreSQL / MongoDB)
- [ ] Authentification JWT multi-utilisateurs
- [ ] Collaboration temps réel (WebSocket)
- [ ] Permissions et rôles (Admin, PM, Dev, Viewer)

**Fonctionnalités avancées** :
- [ ] Commentaires sur tâches avec mentions (@user)
- [ ] Pièces jointes fichiers (upload)
- [ ] Notifications push navigateur
- [ ] Rappels automatiques (échéances)
- [ ] Templates de tâches
- [ ] Sous-tâches (checklist)
- [ ] Timetracking (temps passé vs estimé)
- [ ] Burndown chart / Velocity chart
- [ ] Sprint planning
- [ ] Roadmap visuelle

**Intégrations** :
- [ ] Webhooks Slack/Teams
- [ ] Import/Export Jira
- [ ] Import/Export Trello
- [ ] Synchronisation Git (commits → tâches)
- [ ] Calendrier Google/Outlook
- [ ] Zapier / Make integration

**Mobile** :
- [ ] Application mobile (React Native / Flutter)
- [ ] Support PWA (Progressive Web App)
- [ ] Notifications push mobile

**Rapports & Analytiques** :
- [ ] Rapports personnalisables
- [ ] Export graphiques en image
- [ ] Dashboard personnalisable (widgets)
- [ ] Prévisions (machine learning)
- [ ] Analyses de tendances

---

## 📄 Licence et crédits

**Projet** : Outil personnel de gestion de projet

**Technologies open-source utilisées** :
- **Chart.js** (MIT License) - Graphiques
- **Font Awesome** (License mixte) - Icônes

**Développement** :
- Architecture modulaire MVC
- Pattern Observer pour réactivité
- Services singleton
- JavaScript ES6+ natif

---

## 🆘 Support et aide

**Questions fréquentes** :

**Q : Mes données sont-elles sauvegardées ?**
R : Oui, automatiquement dans le LocalStorage du navigateur. Exportez régulièrement en JSON pour backup.

**Q : Puis-je utiliser ProjeX hors ligne ?**
R : Oui, 100% local, aucune connexion requise.

**Q : Comment transférer mes données sur un autre ordinateur ?**
R : Export JSON → Transfert fichier → Import JSON sur nouvel ordinateur.

**Q : Combien de projets/tâches puis-je créer ?**
R : Limité par le LocalStorage (~5-10 Mo). En pratique : plusieurs centaines de tâches.

**Q : Le PDF ne s'affiche pas correctement ?**
R : Utilisez un navigateur moderne (Chrome, Firefox, Edge). Ctrl+P puis "Microsoft Print to PDF".

**Q : Comment supprimer toutes mes données ?**
R : Paramètres → Effacer toutes les données (ou vider le cache navigateur).

**Q : Puis-je partager un projet avec mon équipe ?**
R : Non dans la version actuelle (local uniquement). Export CSV/PDF pour partage asynchrone.

---

## 📱 Contacts et contributions

**Maintenance** : Projet personnel en constante amélioration

**Version actuelle** : **2.0** (Architecture modulaire complète)

**Dernière mise à jour** : Avril 2026

**Améliorations récentes** :
- ✅ Export PDF backlog avec descriptions complètes
- ✅ Actions rapides changement de statut
- ✅ Modal visualisation détaillée des tâches
- ✅ Liens SharePoint organisés
- ✅ Centre de notifications
- ✅ Mode Focus par membre

---

**ProjeX** - Gérez vos projets avec puissance et simplicité. 🚀

*Cet outil combine simplicité d'utilisation et fonctionnalités professionnelles pour vous aider à gérer efficacement vos projets, seul ou en équipe.*
