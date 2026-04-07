# 🚀 ProjeX - Démarrage Rapide

## ⚡ En 3 étapes

### 1️⃣ Ouvrir l'application
Double-cliquez sur **`index.html`**

### 2️⃣ Explorer
L'application se charge avec des **données de démonstration**

### 3️⃣ Commencer
Créez votre premier projet avec le bouton **"+ Nouveau"**

---

## 📁 Fichiers du Projet

```
📦 Project Management/
│
├── 🌐 index.html                 # ← Ouvrez ce fichier !
├── 🎨 style.css                  # Styles principaux
├── 🎨 styles-extended.css        # Nouveaux styles (toast, gantt, dark mode)
├── 📜 app.js                     # Ancien code (conservé pour référence)
│
├── 📂 js/                        # 🆕 Nouvelle architecture modulaire
│   ├── 📜 app-new.js             # Application principale
│   │
│   ├── 📂 models/                # Modèles de données
│   │   ├── Project.js            # Modèle Projet
│   │   ├── Task.js               # Modèle Tâche
│   │   └── Member.js             # Modèle Membre
│   │
│   ├── 📂 store/                 # Gestion d'état
│   │   └── Store.js              # Store centralisé
│   │
│   ├── 📂 services/              # Services
│   │   ├── StorageService.js     # LocalStorage + Export/Import
│   │   ├── NotificationService.js # Notifications toast
│   │   ├── ChartService.js       # Graphiques Chart.js
│   │   └── ThemeService.js       # Mode sombre/clair
│   │
│   ├── 📂 utils/                 # Utilitaires
│   │   ├── helpers.js            # Fonctions utiles
│   │   └── templates.js          # Templates de projets
│   │
│   └── 📂 components/            # Composants UI
│       ├── GanttTimeline.js      # Timeline Gantt
│       └── SearchComponent.js    # Recherche avancée
│
├── 📚 README.md                  # Documentation complète
├── 📚 MIGRATION.md               # Guide de migration
├── 📚 SUMMARY.md                 # Résumé des améliorations
├── 📚 CHANGELOG.md               # Liste des changements
└── 📚 QUICKSTART.md              # Ce fichier

```

---

## 🎯 Fonctionnalités Principales

### 🏠 Dashboard
- **4 statistiques** en temps réel
- **Projets récents** avec progression
- **Tâches urgentes** à traiter
- **Activité récente** de l'équipe
- **2 graphiques** interactifs

### 📁 Projets
- Vue **Grille** ou **Liste**
- **Filtres** par statut et priorité
- **Couleurs** personnalisées
- **Progression** automatique
- **Tags** pour organisation

### ✅ Tâches
- **Kanban** drag & drop
- 3 colonnes : À faire, En cours, Terminé
- **Filtres** multiples
- **Assignation** aux membres
- **Dates d'échéance**

### 👥 Équipe
- **Membres** avec rôles
- **Départements**
- **Charge de travail**
- **Disponibilité**

### 📅 Calendrier
- Vue **mensuelle** des événements
- Échéances des tâches
- Navigation mois par mois

### 📊 Analytics
- **4 graphiques** :
  - Progression des projets
  - Répartition des tâches
  - Charge de travail
  - Activité 30 jours

### 📈 Timeline
- **Gantt** visuel des projets
- Barres de progression
- Vue chronologique
- Dates automatiques

---

## 🎨 Nouvelles Fonctionnalités

### 🌙 Mode Sombre
Cliquez sur l'icône **lune/soleil** en haut à droite

### 🔍 Recherche Globale
Tapez dans la **barre de recherche** (min 2 caractères)
- Recherche dans projets, tâches et membres
- Résultats en temps réel
- Navigation directe

### 💾 Export/Import
**Export** : Clic sur icône **📥** → Télécharge vos données en JSON

**Import** : Clic sur icône **📤** → Sélectionne un fichier JSON

### 🔔 Notifications
Messages toast élégants pour toutes les actions :
- ✅ Succès (vert)
- ❌ Erreur (rouge)
- ⚠️ Alerte (orange)
- ℹ️ Info (bleu)

### 📋 Templates de Projets
6 templates prédéfinis :
1. 🌐 Développement Web
2. 📱 Application Mobile
3. 📢 Campagne Marketing
4. 🎉 Organisation Événement
5. 🚀 Lancement Produit
6. ✍️ Création Contenu

---

## ⌨️ Actions Rapides

| Action | Comment |
|--------|---------|
| **Nouveau projet** | Bouton "+ Nouveau" sur page Projets |
| **Nouvelle tâche** | Bouton "+ Nouveau" sur page Tâches |
| **Rechercher** | Taper dans barre de recherche |
| **Changer thème** | Clic sur icône lune/soleil |
| **Exporter données** | Clic sur icône téléchargement |
| **Voir graphiques** | Page "Analytics" |
| **Voir timeline** | Page "Timeline" |

---

## 🔧 Personnalisation

