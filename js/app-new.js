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
                members: [1, 2, 3], progress: 65, tags: ['web', 'design']
            }),
            new Project({
                id: 2, name: "Application Mobile", color: "#10b981",
                description: "Développement d'une application iOS et Android.",
                status: "en cours", priority: "haute",
                startDate: "2026-03-01", endDate: "2026-09-30", releaseDate: "2026-08-15",
                members: [1, 4], progress: 30, tags: ['mobile', 'dev']
            }),
            new Project({
                id: 3, name: "Campagne Marketing", color: "#f59e0b",
                description: "Lancement de la campagne publicitaire Q2.",
                status: "planifié", priority: "moyenne",
                startDate: "2026-05-01", endDate: "2026-07-31",
                members: [3, 5], progress: 0, tags: ['marketing']
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

        let filtered = store.state.tasks.filter(t => {
            const matchStatus = statusFilter === "all" || t.status === statusFilter;
            const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
            const matchProject = projectFilter === "all" || t.project == projectFilter;
            return matchStatus && matchPriority && matchProject;
        });

        const columns = {
            'à faire': filtered.filter(t => t.status === 'à faire'),
            'en cours': filtered.filter(t => t.status === 'en cours'),
            'terminé': filtered.filter(t => t.status === 'terminé')
        };

        // Mettre à jour les compteurs
        document.getElementById('count-todo').textContent = columns['à faire'].length;
        document.getElementById('count-inprogress').textContent = columns['en cours'].length;
        document.getElementById('count-done').textContent = columns['terminé'].length;

        // Rendre les cartes
        Object.keys(columns).forEach(status => {
            const containerId = status === 'à faire' ? 'cards-todo' : 
                               status === 'en cours' ? 'cards-inprogress' : 'cards-done';
            const container = document.getElementById(containerId);
            
            if (!container) return;

            if (columns[status].length === 0) {
                container.innerHTML = '<div class="kanban-empty">Aucune tâche</div>';
                return;
            }

            container.innerHTML = columns[status].map(t => {
                const project = store.state.projects.find(p => p.id === t.project);
                const assignee = store.state.members.find(m => m.id === t.assignee);

                return `
                    <div class="kanban-card" draggable="true" data-id="${t.id}">
                        <div class="kanban-card-header">
                            <h4>${t.name}</h4>
                            <div class="kanban-card-actions">
                                <button class="action-btn" onclick="app.openEditTask(${t.id}); event.stopPropagation()" title="Modifier">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn danger" onclick="app.deleteTask(${t.id}); event.stopPropagation()" title="Supprimer">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
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
            if (d.getFullYear() === year && d.getMonth() === month) {
                monthEvents.push({
                    day: d.getDate(),
                    label: t.name,
                    type: "task",
                    priority: t.priority,
                    id: t.id
                });
            }
        });

        store.state.projects.forEach(p => {
            if (!p.endDate) return;
            const d = new Date(p.endDate);
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
            
            // Ajouter aussi la date de MEP si elle existe
            if (p.releaseDate) {
                const mepDate = new Date(p.releaseDate);
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
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            dayEl.className = `calendar-day${isToday ? " today" : ""}`;
            dayEl.innerHTML = `<div class="day-number">${d}</div>`;

            const dayEvents = monthEvents.filter(e => e.day === d);
            dayEvents.slice(0, 2).forEach(e => {
                const evEl = document.createElement("div");
                evEl.className = `day-event prio-${e.priority}`;
                if (e.type === "project") evEl.style.background = e.color;
                evEl.textContent = e.label;
                evEl.title = e.label;
                dayEl.appendChild(evEl);
            });

            if (dayEvents.length > 2) {
                const more = document.createElement("div");
                more.style.cssText = "font-size:.65rem;color:var(--text-light);padding:1px 4px";
                more.textContent = `+${dayEvents.length - 2} autre(s)`;
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
        container.innerHTML = sorted.map(e => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
                <div style="
                    background:${e.type === "project" ? e.color : (e.type === "release" ? "#ef4444" : "var(--primary)")};
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
                    <p style="font-size:.875rem;font-weight:600">${e.label}</p>
                    <p style="font-size:.75rem;color:var(--text-light)">
                        ${e.type === "project" ? "Fin de projet" : (e.type === "release" ? "Mise en production" : "Échéance tâche")} · ${monthName} ${year}
                    </p>
                </div>
                ${getPriorityTag(e.priority)}
            </div>
        `).join("");
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
        notificationService.info('Calendrier - Fonctionnalité en développement');
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

        this.selectedColor = p.color;
        document.querySelectorAll(".color-option").forEach(o => {
            o.classList.toggle("selected", o.dataset.color === p.color);
        });

        this.updateMemberCheckboxes(p.members);
        this.openModal("modalProject");
    }

    openTaskModal() {
        document.getElementById("modalTaskTitle").textContent = "Nouvelle tâche";
        document.getElementById("formTask").reset();
        document.getElementById("taskId").value = "";
        
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
        document.getElementById("taskStatus").value = t.status;
        document.getElementById("taskPriority").value = t.priority;
        document.getElementById("taskDue").value = t.dueDate || '';
        document.getElementById("taskProgress").value = t.progress;

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

    if (!name.trim()) {
        notificationService.error('Le nom du projet est requis');
        return;
    }

    // Récupérer les membres sélectionnés
    const memberCheckboxes = document.querySelectorAll('#memberCheckboxes input:checked');
    const members = Array.from(memberCheckboxes).map(cb => parseInt(cb.value));

    const data = {
        name,
        description,
        status,
        priority,
        startDate,
        endDate,
        releaseDate,
        members,
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
    const project = parseInt(document.getElementById('taskProject').value);
    const assignee = parseInt(document.getElementById('taskAssignee').value) || null;
    const status = document.getElementById('taskStatus').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDue').value;
    const progress = parseInt(document.getElementById('taskProgress').value);

    if (!name.trim()) {
        notificationService.error('Le nom de la tâche est requis');
        return;
    }

    if (!project) {
        notificationService.error('Veuillez sélectionner un projet');
        return;
    }

    const data = {
        name,
        description,
        project,
        assignee,
        status,
        priority,
        dueDate,
        progress
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
