# 🔄 Guide de Migration - ProjeX v2.0

## 📖 Introduction

Ce guide vous explique comment basculer de l'ancienne version de ProjeX vers la nouvelle architecture modulaire avec toutes les fonctionnalités avancées.

## 🆕 Qu'est-ce qui a changé ?

### Architecture
| Ancien | Nouveau |
|--------|---------|
| Fichier unique `app.js` monolithique | Architecture modulaire MVC |
| Données en mémoire | Persistance LocalStorage |
| Pas d'historique | Historique des 50 dernières modifications |
| Pas d'import/export | Export/Import JSON |

### Fonctionnalités Ajoutées
✨ **Nouvelles pages** :
- Page Analytics avec graphiques
- Timeline Gantt

✨ **Nouveaux services** :
- Mode sombre/clair
- Système de notifications toast
- Recherche avancée
- Templates de projets

✨ **Améliorations des modèles** :
- Tags sur projets et tâches
- Dépendances entre tâches
- Commentaires et pièces jointes
- Calcul automatique de progression

## 🚀 Migration Rapide

### Option 1 : Démarrage Frais (Recommandé)

Si vous commencez un nouveau projet ou voulez tester :

1. **Ouvrez simplement `index.html` dans votre navigateur**
2. L'application se charge avec des données de démonstration
3. Commencez à créer vos projets et tâches

### Option 2 : Migration des Données Existantes

Si vous avez des données dans l'ancienne version :

#### Étape 1 : Exporter les anciennes données

L'ancien système gardait les données en mémoire. Si vous souhaitez les récupérer :

1. Ouvrez l'ancienne version
2. Ouvrez la console du navigateur (F12)
3. Copiez vos données avec ces commandes :

```javascript
// Copier dans le presse-papiers
const oldData = {
    projects: projects,
    tasks: tasks,
    members: members,
    activities: activities
};
console.log(JSON.stringify(oldData, null, 2));
```

4. Copiez le résultat JSON

#### Étape 2 : Importer dans la nouvelle version

1. Ouvrez la nouvelle version (`index.html`)
2. Créez un fichier JSON avec vos données :

```json
{
  "version": "1.0",
  "exportDate": "2024-XX-XX",
  "data": {
    "projects": [...vos projets...],
    "tasks": [...vos tâches...],
    "members": [...vos membres...],
    "activities": [...vos activités...]
  }
}
```

3. Cliquez sur le bouton "Import" (icône upload)
4. Sélectionnez votre fichier JSON

## 📋 Checklist de Migration

### Avant la Migration
- [ ] Lister tous vos projets actifs
- [ ] Noter les membres de l'équipe
- [ ] Sauvegarder les tâches importantes
- [ ] Faire une copie de sauvegarde

### Pendant la Migration
- [ ] Tester la nouvelle version
- [ ] Vérifier que toutes les données sont présentes
- [ ] Tester les nouvelles fonctionnalités
- [ ] Vérifier la persistance (rafraîchir la page)

### Après la Migration
- [ ] Former l'équipe aux nouvelles fonctionnalités
- [ ] Configurer les préférences (thème, etc.)
- [ ] Créer des templates de projets personnalisés
- [ ] Organiser avec les tags

## 🎓 Utilisation des Nouvelles Fonctionnalités

### Mode Sombre
1. Cliquez sur l'icône lune/soleil en haut à droite
2. Le thème bascule automatiquement
3. Votre préférence est sauvegardée

### Recherche Avancée
1. Tapez dans la barre de recherche (au moins 2 caractères)
2. Les résultats s'affichent en temps réel
3. Cliquez sur un résultat pour y accéder

### Templates de Projets
1. Créez un nouveau projet
2. Sélectionnez "Créer depuis un template"
3. Choisissez parmi 6 templates prédéfinis
4. Personnalisez selon vos besoins

### Timeline Gantt
1. Cliquez sur "Timeline" dans le menu
2. Visualisez tous vos projets chronologiquement
3. Les barres montrent la progression

### Analytics
1. Cliquez sur "Analytiques" dans le menu
2. Consultez 4 graphiques interactifs
3. Analysez la performance de votre équipe

### Export/Import
**Export** :
1. Cliquez sur l'icône téléchargement
2. Un fichier JSON est téléchargé
3. Conservez-le en sécurité

**Import** :
1. Cliquez sur l'icône upload
2. Sélectionnez un fichier d'export
3. Confirmez le remplacement

## 🔧 Configuration Recommandée

