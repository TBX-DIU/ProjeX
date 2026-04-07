# 📋 ProjeX - Résumé Rapide

## 🎯 Qu'est-ce que ProjeX ?

**ProjeX** est un outil de gestion de projet **complet** et **moderne** qui vous permet de gérer vos projets, tâches et équipe avec une approche Agile/Scrum. 100% local, aucun serveur requis.

---

## ⚡ Fonctionnalités clés

### 📊 **Tableau de bord**
- Statistiques en temps réel (projets, tâches terminées, en cours, en retard)
- Graphiques analytiques (progression, charge de travail, activité)
- Projets récents et tâches urgentes

### 📁 **Gestion de projets**
- Vue Grid/Liste avec codes couleur personnalisés
- Dates de début, fin et **MEP (Mise En Production)**
- Suivi budgétaire (budget vs dépenses)
- Membres assignés avec avatars
- **Liens SharePoint organisés** (chemin hiérarchique)
- Timeline Gantt avec jalons et compteurs de jours restants
- Filtres par statut et priorité

### ✅ **Gestion de tâches**
- **Kanban 4 colonnes** (À faire, En cours, Bloqué, Terminé)
- **Drag & Drop** entre colonnes
- **Hiérarchie Agile** complète :
  - Epic (📦)
  - User Story (📋)  
  - Tâche
- **9 sections de formulaire** :
  1. Informations générales
  2. Hiérarchie Agile
  3. Classification (domaine, sous-domaine)
  4. Analyse (hypothèse, solution)
  5. Critères d'acceptation
  6. Risques
  7. Planification
  8. Estimation (jours, heures, Story Points)
  9. Statut et progression

- **Modal de visualisation complète** (clic sur tâche)
- **Actions rapides** pour changer le statut instantanément :
  - 🔵 À faire
  - 🔄 En cours
  - 🚫 Bloquer (avec raison)
  - ✅ Terminer (met à 100%)

### 👥 **Gestion d'équipe**
- Cartes avec avatars colorés (initiales)
- Rôle, compétences, email
- Nombre de tâches assignées
- Mode Focus (filtrer par membre)

### 📅 **Calendrier**
- Vue mensuelle interactive
- Affichage des échéances
- **Clic sur un jour → Création de tâche avec date pré-remplie**

### 📈 **Analytiques**
4 graphiques professionnels :
- Progression des projets
- Répartition des tâches (camembert)
- Charge de travail par membre
- Timeline d'activité (30 jours)

### 📤 **Export/Import**
- **Export CSV** : 26 colonnes pour Excel/Jira
- **Export PDF** : Cartes détaillées professionnelles avec descriptions, critères, risques
- **Export JSON** : Backup complet de toutes les données
- **Import JSON** : Restauration

---

## 💡 Pourquoi ProjeX ?

✅ **Aucun serveur requis** - 100% local, vos données restent chez vous  
✅ **Architecture moderne** - MVC modulaire avec 17+ fichiers  
✅ **Backlog Agile complet** - Epic → US → Task avec critères et risques  
✅ **Export PDF détaillé** - Descriptions complètes pour stakeholders  
✅ **Actions rapides** - Changement de statut en 1 clic  
✅ **Liens SharePoint** - Organisation hiérarchique de vos documents  
✅ **Responsive** - Fonctionne sur desktop, tablette, mobile  
✅ **Thèmes** - Mode clair/sombre avec détection auto  
✅ **Notifications** - Centre de notifications avec historique  
✅ **Graphiques** - Chart.js pour visualisations professionnelles  

---

## 🚀 Démarrage rapide

1. **Ouvrir** `index.html` dans un navigateur
2. **Explorer** les données de démonstration
3. **Créer** votre premier projet (➕ Nouveau projet)
4. **Ajouter** des tâches avec le backlog complet
5. **Glisser-déposer** dans le Kanban pour gérer
6. **Cliquer** sur une tâche pour voir tous les détails
7. **Exporter** en CSV/PDF pour partager

---

## 📊 Export Backlog

### CSV (26 colonnes)
Parfait pour Excel, Google Sheets, import Jira :
- ID, Titre, Type, Epic, US, Description
- Domaine, Sous-domaine, Statut, Priorité
- Projet, Assigné, Hypothèse, Solution
- Critères, Risques, Dépendances
- Estimation (j/h/SP), Dates, Progression
- Blocage, Création, Modification

### PDF (Cartes professionnelles)
Parfait pour impression et présentations :
- Format carte par tâche
- Description complète
- Critères d'acceptation formatés
- Risques en rouge
- Blocages visibles
- Optimisé pour impression (évite coupures)

---

## 🎨 Personnalisation

