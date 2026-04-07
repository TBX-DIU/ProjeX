/**
 * ProjeX - Application principale
 * Architecture modulaire avec gestion d'état centralisée
 */

// ===== INITIALISATION =====
class App {
    constructor() {
        this.searchComponent = new SearchComponent();
        this.ganttTimeline = new GanttTimeline('ganttContainer');
        this.calendarDate = new Date();
        this.init();
    }

    /**
     * Initialiser l'application
     */
    async init() {
        // Charger l'état depuis le localStorage
        this.loadState();

        // Initialiser les services
        themeService.init();

        // Initialiser l'interface
        this.initSidebar();
        this.initEventListeners();
        this.initSearch();
        this.initCalendar();

        // S'abonner aux changements d'état
        store.subscribe((path, value, state) => {
            this.onStateChange(path, value, state);
            // Auto-sauvegarde
            storageService.autoSave(state);
        });

        // Initialiser les filtres de projets dans les tâches
        this.updateTaskProjectFilter();

        // Rendre la page initiale
        this.renderCurrentPage();

        console.log('✨ ProjeX initialisé avec succès');
    }

    /**
     * Charger l'état depuis le localStorage
     */
    loadState() {
        const savedState = storageService.loadState();
        
        if (savedState) {
            // Reconstituer les objets depuis JSON
            store.state.projects = savedState.projects?.map(p => new Project(p)) || this.getDefaultProjects();
            store.state.tasks = savedState.tasks?.map(t => new Task(t)) || this.getDefaultTasks();
            store.state.members = savedState.members?.map(m => new Member(m)) || this.getDefaultMembers();
            store.state.activities = savedState.activities || this.getDefaultActivities();
            store.state.settings = savedState.settings || store.state.settings;
            
            notificationService.info('Données chargées avec succès');
        } else {
            // Charger les données par défaut
            this.loadDefaultData();
            notificationService.info('Bienvenue dans ProjeX ! 🚀');
        }
    }

    /**
     * Charger les données par défaut
     */
    loadDefaultData() {
        store.state.projects = this.getDefaultProjects();
        store.state.tasks = this.getDefaultTasks();
        store.state.members = this.getDefaultMembers();
        store.state.activities = this.getDefaultActivities();
    }

    /**
     * Obtenir les projets par défaut
     */
    getDefaultProjects() {
        return [
            new Project({
                id: 1, name: "Refonte Site Web", color: "#4f46e5",
                description: "Refonte complète du site vitrine de l'entreprise.",
                status: "en cours", priority: "haute",
                startDate: "2026-02-01", endDate: "2026-06-30", releaseDate: "2026-05-15",
                members: [1, 2, 3], progress: 65, tags: ['web', 'design'],
                links: [
                    { path: "Projet/Design", label: "Maquettes Figma", url: "https://sharepoint.com/sites/projets/design/maquettes" },
                    { path: "Projet/Dev", label: "Repository GitHub", url: "https://github.com/company/site-web" },
                    { path: "Projet/Docs", label: "Cahier des charges", url: "https://sharepoint.com/sites/projets/docs/cdc.pdf" }
                ]
            }),
            new Project({
                id: 2, name: "Application Mobile", color: "#10b981",
                description: "Développement d'une application iOS et Android.",
                status: "en cours", priority: "haute",
                startDate: "2026-03-01", endDate: "2026-09-30", releaseDate: "2026-08-15",
                members: [1, 4], progress: 30, tags: ['mobile', 'dev'],
                links: [
                    { path: "Mobile/Layout", label: "Wireframes", url: "https://sharepoint.com/sites/mobile/layout" },
                    { path: "Mobile/Layout/Traduction", label: "Fichiers de traduction", url: "https://sharepoint.com/sites/mobile/i18n" }
                ]
            }),
            new Project({
                id: 3, name: "Campagne Marketing", color: "#f59e0b",
                description: "Lancement de la campagne publicitaire Q2.",
                status: "planifié", priority: "moyenne",
                startDate: "2026-05-01", endDate: "2026-07-31",
                members: [3, 5], progress: 0, tags: ['marketing'],
                links: []
            })
        ];
    }

    /**
     * Obtenir les tâches par défaut
     */
    getDefaultTasks() {
        return [
            new Task({ id: 1, name: "Créer la maquette UI", description: "Design des wireframes et maquettes haute fidélité.", project: 1, assignee: 2, status: "terminé", priority: "haute", dueDate: "2026-03-15", progress: 100 }),
            new Task({ id: 2, name: "Développer la homepage", description: "Intégration HTML/CSS/JS de la page d'accueil.", project: 1, assignee: 1, status: "en cours", priority: "haute", dueDate: "2026-05-10", progress: 60 }),
            new Task({ id: 3, name: "API REST backend", description: "Création des endpoints pour l'application mobile.", project: 2, assignee: 1, status: "en cours", priority: "haute", dueDate: "2026-05-20", progress: 45 }),
            new Task({ id: 4, name: "Tests unitaires", description: "Écriture des tests pour les composants principaux.", project: 1, assignee: 4, status: "à faire", priority: "moyenne", dueDate: "2026-06-25", progress: 0 })
        ];
    }

    /**
     * Obtenir les membres par défaut
     */
    getDefaultMembers() {
        return [
            new Member({ id: 1, firstName: "Alice", lastName: "Martin", email: "alice.martin@projex.fr", role: "Développeur Full-Stack", department: "développement" }),
            new Member({ id: 2, firstName: "Bob", lastName: "Dupont", email: "bob.dupont@projex.fr", role: "Designer UI/UX", department: "design" }),
            new Member({ id: 3, firstName: "Claire", lastName: "Leroy", email: "claire.leroy@projex.fr", role: "Chef de projet", department: "management" }),
            new Member({ id: 4, firstName: "David", lastName: "Bernard", email: "david.bernard@projex.fr", role: "Développeur Backend", department: "développement" }),
            new Member({ id: 5, firstName: "Emma", lastName: "Petit", email: "emma.petit@projex.fr", role: "Chargée Marketing", department: "marketing" })
        ];
    }

    /**
     * Obtenir les activités par défaut
     */
    getDefaultActivities() {
        return [
            { icon: "fa-plus", iconBg: "blue", text: "<strong>Alice Martin</strong> a créé le projet <strong>Refonte Site Web</strong>", time: "Il y a 2h", timestamp: Date.now() - 7200000 },
            { icon: "fa-check", iconBg: "green", text: "<strong>Bob Dupont</strong> a terminé la tâche <strong>Créer la maquette UI</strong>", time: "Il y a 4h", timestamp: Date.now() - 14400000 }
        ];
    }

    /**
     * Réagir aux changements d'état
     */
    onStateChange(path, value, state) {
        // Rafraîchir la page courante si nécessaire
        if (path.startsWith('projects') || path.startsWith('tasks') || path.startsWith('members')) {
            this.renderCurrentPage();
        }
    }

