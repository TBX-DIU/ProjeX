/**
 * Composant de recherche avancée
 */
class SearchComponent {
    constructor(onSearch) {
        this.onSearch = onSearch;
        this.searchTerm = '';
        this.filters = {
            type: 'all', // all, projects, tasks, members
            status: 'all',
            priority: 'all'
        };
    }

    /**
     * Rechercher dans toutes les données
     */
    search(term, state) {
        this.searchTerm = term.toLowerCase();
        
        if (!this.searchTerm) {
            return {
                projects: [],
                tasks: [],
                members: []
            };
        }

        const results = {
            projects: this.searchProjects(state.projects),
            tasks: this.searchTasks(state.tasks, state.projects),
            members: this.searchMembers(state.members)
        };

        return results;
    }

    /**
     * Rechercher dans les projets
     */
    searchProjects(projects) {
        return projects.filter(p => {
            const matchTerm = 
                p.name.toLowerCase().includes(this.searchTerm) ||
                p.description.toLowerCase().includes(this.searchTerm) ||
                p.tags?.some(tag => tag.toLowerCase().includes(this.searchTerm));
            
            const matchStatus = this.filters.status === 'all' || p.status === this.filters.status;
            const matchPriority = this.filters.priority === 'all' || p.priority === this.filters.priority;
            const matchType = this.filters.type === 'all' || this.filters.type === 'projects';

            return matchTerm && matchStatus && matchPriority && matchType;
        });
    }

    /**
     * Rechercher dans les tâches
     */
    searchTasks(tasks, projects) {
        return tasks.filter(t => {
            const project = projects.find(p => p.id === t.project);
            const matchTerm = 
                t.name.toLowerCase().includes(this.searchTerm) ||
                t.description.toLowerCase().includes(this.searchTerm) ||
                project?.name.toLowerCase().includes(this.searchTerm) ||
                t.tags?.some(tag => tag.toLowerCase().includes(this.searchTerm));
            
            const matchStatus = this.filters.status === 'all' || t.status === this.filters.status;
            const matchPriority = this.filters.priority === 'all' || t.priority === this.filters.priority;
            const matchType = this.filters.type === 'all' || this.filters.type === 'tasks';

            return matchTerm && matchStatus && matchPriority && matchType;
        }).map(t => ({
            ...t,
            projectName: projects.find(p => p.id === t.project)?.name || 'Projet inconnu'
        }));
    }

    /**
     * Rechercher dans les membres
     */
    searchMembers(members) {
        return members.filter(m => {
            const matchTerm = 
                m.firstName.toLowerCase().includes(this.searchTerm) ||
                m.lastName.toLowerCase().includes(this.searchTerm) ||
                m.email.toLowerCase().includes(this.searchTerm) ||
                m.role.toLowerCase().includes(this.searchTerm) ||
                m.department.toLowerCase().includes(this.searchTerm);
            
            const matchType = this.filters.type === 'all' || this.filters.type === 'members';

            return matchTerm && matchType;
        });
    }

    /**
     * Définir les filtres
     */
    setFilters(filters) {
        this.filters = { ...this.filters, ...filters };
    }

    /**
     * Réinitialiser les filtres
     */
    resetFilters() {
        this.filters = {
            type: 'all',
            status: 'all',
            priority: 'all'
        };
    }

    /**
     * Rendre les résultats de recherche
     */
    renderResults(results, container) {
        const { projects, tasks, members } = results;
        const totalResults = projects.length + tasks.length + members.length;

        if (totalResults === 0) {
            container.innerHTML = emptyState('fa-search', 'Aucun résultat', 'Essayez avec d\'autres mots-clés');
            return;
        }

        let html = `<div class="search-results">`;

        if (projects.length > 0) {
            html += `
                <div class="search-section">
                    <h3><i class="fas fa-folder"></i> Projets (${projects.length})</h3>
                    <div class="search-items">
                        ${projects.map(p => `
                            <div class="search-item" onclick="navigateTo('projects'); setTimeout(() => openProjectDetail(${p.id}), 100)">
                                <div class="search-item-icon" style="background: ${p.color}40; color: ${p.color}">
                                    <i class="fas fa-folder"></i>
                                </div>
                                <div class="search-item-content">
                                    <h4>${this.highlight(p.name)}</h4>
                                    <p>${this.highlight(truncate(p.description, 80))}</p>
                                    <div class="search-item-meta">
                                        ${getStatusTag(p.status)}
                                        ${getPriorityTag(p.priority)}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (tasks.length > 0) {
            html += `
                <div class="search-section">
                    <h3><i class="fas fa-tasks"></i> Tâches (${tasks.length})</h3>
                    <div class="search-items">
                        ${tasks.map(t => `
                            <div class="search-item" onclick="navigateTo('tasks'); setTimeout(() => openEditTask(${t.id}), 100)">
                                <div class="search-item-icon" style="background: var(--primary-light); color: var(--primary)">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="search-item-content">
                                    <h4>${this.highlight(t.name)}</h4>
                                    <p>${this.highlight(truncate(t.description, 80))}</p>
                                    <div class="search-item-meta">
                                        <span class="tag tag-gray">${t.projectName}</span>
                                        ${getStatusTag(t.status)}
                                        ${getPriorityTag(t.priority)}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (members.length > 0) {
            html += `
                <div class="search-section">
                    <h3><i class="fas fa-users"></i> Membres (${members.length})</h3>
                    <div class="search-items">
                        ${members.map(m => `
                            <div class="search-item" onclick="navigateTo('team')">
                                <div class="search-item-icon" style="background: ${m.color}40; color: ${m.color}">
                                    ${m.getInitials()}
                                </div>
                                <div class="search-item-content">
                                    <h4>${this.highlight(m.getFullName())}</h4>
                                    <p>${this.highlight(m.role)} - ${this.highlight(m.department)}</p>
                                    <div class="search-item-meta">
                                        <span class="tag tag-gray"><i class="fas fa-envelope"></i> ${m.email}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
    }

    /**
     * Surligner les termes de recherche
     */
    highlight(text) {
        if (!text || !this.searchTerm) return text;
        const regex = new RegExp(`(${this.searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}