- **8 couleurs** de projets (indigo, bleu, vert, jaune, rouge, violet, rose, gris)
- **2 thèmes** (clair ☀️ / sombre 🌙)
- **Avatars colorés** automatiques pour membres
- **Modal 700px** pour formulaires étendus

---

## 💾 Stockage

- **LocalStorage** avec auto-sauvegarde (1000ms debounce)
- **Backup JSON** recommandé régulièrement
- **0 transmission réseau** - Tout reste local
- **Pas de serveur** - Fonctionne offline

---

## 🔗 Liens SharePoint

Sur chaque projet, ajoutez des liens organisés :
- **Chemin hiérarchique** : `Projet/Documents/Specs`
- **Label** : Nom descriptif
- **URL** : Lien complet
- **Modal dédiée** avec boutons Ouvrir/Copier

---

## 👁️ Visualisation détaillée

**Clic sur une tâche** → Modal avec TOUTES les infos :
- Informations principales (nom, type, statut, priorité, progression)
- Structure backlog (Epic, US)
- Domaine et contexte
- Hypothèse et solution
- Critères d'acceptation
- Risques identifiés (rouge)
- Dépendances
- Estimation (j/h/SP)
- Planning et affectation
- Blocage (si applicable)
- **⚡ Actions rapides** : Boutons pour changer le statut en 1 clic

---

## 📱 Responsive

- **Desktop** : Vue complète avec sidebar fixe
- **Tablette** : Sidebar repliable, grilles 2 colonnes
- **Mobile** : Sidebar overlay, single column, Kanban scroll horizontal

---

## 🔔 Notifications

Centre de notifications (icône 🔔) :
- Badge avec compteur
- 10 dernières activités
- Temps écoulé ("Il y a 2h")
- Icônes colorées par type
- Bouton "Effacer tout"

---

## 🎯 Mode Focus

Filtrez par membre pour voir uniquement ses tâches :
- Bouton 🎯 "Mode Focus"
- Sélection du membre
- Combinable avec autres filtres

---

## 📈 Timeline Gantt

- Barres colorées par projet
- Progression visuelle
- Jalons MEP (🚀 rouge) et Fin (✓ vert)
- **Compteurs de jours restants** (colorés selon urgence)

---

## 🏗️ Architecture

```
📁 js/
├── models/        # Project, Task, Member
├── services/      # Storage, Notification, Chart, Theme
├── components/    # Gantt, Search
├── store/         # State Observer
├── utils/         # Helpers, Templates
└── app-new.js     # Controller principal
```

**Pattern** : MVC modulaire + Observer  
**Framework** : Vanilla JavaScript ES6+  
**Dépendances** : Chart.js, Font Awesome  

---

## 📊 Statistiques

- **17+ fichiers** JavaScript modulaires
- **~3000+ lignes** de code
- **26 colonnes** d'export CSV
- **9 sections** de formulaire tâche
- **8 couleurs** de personnalisation
- **2 thèmes** (clair/sombre)
- **100%** JavaScript Vanilla
- **0 serveur** requis

---

## 🔮 Points forts uniques

✨ **Timeline Gantt** avec jalons MEP et compteurs de jours  
✨ **Export PDF** avec descriptions complètes et mise en page pro  
✨ **Actions rapides** pour changer le statut (1 clic)  
✨ **Liens SharePoint** organisés par chemin hiérarchique  
✨ **Modal de visualisation** complète (toutes les infos)  
✨ **Structure backlog Agile** (Epic → US → Task)  
✨ **26 colonnes CSV** pour analyse approfondie  
✨ **Centre de notifications** avec historique  
✨ **Mode Focus** par membre  

---

## 🆘 FAQ

**Q : Mes données sont-elles sauvegardées ?**  
R : Oui, auto-sauvegarde dans LocalStorage. Exportez en JSON pour backup.

**Q : Puis-je utiliser ProjeX hors ligne ?**  
R : Oui, 100% local, aucune connexion requise.

**Q : Comment exporter pour Excel ?**  
R : Page Tâches → Exporter Backlog → CSV → Ouvrir dans Excel.

**Q : Comment imprimer le backlog ?**  
R : Page Tâches → Exporter Backlog → PDF → Ctrl+P → Microsoft Print to PDF.

**Q : Comment changer rapidement le statut d'une tâche ?**  
R : Clic sur tâche → Section "Actions rapides" → Bouton du statut souhaité.

---

## 📖 Documentation complète

📚 Voir **GUIDE_COMPLET.md** pour la documentation exhaustive (100+ pages).

---

**ProjeX v2.0** - Architecture modulaire complète - Avril 2026 🚀