### Changer les Couleurs
Éditez **`styles-extended.css`** :
```css
:root {
    --primary: #4f46e5;    /* Votre couleur principale */
    --success: #10b981;    /* Couleur de succès */
    /* ... */
}
```

### Ajouter un Template
Éditez **`js/utils/templates.js`** :
```javascript
{
    id: 'mon-template',
    name: 'Mon Template',
    description: 'Description',
    color: '#4f46e5',
    tasks: [
        { name: 'Tâche 1', priority: 'haute', estimatedTime: 480 }
    ]
}
```

---

## 💡 Conseils d'Utilisation

### 🎯 Bonnes Pratiques

1. **Organisez avec les tags**
   - Utilisez des tags cohérents
   - Ex: `urgent`, `design`, `backend`

2. **Assignez clairement**
   - Une tâche = un membre
   - Évitez la surcharge

3. **Mettez à jour régulièrement**
   - Progression des tâches
   - Statuts des projets
   - Commentaires pour historique

4. **Exportez régulièrement**
   - Sauvegarde hebdomadaire recommandée
   - Export avant modifications importantes

5. **Utilisez les templates**
   - Gain de temps
   - Standardisation
   - Créez vos propres templates

### 📊 Exploitez les Analytics

- Identifiez les **goulots d'étranglement**
- Équilibrez la **charge de travail**
- Suivez la **vélocité** de l'équipe
- Planifiez avec la **timeline**

---

## ❓ FAQ Express

### Q: Mes données sont-elles sauvegardées ?
**R:** ✅ Oui, automatiquement dans votre navigateur (LocalStorage)

### Q: Puis-je utiliser hors ligne ?
**R:** ⚠️ Partiellement. Les graphiques nécessitent Chart.js (CDN).

### Q: Comment partager avec mon équipe ?
**R:** Exportez vos données et partagez le fichier JSON.

### Q: Puis-je changer la langue ?
**R:** Actuellement uniquement en français. L'anglais est prévu.

### Q: Y a-t-il une limite de projets ?
**R:** LocalStorage ~5-10MB. Estimé : ~500 projets, ~2000 tâches.

### Q: Comment supprimer toutes les données ?
**R:** Console navigateur : `localStorage.clear()`

### Q: Le drag & drop ne fonctionne pas ?
**R:** Vérifiez que JavaScript est activé et consultez la console (F12).

---

## 🐛 Problèmes Courants

### Les graphiques ne s'affichent pas
1. Vérifiez votre **connexion internet**
2. Chart.js est chargé via CDN
3. Ouvrez la **console** (F12) pour voir les erreurs

### Les données ont disparu
1. Le **cache** a été effacé
2. Restaurez depuis un **export**
3. Pensez à exporter régulièrement

### Le mode sombre ne fonctionne pas
1. Vérifiez les **préférences système**
2. Essayez de **basculer manuellement**
3. Rafraîchissez la page

---

## 📚 Documentation Complète

| Fichier | Contenu |
|---------|---------|
| **README.md** | Documentation détaillée complète |
| **MIGRATION.md** | Guide pour migrer desde l'ancienne version |
| **SUMMARY.md** | Vue d'ensemble des améliorations |
| **CHANGELOG.md** | Liste complète des changements |
| **QUICKSTART.md** | Ce guide de démarrage rapide |

---

## 🎓 Tutoriel Vidéo (Pas à pas)

### 1. Créer votre premier projet
1. Cliquez sur **"Projets"** dans le menu
2. Cliquez sur **"+ Nouveau"**
3. Remplissez le formulaire
4. Choisissez une **couleur**
5. Assignez des **membres**
6. Cliquez sur **"Enregistrer"**

### 2. Ajouter des tâches
1. Cliquez sur **"Tâches"** dans le menu
2. Cliquez sur **"+ Nouveau"**
3. Sélectionnez le **projet**
4. Assignez à un **membre**
5. Définissez la **priorité** et **échéance**
6. Cliquez sur **"Enregistrer"**

### 3. Utiliser le Kanban
1. Dans **"Tâches"**, glissez-déposez les cartes
2. Déplacez entre : **À faire** → **En cours** → **Terminé**
3. Les statuts se mettent à jour automatiquement

### 4. Voir les analytics
1. Cliquez sur **"Analytiques"**
2. Consultez les **4 graphiques**
3. Analysez la performance

### 5. Exporter vos données
1. Cliquez sur l'icône **📥** (haut droite)
2. Un fichier JSON est téléchargé
3. Conservez-le en **sécurité**

---

## 🚀 Prêt à Démarrer !

**C'est parti !** Ouvrez **`index.html`** et explorez toutes les fonctionnalités.

**Besoin d'aide ?**
- 📖 Consultez **README.md** pour la documentation complète
- 🔄 Consultez **MIGRATION.md** si vous migrez depuis v1
- 📊 Consultez **SUMMARY.md** pour un aperçu des fonctionnalités

---

## 🌟 Profitez de ProjeX v2.0 !

**Made with ❤️ by ProjeX Team**

*Version 2.0.0 - Architecture modulaire avec fonctionnalités avancées*