    /**
     * Rendre la page courante
     */
    renderCurrentPage() {
        const page = store.get('ui.currentPage');
        
        switch (page) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'projects':
                this.renderProjects();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'team':
                this.renderTeam();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'timeline':
                this.renderTimeline();
                break;
        }
    }

    /**
     * Basculer le mode focus
     */
    toggleFocusMode() {
        const select = document.getElementById('focusMemberSelect');
        const btn = document.getElementById('btnFocusMode');
        
        if (select.style.display === 'none') {
            // Activer le mode focus
            this.updateFocusMemberSelect();
            select.style.display = 'block';
            btn.classList.add('active');
            notificationService.info('Mode focus activé - Sélectionnez un membre');
        } else {
            // Désactiver le mode focus
            select.style.display = 'none';
            select.value = '';
            btn.classList.remove('active');
            store.set('ui.focusMemberId', null);
            this.renderCurrentPage();
            notificationService.success('Mode focus désactivé');
        }
    }

    /**
     * Mettre à jour le select des membres pour le mode focus
     */
    updateFocusMemberSelect() {
        const select = document.getElementById('focusMemberSelect');
        if (!select) return;

        const members = store.state.members;
        select.innerHTML = '<option value="">Tous les membres</option>' +
            members.map(m => `<option value="${m.id}">${m.firstName} ${m.lastName}</option>`).join('');
        
        const currentFocus = store.get('ui.focusMemberId');
        if (currentFocus) {
            select.value = currentFocus;
        }
    }

    /**
     * Initialiser la sidebar
     */
    initSidebar() {
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("mainContent");
        const toggleBtn = document.getElementById("toggleSidebar");

        toggleBtn?.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle("mobile-open");
            } else {
                sidebar.classList.toggle("collapsed");
                mainContent.classList.toggle("expanded");
                store.set('ui.sidebarCollapsed', sidebar.classList.contains("collapsed"));
            }
        });

        // Navigation
        document.querySelectorAll(".nav-item").forEach(item => {
            item.addEventListener("click", () => {
                this.navigateTo(item.dataset.page);
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove("mobile-open");
                }
            });
        });
    }

    /**
     * Naviguer vers une page
     */
    navigateTo(page) {
        store.set('ui.currentPage', page);

        document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
        document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add("active");

        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        document.getElementById(`page-${page}`)?.classList.add("active");

        const titles = {
            dashboard: "Tableau de bord",
            projects: "Projets",
            tasks: "Tâches",
            team: "Équipe",
            calendar: "Calendrier",
            analytics: "Analytiques",
            timeline: "Timeline"
        };
        
        const titleEl = document.getElementById("pageTitle");
        if (titleEl) titleEl.textContent = titles[page];

        this.renderCurrentPage();
    }

    /**
     * Initialiser les événements
     */
    initEventListeners() {
        // Bouton nouveau
        document.getElementById('btnAddMain')?.addEventListener('click', () => {
            const page = store.get('ui.currentPage');
            if (page === 'projects') this.openProjectModal();
            else if (page === 'tasks') this.openTaskModal();
            else if (page === 'team') this.openMemberModal();
            else if (page === 'calendar') this.openTaskModal(); // Créer une tâche depuis le calendrier
            else if (page === 'dashboard') this.openProjectModal(); // Créer un projet depuis le dashboard
        });

        // Thème
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            const newTheme = themeService.toggle();
            notificationService.success(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
        });

        // Export
        document.getElementById('btnExport')?.addEventListener('click', () => this.exportData());

        // Import
        document.getElementById('btnImport')?.addEventListener('click', () => this.importData());

        // Export Backlog
        document.getElementById('btnExportBacklog')?.addEventListener('click', () => {
            const menu = document.getElementById('exportBacklogMenu');
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });

        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('exportBacklogMenu');
            const btn = document.getElementById('btnExportBacklog');
            if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {
                menu.style.display = 'none';
            }
            
            // Fermer le dropdown notifications si on clique ailleurs
            const notifDropdown = document.getElementById('notificationsDropdown');
            const notifBtn = document.getElementById('btnNotifications');
            const notifWrapper = document.getElementById('notificationsWrapper');
            if (notifDropdown && !notifWrapper.contains(e.target)) {
                notifDropdown.style.display = 'none';
            }
        });

        // Notifications
        document.getElementById('btnNotifications')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleNotifications();
        });

        document.getElementById('btnClearNotifs')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clearNotifications();
        });

        // Mode Focus
        document.getElementById('btnFocusMode')?.addEventListener('click', () => this.toggleFocusMode());
        document.getElementById('focusMemberSelect')?.addEventListener('change', (e) => {
            store.set('ui.focusMemberId', e.target.value ? parseInt(e.target.value) : null);
            this.renderCurrentPage();
        });
    }

    /**
     * Initialiser la recherche
     */
    initSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        const debouncedSearch = debounce((term) => {
            if (term.length < 2) {
                this.closeSearchResults();
                return;
            }

            const results = this.searchComponent.search(term, store.state);
            this.showSearchResults(results);
        }, 300);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                const results = this.searchComponent.search(searchInput.value, store.state);
                this.showSearchResults(results);
            }
        });

        // Fermer au clic extérieur
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar') && !e.target.closest('.search-dropdown')) {
                this.closeSearchResults();
            }
        });
    }

    /**
     * Afficher les résultats de recherche
     */
    showSearchResults(results) {
        let dropdown = document.getElementById('searchDropdown');
        
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'searchDropdown';
            dropdown.className = 'search-dropdown';
            document.querySelector('.search-bar').appendChild(dropdown);
        }

        this.searchComponent.renderResults(results, dropdown);
        dropdown.classList.add('show');
    }

    /**
     * Fermer les résultats de recherche
     */
    closeSearchResults() {
        const dropdown = document.getElementById('searchDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }

    /**
     * Exporter les données
     */
    exportData() {
        const data = storageService.exportData();
        if (!data) {
            notificationService.error('Aucune donnée à exporter');
            return;
        }

        const json = JSON.stringify(data, null, 2);
        const filename = `projex-export-${new Date().toISOString().split('T')[0]}.json`;
        downloadFile(json, filename);
        notificationService.success('Données exportées avec succès');
    }

    /**
     * Importer les données
     */
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const content = await readFile(file);
                const result = storageService.importData(content);
                
                if (result.success) {
                    this.loadState();
                    this.renderCurrentPage();
                    notificationService.success('Données importées avec succès');
                } else {
                    notificationService.error('Erreur lors de l\'importation: ' + result.error);
                }
            } catch (error) {
                notificationService.error('Erreur lors de la lecture du fichier');
            }
        };

        input.click();
    }

    /**
     * Rendre le Dashboard
     */
    renderDashboard() {
        const projects = store.state.projects;
        const tasks = store.state.tasks;
        const members = store.state.members;

        // Statistiques
        const activeProjects = projects.filter(p => p.status === 'en cours').length;
        const doneTasks = tasks.filter(t => t.status === 'terminé').length;
        const pendingTasks = tasks.filter(t => t.status === 'en cours').length;
        const overdueTasks = tasks.filter(t => t.isOverdue()).length;

        document.getElementById('statProjects').textContent = activeProjects;
        document.getElementById('statDone').textContent = doneTasks;
        document.getElementById('statPending').textContent = pendingTasks;
        document.getElementById('statOverdue').textContent = overdueTasks;

        // Projets récents
        this.renderRecentProjects();
        // Tâches urgentes
        this.renderUrgentTasks();
        // Activités
        this.renderActivities();
        // Graphiques
        this.renderDashboardCharts();
    }

    renderRecentProjects() {
        const container = document.getElementById('recentProjects');
        if (!container) return;

        const projects = [...store.state.projects].slice(-4).reverse();

        if (!projects.length) {
            container.innerHTML = emptyState("fa-folder", "Aucun projet", "Créez votre premier projet !");
            return;
        }

        container.innerHTML = projects.map(p => `
            <div class="recent-project-item" onclick="navigateTo('projects')">
                <div class="rp-color" style="background:${p.color}"></div>
                <div class="rp-info">
                    <h4>${p.name}</h4>
                    <p>${getStatusTag(p.status)}</p>
                </div>
                <div class="rp-progress">${p.progress}%</div>
            </div>
        `).join('');
    }

    renderUrgentTasks() {
        const container = document.getElementById('urgentTasks');
        if (!container) return;

        const urgent = store.state.tasks
            .filter(t => t.priority === 'haute' && t.status !== 'terminé')
            .slice(0, 4);

        if (!urgent.length) {
            container.innerHTML = emptyState("fa-check-circle", "Aucune tâche urgente", "Tout est sous contrôle !");
            return;
        }

        container.innerHTML = urgent.map(t => {
            const project = store.state.projects.find(p => p.id === t.project);
            const assignee = store.state.members.find(m => m.id === t.assignee);
            
            return `
                <div class="urgent-task-item">
                    ${getPriorityTag(t.priority)}
                    <div class="ut-info">
                        <h4>${t.name}</h4>
                        <p>${project?.name || "—"} · ${assignee?.firstName || "—"}</p>
                    </div>
                    <span class="task-due ${t.isOverdue() ? 'overdue' : ''}">
                        <i class="fas fa-calendar"></i> ${formatDate(t.dueDate)}
                    </span>
                </div>
            `;
        }).join('');
    }

    renderActivities() {
        const container = document.getElementById('recentActivity');
        if (!container) return;

        const activities = store.state.activities.slice(-5).reverse();
        const bgMap = { blue: "#eff6ff", green: "#f0fdf4", orange: "#fffbeb", red: "#fef2f2", purple: "#f5f3ff" };
        const colorMap = { blue: "#3b82f6", green: "#10b981", orange: "#f59e0b", red: "#ef4444", purple: "#8b5cf6" };

        container.innerHTML = `<div class="activity-list">` +
            activities.map(a => `
                <div class="activity-item">
                    <div class="activity-icon" style="background:${bgMap[a.iconBg]};color:${colorMap[a.iconBg]}">
                        <i class="fas ${a.icon}"></i>
                    </div>
                    <div class="activity-text">
                        <p>${a.text}</p>
                        <span class="activity-time">${a.time}</span>
                    </div>
                </div>
            `).join('') +
        `</div>`;
    }

    renderDashboardCharts() {
        // Graphique de progression des projets
        setTimeout(() => {
            const activeProjects = store.state.projects.filter(p => p.status === 'en cours');
            if (activeProjects.length > 0) {
                chartService.createProjectProgressChart('chartProjectProgress', activeProjects);
            }

            // Graphique de répartition des tâches
            chartService.createTaskDistributionChart('chartTaskDistribution', store.state.tasks);
        }, 100);
    }

    renderProjects() {
        const container = document.getElementById("projectsContainer");
        if (!container) return;

        const statusFilter = document.getElementById("filterProjectStatus")?.value || 'all';
        const priorityFilter = document.getElementById("filterProjectPriority")?.value || 'all';

        let filtered = store.state.projects.filter(p => {
            const matchStatus = statusFilter === "all" || p.status === statusFilter;
            const matchPriority = priorityFilter === "all" || p.priority === priorityFilter;
            return matchStatus && matchPriority;
        });

        if (!filtered.length) {
            container.innerHTML = emptyState("fa-folder-open", "Aucun projet trouvé", "Modifiez vos filtres ou créez un nouveau projet.");
            return;
        }

        const isListView = container.classList.contains("list-view");

        container.innerHTML = filtered.map(p => {
            const projectMembers = store.state.members.filter(m => p.members.includes(m.id));
            const taskCount = store.state.tasks.filter(t => t.project === p.id).length;

            return `
                <div class="project-card" style="--project-color:${p.color}">
                    ${isListView ? `<div style="width:4px;background:${p.color};position:absolute;top:0;left:0;bottom:0;border-radius:10px 0 0 10px"></div>` : ""}
                    <div class="project-card-main">
                        <div class="project-card-header">
                            <div>
                                <h3>${p.name}</h3>
                                <p>${p.description}</p>
                            </div>
                            <div class="project-actions" onclick="event.stopPropagation()">
                                <button class="action-btn" onclick="app.openEditProject(${p.id})" title="Modifier">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn danger" onclick="app.deleteProject(${p.id})" title="Supprimer">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width:${p.progress}%;background:${p.color}"></div>
                        </div>
                        <div class="project-meta">
                            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                                ${getStatusTag(p.status)}
                                ${getPriorityTag(p.priority)}
                                <span class="tag tag-gray"><i class="fas fa-tasks" style="margin-right:4px"></i>${taskCount} tâche${taskCount !== 1 ? "s" : ""}</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px">
                                <div class="project-members">
                                    ${projectMembers.slice(0, 4).map(m => `
                                        <div class="member-chip" style="background:${memberColor(m.id)}" title="${m.firstName} ${m.lastName}">
                                            ${m.firstName[0]}${m.lastName[0]}
                                        </div>
                                    `).join("")}
                                </div>
                                <span style="font-size:.78rem;font-weight:700;color:${p.color}">${p.progress}%</span>
                            </div>
                        </div>
                        ${p.endDate ? `<p style="font-size:.75rem;color:var(--text-light);margin-top:8px"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>Échéance : ${formatDate(p.endDate)}</p>` : ""}
                        ${p.releaseDate ? `<p style="font-size:.75rem;color:#ef4444;margin-top:4px;font-weight:600"><i class="fas fa-rocket" style="margin-right:4px"></i>MEP : ${formatDate(p.releaseDate)}</p>` : ""}
                        ${p.links && p.links.length > 0 ? `
                            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
                                <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openProjectLinks(${p.id})" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                    <i class="fas fa-link"></i>
                                    <span>Voir les liens SharePoint (${p.links.length})</span>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join("");
    }

    renderTasks() {
        this.renderKanban();
    }

    renderKanban() {
        const statusFilter = document.getElementById("filterTaskStatus")?.value || 'all';
        const priorityFilter = document.getElementById("filterTaskPriority")?.value || 'all';
        const projectFilter = document.getElementById("filterTaskProject")?.value || 'all';
        const focusMemberId = store.get('ui.focusMemberId');

        let filtered = store.state.tasks.filter(t => {
            const matchStatus = statusFilter === "all" || t.status === statusFilter;
            const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
            const matchProject = projectFilter === "all" || t.project == projectFilter;
            const matchFocus = !focusMemberId || t.assignee === focusMemberId;
            return matchStatus && matchPriority && matchProject && matchFocus;
        });

        const columns = {
            'à faire': filtered.filter(t => t.status === 'à faire'),
            'en cours': filtered.filter(t => t.status === 'en cours'),
            'bloqué': filtered.filter(t => t.status === 'bloqué'),
            'terminé': filtered.filter(t => t.status === 'terminé')
        };

        // Mettre à jour les compteurs
        document.getElementById('count-todo').textContent = columns['à faire'].length;
        document.getElementById('count-inprogress').textContent = columns['en cours'].length;
        document.getElementById('count-blocked').textContent = columns['bloqué'].length;
        document.getElementById('count-done').textContent = columns['terminé'].length;

        // Rendre les cartes
        Object.keys(columns).forEach(status => {
            const containerId = status === 'à faire' ? 'cards-todo' : 
                               status === 'en cours' ? 'cards-inprogress' :
                               status === 'bloqué' ? 'cards-blocked' : 'cards-done';
            const container = document.getElementById(containerId);
            
            if (!container) return;

            if (columns[status].length === 0) {
                container.innerHTML = '<div class="kanban-empty">Aucune tâche</div>';
                return;
            }

            container.innerHTML = columns[status].map(t => {
                const project = store.state.projects.find(p => p.id === t.project);
                const assignee = store.state.members.find(m => m.id === t.assignee);
                const isBlocked = t.status === 'bloqué';

                return `
                    <div class="kanban-card ${isBlocked ? 'blocked-task' : ''}" draggable="true" data-id="${t.id}" onclick="app.openTaskViewModal(${t.id})" style="cursor: pointer;">
                        <div class="kanban-card-header">
                            <h4>
                                ${isBlocked ? '<span class="blocked-icon" title="' + (t.blockedReason || 'Bloqué') + '">🚫</span> ' : ''}
                                ${t.name}
                            </h4>
                            <div class="kanban-card-actions">
                                <button class="action-btn" onclick="app.openEditTask(${t.id}); event.stopPropagation()" title="Modifier">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn danger" onclick="app.deleteTask(${t.id}); event.stopPropagation()" title="Supprimer">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        ${isBlocked && t.blockedReason ? `<div class="blocked-reason"><strong>🚫 Blocage:</strong> ${t.blockedReason}</div>` : ''}
                        ${t.description ? `<p class="kanban-card-desc">${truncate(t.description, 80)}</p>` : ''}
                        <div class="kanban-card-meta">
                            ${getPriorityTag(t.priority)}
                            ${project ? `<span class="tag tag-gray">${project.name}</span>` : ''}
                        </div>
                        <div class="kanban-card-footer">
                            ${assignee ? `<div class="task-assignee" style="background:${memberColor(assignee.id)}" title="${assignee.firstName} ${assignee.lastName}">${assignee.firstName[0]}${assignee.lastName[0]}</div>` : ''}
                            ${t.dueDate ? `<span class="task-due ${t.isOverdue() ? 'overdue' : ''}"><i class="fas fa-calendar"></i> ${formatDate(t.dueDate)}</span>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        });

        this.initKanbanDragDrop();
    }

    initKanbanDragDrop() {
        const cards = document.querySelectorAll('.kanban-card');
        const columns = document.querySelectorAll('.kanban-cards');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                card.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', card.innerHTML);
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        });

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                const dragging = document.querySelector('.dragging');
                
                if (dragging) {
                    const taskId = parseInt(dragging.dataset.id);
                    const newStatus = column.id === 'cards-todo' ? 'à faire' :
                                     column.id === 'cards-inprogress' ? 'en cours' : 'terminé';
                    
                    const task = store.state.tasks.find(t => t.id === taskId);
                    if (task) {
                        task.status = newStatus;
                        if (newStatus === 'terminé') {
                            task.progress = 100;
                            task.completedAt = Date.now();
                        }
                        store.set('tasks', store.state.tasks);
                        notificationService.success(`Tâche déplacée vers "${newStatus}"`);
                        this.renderTasks();
                    }
                }
            });
        });
    }

    renderTeam() {
        const container = document.getElementById('teamGrid');
        if (!container) return;

        const members = store.state.members;

        if (!members.length) {
            container.innerHTML = emptyState("fa-users", "Aucun membre", "Ajoutez des membres à votre équipe !");
            return;
        }

        container.innerHTML = members.map(m => {
            const workload = m.getWorkload(store.state.tasks);
            const projects = m.getProjects(store.state.projects);

            return `
                <div class="team-card">
                    <div class="team-card-header">
                        <div class="team-avatar" style="background:${m.color}">
                            ${m.getInitials()}
                        </div>
                        <div class="team-card-actions">
                            <button class="action-btn" onclick="app.openEditMember(${m.id})" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn danger" onclick="app.deleteMember(${m.id})" title="Supprimer">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <h3>${m.getFullName()}</h3>
                    <p class="team-role">${m.role}</p>
                    <p class="team-dept"><i class="fas fa-building"></i> ${m.department}</p>
                    <p class="team-email"><i class="fas fa-envelope"></i> ${m.email}</p>
                    <div class="team-stats">
                        <div class="team-stat">
                            <span class="stat-number">${projects.length}</span>
                            <span class="stat-label">Projets</span>
                        </div>
                        <div class="team-stat">
                            <span class="stat-number">${workload}</span>
                            <span class="stat-label">Tâches actives</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderCalendar() {
        const year = this.calendarDate.getFullYear();
        const month = this.calendarDate.getMonth();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        
        const titleEl = document.getElementById("calendarTitle");
        if (titleEl) {
            titleEl.textContent = `${monthNames[month]} ${year}`;
        }

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
        const totalDays = lastDay.getDate();

        const calendarDays = document.getElementById("calendarDays");
        if (!calendarDays) return;

        calendarDays.innerHTML = "";

        // Get all events (task due dates + project end dates) for this month
        const monthEvents = [];

        store.state.tasks.forEach(t => {
            if (!t.dueDate) return;
            const d = new Date(t.dueDate);
            d.setHours(0, 0, 0, 0);
            if (d.getFullYear() === year && d.getMonth() === month) {
                const project = store.state.projects.find(p => p.id === t.project);
                monthEvents.push({
                    day: d.getDate(),
                    label: t.name,
                    type: "task",
                    priority: t.priority,
                    status: t.status,
                    id: t.id,
                    color: project ? project.color : '#6366f1'
                });
            }
        });

        store.state.projects.forEach(p => {
            if (p.endDate) {
                const d = new Date(p.endDate);
                d.setHours(0, 0, 0, 0);
                if (d.getFullYear() === year && d.getMonth() === month) {
                    monthEvents.push({
                        day: d.getDate(),
                        label: `📁 ${p.name}`,
                        type: "project",
                        priority: p.priority,
                        id: p.id,
                        color: p.color
                    });
                }
            }
            
            // Ajouter aussi la date de MEP si elle existe
            if (p.releaseDate) {
                const mepDate = new Date(p.releaseDate);
                mepDate.setHours(0, 0, 0, 0);
                if (mepDate.getFullYear() === year && mepDate.getMonth() === month) {
                    monthEvents.push({
                        day: mepDate.getDate(),
                        label: `🚀 MEP: ${p.name}`,
                        type: "release",
                        priority: p.priority,
                        id: p.id,
                        color: '#ef4444' // Rouge pour la MEP
                    });
                }
            }
        });

        // Previous month days
        const prevLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            const dayEl = document.createElement("div");
            dayEl.className = "calendar-day other-month";
            dayEl.innerHTML = `<div class="day-number">${prevLastDay - i}</div>`;
            calendarDays.appendChild(dayEl);
        }

        // Current month days
        for (let d = 1; d <= totalDays; d++) {
            const dayEl = document.createElement("div");
            const currentDate = new Date(year, month, d);
            currentDate.setHours(0, 0, 0, 0);
            const isToday = currentDate.getTime() === today.getTime();
            
            dayEl.className = `calendar-day${isToday ? " today" : ""}`;
            dayEl.innerHTML = `<div class="day-number">${d}</div>`;
            dayEl.title = "Cliquer pour créer une tâche le " + d + " " + monthNames[month] + " " + year;
            
            // Permettre de créer une tâche en cliquant sur le jour
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            dayEl.onclick = () => {
                app.openTaskModal(dateStr);
            };

            const dayEvents = monthEvents.filter(e => e.day === d);
            dayEvents.slice(0, 3).forEach(e => {
                const evEl = document.createElement("div");
                evEl.className = `day-event prio-${e.priority}`;
                evEl.style.background = e.color;
                evEl.style.color = '#fff';
                evEl.textContent = e.label.length > 20 ? e.label.substring(0, 18) + '...' : e.label;
                evEl.title = e.label;
                evEl.onclick = (event) => {
                    event.stopPropagation();
                    if (e.type === 'task') {
                        app.openEditTask(e.id);
                    } else if (e.type === 'project' || e.type === 'release') {
                        app.openEditProject(e.id);
                    }
                };
                dayEl.appendChild(evEl);
            });

            if (dayEvents.length > 3) {
                const more = document.createElement("div");
                more.style.cssText = "font-size:.65rem;color:var(--text-light);padding:1px 4px;cursor:pointer";
                more.textContent = `+${dayEvents.length - 3} autre(s)`;
                more.title = dayEvents.slice(3).map(e => e.label).join('\\n');
                dayEl.appendChild(more);
            }

            calendarDays.appendChild(dayEl);
        }

        // Next month days
        const totalCells = calendarDays.children.length;
        const remaining = 42 - totalCells;
        for (let d = 1; d <= remaining; d++) {
            const dayEl = document.createElement("div");
            dayEl.className = "calendar-day other-month";
            dayEl.innerHTML = `<div class="day-number">${d}</div>`;
            calendarDays.appendChild(dayEl);
        }

        // Events list
        this.renderCalendarEvents(monthEvents, monthNames[month], year);
    }

    renderCalendarEvents(events, monthName, year) {
        const container = document.getElementById("calendarEvents");
        if (!container) return;

        if (!events.length) {
            container.innerHTML = `<p style="color:var(--text-light);font-size:.875rem;padding:8px 0">Aucun événement ce mois-ci.</p>`;
            return;
        }

        const sorted = [...events].sort((a, b) => a.day - b.day);
        container.innerHTML = sorted.map(e => {
            const eventIcon = e.type === "task" ? "fa-check-circle" : 
                             e.type === "release" ? "fa-rocket" : "fa-folder";
            const eventType = e.type === "project" ? "Fin de projet" : 
                             e.type === "release" ? "Mise en production" : 
                             "Échéance tâche";
            const statusBadge = e.status === 'bloqué' ? '<span style="color:#ef4444;font-size:0.75rem;margin-left:8px">🚫 Bloqué</span>' : '';
            
            return `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.2s"
                 onclick="app.${e.type === 'task' ? 'openEditTask' : 'openEditProject'}(${e.id})"
                 onmouseover="this.style.background='var(--bg)'" 
                 onmouseout="this.style.background='transparent'">
                <div style="
                    background:${e.color};
                    color:#fff;
                    border-radius:var(--radius-sm);
                    padding:6px 10px;
                    font-size:.8rem;
                    font-weight:700;
                    min-width:36px;
                    text-align:center">
                    ${e.day}
                </div>
                <div style="flex:1">
                    <p style="font-size:.875rem;font-weight:600;margin:0;display:flex;align-items:center;gap:8px">
                        <i class="fas ${eventIcon}" style="font-size:0.75rem;color:${e.color}"></i>
                        ${e.label}
                        ${statusBadge}
                    </p>
                    <p style="font-size:.75rem;color:var(--text-light);margin:4px 0 0 0">
                        ${eventType} · ${monthName} ${year}
                    </p>
                </div>
                ${getPriorityTag(e.priority)}
            </div>
        `;
        }).join("");
    }

    initCalendar() {
        const prevBtn = document.getElementById("prevMonth");
        const nextBtn = document.getElementById("nextMonth");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
                this.renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
                this.renderCalendar();
            });
        }

        // Ajouter bouton retour aujourd'hui
        const todayBtn = document.getElementById("todayBtn");
        if (todayBtn) {
            todayBtn.addEventListener("click", () => {
                this.calendarDate = new Date();
                this.renderCalendar();
                notificationService.success('Retour au mois actuel');
            });
        }
    }

    renderAnalytics() {
        setTimeout(() => {
            // Graphique progression projets
            const projects = store.state.projects.filter(p => p.status === 'en cours');
            if (projects.length > 0) {
                chartService.createProjectProgressChart('chartProjectProgress', projects);
            }

            // Graphique répartition tâches
            chartService.createTaskDistributionChart('chartTaskDistribution', store.state.tasks);

            // Graphique charge de travail
            chartService.createWorkloadChart('chartWorkload', store.state.members, store.state.tasks);

            // Graphique activité
            chartService.createActivityTimelineChart('chartActivity', store.state.activities);
        }, 100);
    }

    renderTimeline() {
        this.ganttTimeline.render(store.state.projects);
    }

    openProjectModal() {
        this.selectedColor = '#4f46e5';
        document.getElementById("modalProjectTitle").textContent = "Nouveau projet";
        document.getElementById("formProject").reset();
        document.getElementById("projectId").value = "";
        
        // Sélectionner couleur par défaut
        document.querySelectorAll(".color-option").forEach(o => {
            o.classList.toggle("selected", o.dataset.color === this.selectedColor);
        });
        
        this.updateMemberCheckboxes();
        
        // Vider les liens
        document.getElementById('projectLinksContainer').innerHTML = '';
        
        this.openModal("modalProject");
    }

    openEditProject(id) {
        const p = store.state.projects.find(p => p.id === id);
        if (!p) return;

        document.getElementById("modalProjectTitle").textContent = "Modifier le projet";
        document.getElementById("projectId").value = p.id;
        document.getElementById("projectName").value = p.name;
        document.getElementById("projectDesc").value = p.description;
        document.getElementById("projectStatus").value = p.status;
        document.getElementById("projectPriority").value = p.priority;
        document.getElementById("projectStart").value = p.startDate || '';
        document.getElementById("projectEnd").value = p.endDate || '';
        document.getElementById("projectRelease").value = p.releaseDate || '';
        document.getElementById("projectBudget").value = p.budget || '';
        document.getElementById("projectActualSpent").value = p.actualSpent || 0;

        this.selectedColor = p.color;
        document.querySelectorAll(".color-option").forEach(o => {
            o.classList.toggle("selected", o.dataset.color === p.color);
        });

        this.updateMemberCheckboxes(p.members);
        
        // Charger les liens
        const linksContainer = document.getElementById('projectLinksContainer');
        linksContainer.innerHTML = '';
        if (p.links && p.links.length > 0) {
            p.links.forEach(link => {
                addProjectLink(link.path, link.label, link.url);
            });
        }
        
        this.openModal("modalProject");
    }

    openTaskModal(prefilledDate = null) {
        document.getElementById("modalTaskTitle").textContent = "Nouvelle tâche";
        document.getElementById("formTask").reset();
        document.getElementById("taskId").value = "";
        
        // Pré-remplir la date si fournie (depuis le calendrier par exemple)
        if (prefilledDate) {
            document.getElementById("taskDue").value = prefilledDate;
            // Convertir la date pour l'affichage
            const [year, month, day] = prefilledDate.split('-');
            const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin",
                              "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
            const displayDate = `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
            notificationService.info(`Échéance définie au ${displayDate}`);
        }
        
        this.updateTaskProjectSelect();
        this.updateTaskAssigneeSelect();
        this.openModal("modalTask");
    }

    openEditTask(id) {
        const t = store.state.tasks.find(t => t.id === id);
        if (!t) return;

        document.getElementById("modalTaskTitle").textContent = "Modifier la tâche";
        document.getElementById("taskId").value = t.id;
        document.getElementById("taskName").value = t.name;
        document.getElementById("taskDesc").value = t.description;
        document.getElementById("taskType").value = t.type || 'feature';
        document.getElementById("taskStatus").value = t.status;
        document.getElementById("taskPriority").value = t.priority;
        document.getElementById("taskStartDate").value = t.startDate || '';
        document.getElementById("taskDue").value = t.dueDate || '';
        document.getElementById("taskProgress").value = t.progress;
        document.getElementById("progressValue").textContent = t.progress + '%';
        document.getElementById("blockedReason").value = t.blockedReason || '';
        
        // Champs backlog - Hiérarchie
        document.getElementById("taskEpic").value = t.epic || '';
        document.getElementById("taskUserStory").value = t.userStory || '';
        
        // Champs backlog - Organisation
        document.getElementById("taskDomain").value = t.domain || '';
        document.getElementById("taskSubdomain").value = t.subdomain || '';
        
        // Champs backlog - Analyse
        document.getElementById("taskHypothesis").value = t.hypothesis || '';
        document.getElementById("taskSolution").value = t.solution || '';
        document.getElementById("taskAcceptanceCriteria").value = t.acceptanceCriteria || '';
        document.getElementById("taskRisks").value = t.risks || '';
        
        // Champs backlog - Estimation
        document.getElementById("taskEstimationDays").value = t.estimationDays || '';
        document.getElementById("taskEstimationHours").value = t.estimationHours || '';
        document.getElementById("taskStoryPoints").value = t.storyPoints || '';
        
        // Champs backlog - Dépendances
        document.getElementById("taskDependencies").value = (t.dependencies || []).join(', ');

        // Afficher le champ de raison si bloqué
        toggleBlockedReason();

        this.updateTaskProjectSelect(t.project);
        this.updateTaskAssigneeSelect(t.assignee);
        this.openModal("modalTask");
    }

    openMemberModal() {
        document.getElementById("modalMemberTitle").textContent = "Nouveau membre";
        document.getElementById("formMember").reset();
        document.getElementById("memberId").value = "";
        this.openModal("modalMember");
    }

    openEditMember(id) {
        const m = store.state.members.find(m => m.id === id);
        if (!m) return;

        document.getElementById("modalMemberTitle").textContent = "Modifier le membre";
        document.getElementById("memberId").value = m.id;
        document.getElementById("memberFirstName").value = m.firstName;
        document.getElementById("memberLastName").value = m.lastName;
        document.getElementById("memberEmail").value = m.email;
        document.getElementById("memberRole").value = m.role;
        document.getElementById("memberDept").value = m.department;
        this.openModal("modalMember");
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('open');
        }
    }

    updateMemberCheckboxes(selectedMembers = []) {
        const container = document.getElementById('memberCheckboxes');
        if (!container) return;

        container.innerHTML = store.state.members.map(m => `
            <label class="member-checkbox">
                <input type="checkbox" value="${m.id}" ${selectedMembers.includes(m.id) ? 'checked' : ''}>
                <span>${m.firstName} ${m.lastName}</span>
            </label>
        `).join('');
    }

    updateTaskProjectSelect(selectedProject = null) {
        const select = document.getElementById('taskProject');
        if (!select) return;

        select.innerHTML = '<option value="">Sélectionner un projet</option>' +
            store.state.projects.map(p => `
                <option value="${p.id}" ${p.id === selectedProject ? 'selected' : ''}>${p.name}</option>
            `).join('');
    }

    updateTaskAssigneeSelect(selectedAssignee = null) {
        const select = document.getElementById('taskAssignee');
        if (!select) return;

        select.innerHTML = '<option value="">Non assigné</option>' +
            store.state.members.map(m => `
                <option value="${m.id}" ${m.id === selectedAssignee ? 'selected' : ''}>${m.firstName} ${m.lastName}</option>
            `).join('');
    }

    updateTaskProjectFilter() {
        const select = document.getElementById('filterTaskProject');
        if (!select) return;

        select.innerHTML = '<option value="all">Tous les projets</option>' +
            store.state.projects.map(p => `
                <option value="${p.id}">${p.name}</option>
            `).join('');
    }

    deleteProject(id) {
        notificationService.confirm(
            'Êtes-vous sûr de vouloir supprimer ce projet ?',
            () => {
                store.state.projects = store.state.projects.filter(p => p.id !== id);
                store.set('projects', store.state.projects);
                notificationService.success('Projet supprimé');
                this.renderProjects();
            }
        );
    }

    deleteTask(id) {
        notificationService.confirm(
            'Êtes-vous sûr de vouloir supprimer cette tâche ?',
            () => {
                store.state.tasks = store.state.tasks.filter(t => t.id !== id);
                store.set('tasks', store.state.tasks);
                notificationService.success('Tâche supprimée');
                this.renderTasks();
            }
        );
    }

    deleteMember(id) {
        notificationService.confirm(
            'Êtes-vous sûr de vouloir supprimer ce membre ?',
            () => {
                store.state.members = store.state.members.filter(m => m.id !== id);
                store.set('members', store.state.members);
                notificationService.success('Membre supprimé');
                this.renderTeam();
            }
        );
    }

    /**
     * Afficher/masquer le dropdown des notifications
     */
    toggleNotifications() {
        const dropdown = document.getElementById('notificationsDropdown');
        if (!dropdown) return;
        
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            this.renderNotifications();
        }
    }

    /**
     * Afficher les notifications dans le dropdown
     */
    renderNotifications() {
        const content = document.getElementById('notificationsContent');
        const badge = document.getElementById('notificationsBadge');
        if (!content) return;
        
        const activities = store.state.activities || [];
        const recentActivities = activities.slice(-10).reverse(); // 10 dernières activités
        
        // Mise à jour du badge
        if (badge) {
            if (activities.length > 0) {
                badge.textContent = activities.length > 99 ? '99+' : activities.length;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
        
        // Si aucune notification
        if (recentActivities.length === 0) {
            content.innerHTML = `
                <div class="notifications-empty">
                    <i class="fas fa-bell-slash"></i>
                    <p>Aucune nouvelle notification</p>
                </div>
            `;
            return;
        }
        
        // Afficher les notifications
        const html = recentActivities.map(activity => {
            // Support des deux formats d'activités (ancien et nouveau)
            const message = activity.text || activity.action || 'Notification';
            const iconClass = activity.icon ? `fas ${activity.icon}` : this.getNotificationIcon(activity.type);
            const iconColor = activity.iconBg || this.getNotificationIconColor(activity.type);
            const timeAgo = activity.time || this.getTimeAgo(activity.timestamp || activity.date);
            
            return `
                <div class="notification-item">
                    <div class="notification-icon ${iconColor}">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="notification-text">
                        <div class="notification-message">${message}</div>
                        <div class="notification-time">${timeAgo}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        content.innerHTML = html;
    }

    /**
     * Effacer toutes les notifications
     */
    clearNotifications() {
        notificationService.confirm(
            'Voulez-vous effacer toutes les notifications ?',
            () => {
                store.state.activities = [];
                store.set('activities', []);
                this.renderNotifications();
                notificationService.success('Notifications effacées');
            }
        );
    }

    /**
     * Obtenir l'icône selon le type d'activité
     */
    getNotificationIcon(type) {
        const icons = {
            'project': 'fas fa-folder',
            'task': 'fas fa-check-circle',
            'member': 'fas fa-user',
            'comment': 'fas fa-comment',
            'alert': 'fas fa-exclamation-triangle',
            'success': 'fas fa-check-circle',
            'info': 'fas fa-info-circle'
        };
        return icons[type] || 'fas fa-bell';
    }

    /**
     * Obtenir la couleur de l'icône selon le type
     */
    getNotificationIconColor(type) {
        const colors = {
            'project': 'blue',
            'task': 'green',
            'member': 'blue',
            'comment': 'orange',
            'alert': 'red',
            'success': 'green',
            'info': 'blue'
        };
        return colors[type] || 'blue';
    }

    /**
     * Calculer le temps écoulé depuis une date
     */
    getTimeAgo(dateString) {
        if (!dateString) return 'À l\'instant';
        
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'À l\'instant';
        if (minutes < 60) return `Il y a ${minutes} min`;
        if (hours < 24) return `Il y a ${hours}h`;
        if (days < 7) return `Il y a ${days}j`;
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }

    /**
     * Ouvrir la modal des liens d'un projet
     */
    openProjectLinksModal(projectId) {
        const project = store.state.projects.find(p => p.id === projectId);
        if (!project || !project.links || project.links.length === 0) {
            notificationService.info('Aucun lien SharePoint pour ce projet');
            return;
        }

        document.getElementById('projectLinksModalTitle').textContent = `Liens SharePoint - ${project.name}`;
        
        const container = document.getElementById('projectLinksListContainer');
        container.innerHTML = project.links.map((link, index) => `
            <div class="project-link-display-item">
                <div class="link-icon">
                    <i class="fas fa-folder"></i>
                </div>
                <div class="link-content">
                    <div class="link-path">
                        <i class="fas fa-angle-right" style="margin: 0 4px; color: var(--text-light); font-size: 0.7rem;"></i>
                        ${link.path.split('/').join(' <i class="fas fa-angle-right" style="margin: 0 4px; color: var(--text-light); font-size: 0.7rem;"></i> ')}
                    </div>
                    <div class="link-label">${link.label}</div>
                    <div class="link-url">${link.url}</div>
                </div>
                <div class="link-actions">
                    <a href="${link.url}" target="_blank" class="btn btn-sm btn-primary" title="Ouvrir le lien">
                        <i class="fas fa-external-link-alt"></i>
                        Ouvrir
                    </a>
                    <button class="btn btn-sm btn-outline" onclick="copyToClipboard('${link.url.replace(/'/g, "\\'")}')", title="Copier le lien">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        this.openModal('modalProjectLinks');
    }

    /**
     * Ouvrir la modal de visualisation d'une tâche
     */
    openTaskViewModal(taskId) {
        const task = store.state.tasks.find(t => t.id === taskId);
        if (!task) return;

        const project = store.state.projects.find(p => p.id === task.project);
        const assignee = store.state.members.find(m => m.id === task.assignee);

        document.getElementById('taskViewTitle').textContent = task.name;
        
        // Sauvegarder l'ID pour le bouton Modifier
        document.getElementById('btnEditTaskFromView').setAttribute('data-task-id', taskId);
        
        const content = document.getElementById('taskViewContent');
        content.innerHTML = `
            <div class="task-view-container">
                <!-- Informations principales -->
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-info-circle"></i> Informations principales</h3>
                    <div class="task-view-grid">
                        <div class="task-view-field">
                            <label>Nom</label>
                            <div class="task-view-value">${task.name}</div>
                        </div>
                        ${task.description ? `
                        <div class="task-view-field full-width">
                            <label>Description</label>
                            <div class="task-view-value">${task.description}</div>
                        </div>
                        ` : ''}
                        <div class="task-view-field">
                            <label>Type</label>
                            <div class="task-view-value">${getTypeLabel(task.type || 'feature')}</div>
                        </div>
                        <div class="task-view-field">
                            <label>Statut</label>
                            <div>${getStatusTag(task.status)}</div>
                        </div>
                        <div class="task-view-field">
                            <label>Priorité</label>
                            <div>${getPriorityTag(task.priority)}</div>
                        </div>
                        <div class="task-view-field">
                            <label>Progression</label>
                            <div class="task-view-value">
                                <div class="progress-bar" style="margin-top: 4px;">
                                    <div class="progress-fill" style="width: ${task.progress}%; background: var(--primary);"></div>
                                </div>
                                <span style="font-size: 0.85rem; color: var(--text-light); margin-top: 4px;">${task.progress}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Structure backlog -->
                ${task.epic || task.userStory ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-layer-group"></i> Structure Backlog</h3>
                    <div class="task-view-grid">
                        ${task.epic ? `
                        <div class="task-view-field">
                            <label>Epic</label>
                            <div class="task-view-value"><span class="badge badge-purple">📦 ${task.epic}</span></div>
                        </div>
                        ` : ''}
                        ${task.userStory ? `
                        <div class="task-view-field">
                            <label>User Story</label>
                            <div class="task-view-value"><span class="badge badge-blue">📋 ${task.userStory}</span></div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                <!-- Domaine et contexte -->
                ${task.domain || task.subdomain ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-sitemap"></i> Domaine et contexte</h3>
                    <div class="task-view-grid">
                        ${task.domain ? `
                        <div class="task-view-field">
                            <label>Domaine</label>
                            <div class="task-view-value">${task.domain}</div>
                        </div>
                        ` : ''}
                        ${task.subdomain ? `
                        <div class="task-view-field">
                            <label>Sous-domaine</label>
                            <div class="task-view-value">${task.subdomain}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                <!-- Hypothèse et solution -->
                ${task.hypothesis || task.solution ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-lightbulb"></i> Hypothèse et solution</h3>
                    <div class="task-view-grid">
                        ${task.hypothesis ? `
                        <div class="task-view-field full-width">
                            <label>Hypothèse</label>
                            <div class="task-view-value">${task.hypothesis}</div>
                        </div>
                        ` : ''}
                        ${task.solution ? `
                        <div class="task-view-field full-width">
                            <label>Solution proposée</label>
                            <div class="task-view-value">${task.solution}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                <!-- Critères d'acceptation -->
                ${task.acceptanceCriteria ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-check-square"></i> Critères d'acceptation</h3>
                    <div class="task-view-field full-width">
                        <div class="task-view-value" style="white-space: pre-wrap;">${task.acceptanceCriteria}</div>
                    </div>
                </div>
                ` : ''}

                <!-- Risques -->
                ${task.risks ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-exclamation-triangle"></i> Risques identifiés</h3>
                    <div class="task-view-field full-width">
                        <div class="task-view-value risk-box" style="white-space: pre-wrap;">${task.risks}</div>
                    </div>
                </div>
                ` : ''}

                <!-- Dépendances -->
                ${task.dependencies ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-link"></i> Dépendances</h3>
                    <div class="task-view-field full-width">
                        <div class="task-view-value">${task.dependencies}</div>
                    </div>
                </div>
                ` : ''}

                <!-- Estimation -->
                ${task.estimationDays || task.estimationHours || task.storyPoints ? `
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-clock"></i> Estimation</h3>
                    <div class="task-view-grid">
                        ${task.estimationDays ? `
                        <div class="task-view-field">
                            <label>Jours</label>
                            <div class="task-view-value"><span class="badge badge-blue">${task.estimationDays} j</span></div>
                        </div>
                        ` : ''}
                        ${task.estimationHours ? `
                        <div class="task-view-field">
                            <label>Heures</label>
                            <div class="task-view-value"><span class="badge badge-blue">${task.estimationHours} h</span></div>
                        </div>
                        ` : ''}
                        ${task.storyPoints ? `
                        <div class="task-view-field">
                            <label>Story Points</label>
                            <div class="task-view-value"><span class="badge badge-purple">${task.storyPoints} SP</span></div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                <!-- Dates et affectation -->
                <div class="task-view-section">
                    <h3 class="task-view-section-title"><i class="fas fa-calendar-alt"></i> Planning et affectation</h3>
                    <div class="task-view-grid">
                        ${project ? `
                        <div class="task-view-field">
                            <label>Projet</label>
                            <div class="task-view-value"><span class="tag tag-gray">${project.name}</span></div>
                        </div>
                        ` : ''}
                        ${assignee ? `
                        <div class="task-view-field">
                            <label>Assigné à</label>
                            <div class="task-view-value">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <div class="member-chip" style="background: ${memberColor(assignee.id)}">
                                        ${assignee.firstName[0]}${assignee.lastName[0]}
                                    </div>
                                    <span>${assignee.firstName} ${assignee.lastName}</span>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        ${task.startDate ? `
                        <div class="task-view-field">
                            <label>Date début</label>
                            <div class="task-view-value"><i class="fas fa-calendar"></i> ${formatDate(task.startDate)}</div>
                        </div>
                        ` : ''}
                        ${task.dueDate ? `
                        <div class="task-view-field">
                            <label>Échéance</label>
                            <div class="task-view-value ${task.isOverdue() ? 'overdue' : ''}"><i class="fas fa-calendar-check"></i> ${formatDate(task.dueDate)}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Blocage -->
                ${task.status === 'bloqué' && task.blockedReason ? `
                <div class="task-view-section" style="border-left: 4px solid #ef4444;">
                    <h3 class="task-view-section-title" style="color: #ef4444;"><i class="fas fa-ban"></i> Blocage</h3>
                    <div class="task-view-field full-width">
                        <div class="task-view-value" style="background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 6px; color: #dc2626;">
                            🚫 ${task.blockedReason}
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <!-- Actions rapides statut -->
                <div class="task-view-section" style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border: none;">
                    <h3 class="task-view-section-title"><i class="fas fa-bolt"></i> Actions rapides</h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${task.status !== 'à faire' ? `
                        <button class="quick-status-btn" onclick="quickChangeStatus(${task.id}, 'à faire')" style="background: #6b7280;">
                            <i class="fas fa-circle"></i> À faire
                        </button>
                        ` : ''}
                        ${task.status !== 'en cours' ? `
                        <button class="quick-status-btn" onclick="quickChangeStatus(${task.id}, 'en cours')" style="background: #3b82f6;">
                            <i class="fas fa-spinner"></i> En cours
                        </button>
                        ` : ''}
                        ${task.status !== 'bloqué' ? `
                        <button class="quick-status-btn" onclick="quickChangeStatus(${task.id}, 'bloqué')" style="background: #ef4444;">
                            <i class="fas fa-ban"></i> Bloquer
                        </button>
                        ` : ''}
                        ${task.status !== 'terminé' ? `
                        <button class="quick-status-btn" onclick="quickChangeStatus(${task.id}, 'terminé')" style="background: #10b981;">
                            <i class="fas fa-check"></i> Terminer
                        </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        this.openModal('modalTaskView');
    }

    /**
     * Changer rapidement le statut d'une tâche
     */
    quickChangeTaskStatus(taskId, newStatus) {
        const task = store.state.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        // Si on bloque, demander la raison
        if (newStatus === 'bloqué' && !task.blockedReason) {
            const reason = prompt('Raison du blocage:');
            if (!reason) {
                notificationService.warning('Blocage annulé');
                return;
            }
            task.blockedReason = reason;
        }
        
        // Si on débloque, effacer la raison
        if (task.status === 'bloqué' && newStatus !== 'bloqué') {
            task.blockedReason = null;
        }
        
        // Mettre à jour le statut
        const oldStatus = task.status;
        task.status = newStatus;
        
        // Si terminé, mettre la progression à 100%
        if (newStatus === 'terminé') {
            task.progress = 100;
        }
        
        store.set('tasks', store.state.tasks);
        notificationService.success(`Statut changé: ${oldStatus} → ${newStatus}`);
        
        // Recharger la modal de visualisation
        this.openTaskViewModal(taskId);
        
        // Rafraîchir le Kanban
        this.renderTasks();
    }
}

// Démarrer l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    
    // Initialiser les événements des modals
    initModalEvents();
});

// Initialiser les événements des modals
function initModalEvents() {
    // Color picker
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            app.selectedColor = this.dataset.color;
        });
    });
}

// Rendre les fonctions principales accessibles globalement pour les onclick dans le HTML
window.navigateTo = (page) => window.app.navigateTo(page);
window.closeModal = (modalId) => window.app.closeModal(modalId);
window.openProjectLinks = (projectId) => window.app.openProjectLinksModal(projectId);
window.editTaskFromView = () => {
    const taskId = parseInt(document.getElementById('btnEditTaskFromView').getAttribute('data-task-id'));
    window.app.closeModal('modalTaskView');
    setTimeout(() => window.app.openEditTask(taskId), 100);
};
window.quickChangeStatus = (taskId, newStatus) => {
    window.app.quickChangeTaskStatus(taskId, newStatus);
};

// Fonctions de sauvegarde
window.saveProject = () => {
    const id = document.getElementById('projectId').value;
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDesc').value;
    const status = document.getElementById('projectStatus').value;
    const priority = document.getElementById('projectPriority').value;
    const startDate = document.getElementById('projectStart').value;
    const endDate = document.getElementById('projectEnd').value;
    const releaseDate = document.getElementById('projectRelease').value;
    const budget = parseFloat(document.getElementById('projectBudget').value) || null;
    const actualSpent = parseFloat(document.getElementById('projectActualSpent').value) || 0;

    if (!name.trim()) {
        notificationService.error('Le nom du projet est requis');
        return;
    }

    // Récupérer les membres sélectionnés
    const memberCheckboxes = document.querySelectorAll('#memberCheckboxes input:checked');
    const members = Array.from(memberCheckboxes).map(cb => parseInt(cb.value));

    // Récupérer les liens SharePoint
    const links = [];
    document.querySelectorAll('.project-link-item').forEach(item => {
        const path = item.querySelector('.link-path').value.trim();
        const label = item.querySelector('.link-label').value.trim();
        const url = item.querySelector('.link-url').value.trim();
        if (path && label && url) {
            links.push({ path, label, url });
        }
    });

    const data = {
        name,
        description,
        status,
        priority,
        startDate,
        endDate,
        releaseDate,
        budget,
        actualSpent,
        members,
        links,
        color: app.selectedColor
    };

    if (id) {
        // Modification
        const project = store.state.projects.find(p => p.id == id);
        if (project) {
            project.update(data);
            notificationService.success('Projet modifié');
        }
    } else {
        // Création
        const newProject = new Project(data);
        store.state.projects.push(newProject);
        notificationService.success('Projet créé');
    }

    store.set('projects', store.state.projects);
    app.closeModal('modalProject');
    app.renderProjects();
    app.renderDashboard();
};

window.saveTask = () => {
    const id = document.getElementById('taskId').value;
    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDesc').value;
    const type = document.getElementById('taskType').value;
    const project = parseInt(document.getElementById('taskProject').value);
    const assignee = parseInt(document.getElementById('taskAssignee').value) || null;
    const status = document.getElementById('taskStatus').value;
    const priority = document.getElementById('taskPriority').value;
    const startDate = document.getElementById('taskStartDate').value;
    const dueDate = document.getElementById('taskDue').value;
    const progress = parseInt(document.getElementById('taskProgress').value);
    const blockedReason = document.getElementById('blockedReason').value;
    
    // Champs backlog - Hiérarchie
    const epic = document.getElementById('taskEpic').value;
    const userStory = document.getElementById('taskUserStory').value;
    
    // Champs backlog - Organisation
    const domain = document.getElementById('taskDomain').value;
    const subdomain = document.getElementById('taskSubdomain').value;
    
    // Champs backlog - Analyse
    const hypothesis = document.getElementById('taskHypothesis').value;
    const solution = document.getElementById('taskSolution').value;
    const acceptanceCriteria = document.getElementById('taskAcceptanceCriteria').value;
    const risks = document.getElementById('taskRisks').value;
    
    // Champs backlog - Estimation
    const estimationDays = parseFloat(document.getElementById('taskEstimationDays').value) || null;
    const estimationHours = parseFloat(document.getElementById('taskEstimationHours').value) || null;
    const storyPoints = parseInt(document.getElementById('taskStoryPoints').value) || null;
    
    // Champs backlog - Dépendances
    const dependenciesStr = document.getElementById('taskDependencies').value;
    const dependencies = dependenciesStr ? dependenciesStr.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d)) : [];

    if (!name.trim()) {
        notificationService.error('Le nom de la tâche est requis');
        return;
    }

    if (!project) {
        notificationService.error('Veuillez sélectionner un projet');
        return;
    }

    if (status === 'bloqué' && !blockedReason.trim()) {
        notificationService.error('Veuillez indiquer la raison du blocage');
        return;
    }

    const data = {
        name,
        description,
        type,
        project,
        assignee,
        status,
        priority,
        startDate,
        dueDate,
        progress,
        blockedReason: status === 'bloqué' ? blockedReason : null,
        epic,
        userStory,
        domain,
        subdomain,
        hypothesis,
        solution,
        acceptanceCriteria,
        risks,
        estimationDays,
        estimationHours,
        storyPoints,
        dependencies
    };

    if (id) {
        // Modification
        const task = store.state.tasks.find(t => t.id == id);
        if (task) {
            task.update(data);
            notificationService.success('Tâche modifiée');
        }
    } else {
        // Création
        const newTask = new Task(data);
        store.state.tasks.push(newTask);
        notificationService.success('Tâche créée');
    }

    store.set('tasks', store.state.tasks);
    app.closeModal('modalTask');
    app.renderTasks();
    app.renderDashboard();
};

window.saveMember = () => {
    const id = document.getElementById('memberId').value;
    const firstName = document.getElementById('memberFirstName').value;
    const lastName = document.getElementById('memberLastName').value;
    const email = document.getElementById('memberEmail').value;
    const role = document.getElementById('memberRole').value;
    const department = document.getElementById('memberDept').value;

    if (!firstName.trim() || !lastName.trim()) {
        notificationService.error('Le prénom et le nom sont requis');
        return;
    }

    if (!email.trim() || !isValidEmail(email)) {
        notificationService.error('Email valide requis');
        return;
    }

    const data = {
        firstName,
        lastName,
        email,
        role,
        department
    };

    if (id) {
        // Modification
        const member = store.state.members.find(m => m.id == id);
        if (member) {
            member.update(data);
            notificationService.success('Membre modifié');
        }
    } else {
        // Création
        const newMember = new Member(data);
        store.state.members.push(newMember);
        notificationService.success('Membre ajouté');
    }

    store.set('members', store.state.members);
    app.closeModal('modalMember');
    app.renderTeam();
    app.renderDashboard();
};

// Afficher/masquer le champ de raison de blocage
window.toggleBlockedReason = () => {
    const status = document.getElementById('taskStatus').value;
    const blockedGroup = document.getElementById('blockedReasonGroup');
    if (status === 'bloqué') {
        blockedGroup.style.display = 'block';
    } else {
        blockedGroup.style.display = 'none';
        document.getElementById('blockedReason').value = '';
    }
};

// Gestion des liens SharePoint pour les projets
window.addProjectLink = (path = '', label = '', url = '') => {
    const container = document.getElementById('projectLinksContainer');
    const linkId = Date.now();
    
    const linkItem = document.createElement('div');
    linkItem.className = 'project-link-item';
    linkItem.style.cssText = 'display: grid; grid-template-columns: 2fr 2fr 3fr auto; gap: 8px; align-items: start; padding: 12px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 8px;';
    
    linkItem.innerHTML = `
        <div>
            <label style="font-size: 0.75rem; color: var(--text-light); display: block; margin-bottom: 4px;">Chemin</label>
            <input type="text" class="link-path" value="${path}" placeholder="Projet/Layout/Traduction" 
                   style="width: 100%; padding: 6px 10px; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85rem;">
            <small style="font-size: 0.7rem; color: var(--text-light); margin-top: 2px; display: block;">Ex: Projet/Docs</small>
        </div>
        <div>
            <label style="font-size: 0.75rem; color: var(--text-light); display: block; margin-bottom: 4px;">Nom du lien</label>
            <input type="text" class="link-label" value="${label}" placeholder="Traductions FR" 
                   style="width: 100%; padding: 6px 10px; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85rem;">
        </div>
        <div>
            <label style="font-size: 0.75rem; color: var(--text-light); display: block; margin-bottom: 4px;">URL SharePoint</label>
            <input type="url" class="link-url" value="${url}" placeholder="https://sharepoint.com/..." 
                   style="width: 100%; padding: 6px 10px; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85rem;">
        </div>
        <div style="display: flex; align-items: flex-end; height: 100%;">
            <button type="button" class="btn btn-icon" onclick="removeProjectLink(${linkId})" 
                    style="background: var(--danger); color: white; padding: 6px 10px; margin-top: 18px;" title="Supprimer">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    linkItem.dataset.linkId = linkId;
    container.appendChild(linkItem);
};

window.removeProjectLink = (linkId) => {
    const linkItem = document.querySelector(`[data-link-id="${linkId}"]`);
    if (linkItem) {
        linkItem.remove();
    }
};

window.renderProjects = () => window.app.renderProjects();
window.renderTasks = () => window.app.renderTasks();
window.setProjectView = (view) => {
    const container = document.getElementById("projectsContainer");
    if (container) {
        container.className = `projects-container ${view}-view`;
        document.getElementById("viewGrid")?.classList.toggle("active", view === "grid");
        document.getElementById("viewList")?.classList.toggle("active", view === "list");
        window.app.renderProjects();
    }
};

/**
 * Exporter le backlog au format CSV (Excel)
 */
window.exportBacklogCSV = () => {
    const tasks = store.state.tasks;
    if (!tasks || tasks.length === 0) {
        notificationService.error('Aucune tâche à exporter');
        return;
    }

    // Fermer le menu
    document.getElementById('exportBacklogMenu').style.display = 'none';

    // Headers CSV - Structure complète
    const headers = [
        'ID',
        'Titre',
        'Type',
        'Epic',
        'User Story',
        'Description',
        'Domaine',
        'Sous-domaine',
        'Statut',
        'Priorité',
        'Projet',
        'Assigné à',
        'Hypothèse',
        'Solution',
        'Critères d\'acceptation',
        'Risques',
        'Dépendances',
        'Estimation (j)',
        'Estimation (h)',
        'Story Points',
        'Date début',
        'Date échéance',
        'Progression (%)',
        'Bloqué',
        'Raison blocage',
        'Créé le'
    ];

    // Convertir les tâches en lignes CSV
    const rows = tasks.map(t => {
        const project = store.state.projects.find(p => p.id === t.project);
        const member = store.state.members.find(m => m.id === t.assignee);
        
        const typeIcons = {
            'feature': 'Feature',
            'bug': 'Bug',
            'tech': 'Tech',
            'amélioration': 'Amélioration',
            'doc': 'Documentation'
        };
        
        return [
            t.id,
            `"${(t.name || '').replace(/"/g, '""')}"`,
            typeIcons[t.type] || t.type || 'Feature',
            `"${(t.epic || '').replace(/"/g, '""')}"`,
            `"${(t.userStory || '').replace(/"/g, '""')}"`,
            `"${(t.description || '').replace(/"/g, '""')}"`,
            t.domain || '',
            `"${(t.subdomain || '').replace(/"/g, '""')}"`,
            t.status || '',
            t.priority || '',
            project ? `"${project.name.replace(/"/g, '""')}"` : '',
            member ? `"${member.firstName} ${member.lastName}"` : '',
            `"${(t.hypothesis || '').replace(/"/g, '""')}"`,
            `"${(t.solution || '').replace(/"/g, '""')}"`,
            `"${(t.acceptanceCriteria || '').replace(/"/g, '""')}"`,
            `"${(t.risks || '').replace(/"/g, '""')}"`,
            (t.dependencies || []).join('; '),
            t.estimationDays || '',
            t.estimationHours || '',
            t.storyPoints || '',
            t.startDate || '',
            t.dueDate || '',
            t.progress || 0,
            t.status === 'bloqué' ? 'Oui' : 'Non',
            `"${(t.blockedReason || '').replace(/"/g, '""')}"`,
            new Date(t.createdAt).toLocaleDateString('fr-FR')
        ].join(',');
    });

    // Assembler le CSV
    const csv = [headers.join(','), ...rows].join('\\n');

    // Télécharger le fichier
    const filename = `backlog-export-${new Date().toISOString().split('T')[0]}.csv`;
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    notificationService.success(`Backlog exporté: ${tasks.length} tâches avec tous les champs`);
};

/**
 * Exporter le backlog au format PDF
 */
window.exportBacklogPDF = () => {
    const tasks = store.state.tasks;
    if (!tasks || tasks.length === 0) {
        notificationService.error('Aucune tâche à exporter');
        return;
    }

    // Fermer le menu
    document.getElementById('exportBacklogMenu').style.display = 'none';

    // Créer une fenêtre d'impression avec le contenu formaté
    const printWindow = window.open('', '_blank');
    
    const taskCards = tasks.map(t => {
        const project = store.state.projects.find(p => p.id === t.project);
        const member = store.state.members.find(m => m.id === t.assignee);
        
        return `
            <div class="task-card">
                <div class="task-header">
                    <div class="task-title">
                        <span class="task-id">#${t.id}</span>
                        <h3>${t.name}</h3>
                    </div>
                    <div class="task-badges">
                        <span class="badge badge-status-${t.status}">${t.status}</span>
                        <span class="badge badge-priority-${t.priority}">${t.priority}</span>
                    </div>
                </div>
                
                ${t.description ? `
                <div class="task-section">
                    <div class="section-label">Description</div>
                    <div class="section-content">${t.description}</div>
                </div>
                ` : ''}
                
                <div class="task-meta">
                    <div class="meta-row">
                        ${t.epic ? `<div class="meta-item"><strong>Epic:</strong> ${t.epic}</div>` : ''}
                        ${t.userStory ? `<div class="meta-item"><strong>User Story:</strong> ${t.userStory}</div>` : ''}
                        ${t.domain ? `<div class="meta-item"><strong>Domaine:</strong> ${t.domain}</div>` : ''}
                        ${t.subdomain ? `<div class="meta-item"><strong>Sous-domaine:</strong> ${t.subdomain}</div>` : ''}
                    </div>
                    <div class="meta-row">
                        ${project ? `<div class="meta-item"><strong>Projet:</strong> ${project.name}</div>` : ''}
                        ${member ? `<div class="meta-item"><strong>Assigné:</strong> ${member.firstName} ${member.lastName}</div>` : ''}
                        ${t.dueDate ? `<div class="meta-item"><strong>Échéance:</strong> ${new Date(t.dueDate).toLocaleDateString('fr-FR')}</div>` : ''}
                    </div>
                    <div class="meta-row">
                        ${t.estimationDays ? `<div class="meta-item"><strong>Estimation:</strong> ${t.estimationDays}j</div>` : ''}
                        ${t.estimationHours ? `<div class="meta-item"><strong>Heures:</strong> ${t.estimationHours}h</div>` : ''}
                        ${t.storyPoints ? `<div class="meta-item"><strong>Story Points:</strong> ${t.storyPoints}</div>` : ''}
                        <div class="meta-item"><strong>Progression:</strong> ${t.progress}%</div>
                    </div>
                </div>
                
                ${t.hypothesis ? `
                <div class="task-section">
                    <div class="section-label">Hypothèse</div>
                    <div class="section-content">${t.hypothesis}</div>
                </div>
                ` : ''}
                
                ${t.solution ? `
                <div class="task-section">
                    <div class="section-label">Solution proposée</div>
                    <div class="section-content">${t.solution}</div>
                </div>
                ` : ''}
                
                ${t.acceptanceCriteria ? `
                <div class="task-section">
                    <div class="section-label">Critères d'acceptation</div>
                    <div class="section-content criteria">${t.acceptanceCriteria.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
                
                ${t.risks ? `
                <div class="task-section risk-section">
                    <div class="section-label">⚠️ Risques identifiés</div>
                    <div class="section-content">${t.risks.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
                
                ${t.dependencies ? `
                <div class="task-section">
                    <div class="section-label">Dépendances</div>
                    <div class="section-content">${t.dependencies}</div>
                </div>
                ` : ''}
                
                ${t.status === 'bloqué' && t.blockedReason ? `
                <div class="task-section blocked-section">
                    <div class="section-label">🚫 Blocage</div>
                    <div class="section-content">${t.blockedReason}</div>
                </div>
                ` : ''}
            </div>
        `;
    }).join('');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Backlog Détaillé - ProjeX</title>
            <style>
                @page { margin: 1cm; }
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    font-size: 10pt;
                    margin: 0;
                    padding: 20px;
                    background: #f9fafb;
                }
                h1 { 
                    color: #4f46e5; 
                    border-bottom: 3px solid #4f46e5;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .info { 
                    color: #6b7280; 
                    font-size: 9pt; 
                    margin-bottom: 20px;
                }
                .task-card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                    page-break-inside: avoid;
                }
                .task-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 15px;
                    padding-bottom: 12px;
                    border-bottom: 2px solid #e5e7eb;
                }
                .task-title {
                    flex: 1;
                }
                .task-id {
                    background: #e0e7ff;
                    color: #4f46e5;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 10pt;
                    margin-right: 10px;
                }
                .task-title h3 {
                    display: inline;
                    font-size: 13pt;
                    color: #1f2937;
                    margin: 0;
                }
                .task-badges {
                    display: flex;
                    gap: 8px;
                }
                .badge {
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 9pt;
                    font-weight: 600;
                    white-space: nowrap;
                }
                .badge-status-à { background: #e5e7eb; color: #374151; }
                .badge-status-en { background: #dbeafe; color: #1e40af; }
                .badge-status-bloqué { background: #fee2e2; color: #991b1b; }
                .badge-status-terminé { background: #d1fae5; color: #065f46; }
                .badge-priority-haute { background: #fee2e2; color: #991b1b; }
                .badge-priority-moyenne { background: #fed7aa; color: #92400e; }
                .badge-priority-basse { background: #e5e7eb; color: #374151; }
                .task-section {
                    margin: 12px 0;
                }
                .section-label {
                    font-weight: 600;
                    color: #4b5563;
                    font-size: 9pt;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 6px;
                }
                .section-content {
                    color: #1f2937;
                    line-height: 1.6;
                    padding: 8px 12px;
                    background: #f9fafb;
                    border-left: 3px solid #d1d5db;
                    border-radius: 4px;
                }
                .risk-section .section-content {
                    background: #fef2f2;
                    border-left-color: #ef4444;
                }
                .blocked-section .section-content {
                    background: #fef2f2;
                    border-left-color: #dc2626;
                    font-weight: 600;
                    color: #991b1b;
                }
                .criteria {
                    white-space: pre-wrap;
                }
                .task-meta {
                    margin-top: 12px;
                }
                .meta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    margin-bottom: 8px;
                }
                .meta-item {
                    font-size: 9pt;
                    color: #6b7280;
                }
                .meta-item strong {
                    color: #374151;
                    font-weight: 600;
                }
                @media print {
                    .no-print { display: none; }
                    body { background: white; }
                }
            </style>
        </head>
        <body>
            <h1>📋 Backlog Détaillé ProjeX</h1>
            <div class="info">
                Export généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
                <br>Nombre de tâches: ${tasks.length}
            </div>
            <button class="no-print" onclick="window.print()" style="padding: 12px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; margin-bottom: 20px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                🖨️ Imprimer / Sauver en PDF
            </button>
            <div class="task-list">
                ${taskCards}
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();

    notificationService.success('Aperçu PDF prêt - Utilisez Ctrl+P pour imprimer/sauver');
};
