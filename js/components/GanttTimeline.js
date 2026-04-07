/**
 * Composant Gantt Timeline
 */
class GanttTimeline {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.projects = [];
        this.startDate = null;
        this.endDate = null;
    }

    /**
     * Rendre le Gantt
     */
    render(projects) {
        if (!this.container) return;

        this.projects = projects.filter(p => p.startDate && p.endDate);
        if (this.projects.length === 0) {
            this.container.innerHTML = emptyState('fa-chart-gantt', 'Aucun projet à afficher', 'Les projets doivent avoir des dates de début et de fin.');
            return;
        }

        this.calculateDateRange();
        const months = this.generateMonths();

        this.container.innerHTML = `
            <div class="gantt-timeline">
                <div class="gantt-header">
                    <div class="gantt-sidebar">
                        <div class="gantt-header-cell">Projet</div>
                    </div>
                    <div class="gantt-months">
                        ${months.map(month => `
                            <div class="gantt-month" style="width: ${month.width}%">
                                ${month.label}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="gantt-body">
                    ${this.projects.map(project => this.renderProjectRow(project)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Calculer la plage de dates
     */
    calculateDateRange() {
        const dates = this.projects.flatMap(p => [new Date(p.startDate), new Date(p.endDate)]);
        this.startDate = new Date(Math.min(...dates));
        this.endDate = new Date(Math.max(...dates));

        // Arrondir au mois
        this.startDate.setDate(1);
        this.endDate.setMonth(this.endDate.getMonth() + 1);
        this.endDate.setDate(0);
    }

    /**
     * Générer les mois
     */
    generateMonths() {
        const months = [];
        const current = new Date(this.startDate);
        const totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));

        while (current <= this.endDate) {
            const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
            const width = (daysInMonth / totalDays) * 100;

            months.push({
                label: current.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
                width
            });

            current.setMonth(current.getMonth() + 1);
        }

        return months;
    }

    /**
     * Rendre une ligne de projet
     */
    renderProjectRow(project) {
        const start = new Date(project.startDate);
        const end = new Date(project.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const totalDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
        const daysFromStart = Math.ceil((start - this.startDate) / (1000 * 60 * 60 * 24));
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const left = (daysFromStart / totalDays) * 100;
        const width = (duration / totalDays) * 100;

        // Calculer les jours restants jusqu'à la fin
        const daysToEnd = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        const daysToEndText = daysToEnd > 0 ? `${daysToEnd}j restants` : 
                              daysToEnd === 0 ? `Aujourd'hui` : 
                              `Terminé il y a ${Math.abs(daysToEnd)}j`;
        const daysToEndClass = daysToEnd < 0 ? 'overdue' : daysToEnd <= 7 ? 'warning' : 'normal';

        // Calculer position de la MEP si elle existe
        let releaseMilestone = '';
        let releaseDaysText = '';
        if (project.releaseDate) {
            const releaseDate = new Date(project.releaseDate);
            const daysToRelease = Math.ceil((releaseDate - this.startDate) / (1000 * 60 * 60 * 24));
            const releaseLeft = (daysToRelease / totalDays) * 100;
            
            // Calculer les jours restants jusqu'à la MEP
            const daysToMEP = Math.ceil((releaseDate - today) / (1000 * 60 * 60 * 24));
            const daysToMEPText = daysToMEP > 0 ? `${daysToMEP}j` : 
                                  daysToMEP === 0 ? `Aujourd'hui` : 
                                  `Passée`;
            const daysToMEPClass = daysToMEP < 0 ? 'overdue' : daysToMEP <= 7 ? 'warning' : 'normal';
            
            releaseDaysText = `
                <span class="gantt-days-remaining ${daysToMEPClass}" style="left: ${releaseLeft}%; top: -24px;">
                    ${daysToMEPText}
                </span>
            `;
            
            releaseMilestone = `
                <div class="gantt-milestone gantt-release" 
                     style="left: ${releaseLeft}%"
                     title="MEP: ${formatDate(project.releaseDate)} (${daysToMEPText} restants)">
                    <div class="milestone-dot"></div>
                    <div class="milestone-label">🚀 MEP</div>
                </div>
            `;
        }

        // Marqueur de fin de projet
        const endDays = Math.ceil((end - this.startDate) / (1000 * 60 * 60 * 24));
        const endLeft = (endDays / totalDays) * 100;
        const endMilestone = `
            <div class="gantt-milestone gantt-end" 
                 style="left: ${endLeft}%"
                 title="Fin: ${formatDate(project.endDate)} (${daysToEndText})">
                <div class="milestone-dot"></div>
                <div class="milestone-label">✓ Fin</div>
            </div>
        `;

        // Affichage des jours restants jusqu'à la fin
        const endDaysText = `
            <span class="gantt-days-remaining ${daysToEndClass}" style="left: ${endLeft}%; top: -24px;">
                ${daysToEnd > 0 ? `${daysToEnd}j` : daysToEnd === 0 ? 'Fin' : 'Fini'}
            </span>
        `;

        return `
            <div class="gantt-row">
                <div class="gantt-sidebar">
                    <div class="gantt-project-name">
                        <div class="gantt-color" style="background: ${project.color}"></div>
                        <span>${project.name}</span>
                        <span class="gantt-info-badge ${daysToEndClass}" title="${daysToEndText}">
                            ${daysToEnd > 0 ? `${daysToEnd}j` : daysToEnd === 0 ? 'Fin' : '✓'}
                        </span>
                    </div>
                </div>
                <div class="gantt-timeline-area">
                    <div class="gantt-bar" 
                         style="left: ${left}%; width: ${width}%; background: ${project.color}40; border-left: 3px solid ${project.color}"
                         title="${project.name} (${formatDate(project.startDate)} - ${formatDate(project.endDate)})">
                        <div class="gantt-progress" style="width: ${project.progress}%; background: ${project.color}"></div>
                    </div>
                    ${releaseMilestone}
                    ${releaseDaysText}
                    ${endMilestone}
                    ${endDaysText}
                </div>
            </div>
        `;
    }

    /**
     * Mettre à jour
     */
    update(projects) {
        this.render(projects);
    }
}