### Initialisation de l'Application

```javascript
// L'application se charge automatiquement
// Aucune configuration manuelle nécessaire

// Les données sont sauvegardées automatiquement
// Toutes les secondes après un changement
```

### Personnalisation

Vous pouvez personnaliser les couleurs et variables CSS dans `styles-extended.css` :

```css
:root {
    --primary: #4f46e5;  /* Couleur principale */
    --success: #10b981;  /* Couleur succès */
    --warning: #f59e0b;  /* Couleur alerte */
    --danger: #ef4444;   /* Couleur erreur */
}
```

### Ajout de Templates Personnalisés

Éditez `js/utils/templates.js` pour ajouter vos propres templates :

```javascript
{
    id: 'mon-template',
    name: 'Mon Template Perso',
    description: 'Description de mon template',
    color: '#4f46e5',
    tasks: [
        { name: 'Tâche 1', priority: 'haute', estimatedTime: 480 },
        { name: 'Tâche 2', priority: 'moyenne', estimatedTime: 360 }
    ]
}
```

## ⚠️ Points d'Attention

### LocalStorage
- **Limite** : ~5-10MB selon le navigateur
- **Nettoyage** : Vider le cache peut effacer les données
- **Solution** : Faire des exports réguliers

### Navigateurs Supportés
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ❌ Internet Explorer (non supporté)

### Performance
- Optimal jusqu'à ~500 projets et ~2000 tâches
- Au-delà, considérer une solution backend

## 🐛 Problèmes Courants

### "Mes données ont disparu"
**Cause** : Cache navigateur effacé
**Solution** : 
1. Restaurer depuis un export
2. Activer les exports automatiques réguliers

### "Les graphiques ne s'affichent pas"
**Cause** : Chart.js non chargé (CDN)
**Solution** :
1. Vérifier la connexion internet
2. Vérifier dans la console (F12)

### "Le drag & drop ne fonctionne pas"
**Cause** : JavaScript désactivé ou erreur
**Solution** :
1. Activer JavaScript
2. Vérifier les erreurs dans la console

## 📊 Différences de Comportement

### Sauvegarde
| Ancien | Nouveau |
|--------|---------|
| Rafraîchir = Perte de données | Données persistantes |
| Pas de sauvegarde | Auto-sauvegarde continue |

### Recherche
| Ancien | Nouveau |
|--------|---------|
| Filtres uniquement | Recherche full-text |
| Par page | Globale (projets, tâches, membres) |

### Visualisation
| Ancien | Nouveau |
|--------|---------|
| Stats simples | Graphiques interactifs |
| Pas de timeline | Timeline Gantt |

## 📚 Ressources

### Documentation
- `README.md` : Documentation complète
- `MIGRATION.md` : Ce guide
- Commentaires dans le code : Documentation inline

### Support
- Ouvrez la console (F12) pour voir les logs
- Vérifiez le guide de résolution de problèmes
- Consultez les modèles de données

## ✅ Validation Post-Migration

Vérifiez que tout fonctionne :

```javascript
// Dans la console du navigateur
// Vérifier l'état
console.log(store.getState());

// Vérifier la sauvegarde
console.log(storageService.loadState());

// Vérifier la taille du stockage
console.log(storageService.getStorageSize());
```

## 🎯 Prochaines Étapes

Après la migration réussie :

1. **Explorer les nouvelles fonctionnalités**
   - Testez le mode sombre
   - Créez un projet depuis un template
   - Consultez les analytics

2. **Organiser vos données**
   - Ajoutez des tags à vos projets
   - Définissez les dépendances entre tâches
   - Assignez les membres aux projets

3. **Optimiser votre workflow**
   - Utilisez la recherche pour naviguer rapidement
   - Consultez la timeline pour planifier
   - Analysez les graphiques pour optimiser

4. **Faire un export de sauvegarde**
   - Export JSON complet
   - Stockage sécurisé
   - Export régulier (hebdomadaire recommandé)

## 💡 Conseils Pro

### Performance
- Archivez les projets terminés régulièrement
- Limitez le nombre de tâches actives
- Utilisez les filtres pour naviguer

### Organisation
- Utilisez des tags cohérents
- Définissez une convention de nommage
- Groupez les projets par type

### Collaboration
- Utilisez les commentaires pour communiquer
- Assignez clairement les tâches
- Mettez à jour les progressions régulièrement

---

**Besoin d'aide ?** Consultez le README.md pour plus de détails !
