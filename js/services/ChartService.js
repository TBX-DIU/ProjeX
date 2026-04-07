/**
 * Service de graphiques avec Chart.js
 */
class ChartService {
    constructor() {
        this.charts = {};
        this.defaultColors = [
            '#4f46e5', '#10b981', '#f59e0b', '#ef4444',
            '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'
        ];
    }

    /**
     * Créer un graphique de progression de projet
     */
    createProjectProgressChart(canvasId, projects) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const data = {
            labels: projects.map(p => p.name),
            datasets: [{
                label: 'Progression (%)',
                data: projects.map(p => p.progress),
                backgroundColor: projects.map(p => p.color + '40'),
                borderColor: projects.map(p => p.color),
                borderWidth: 2
            }]
        };

        return this.createChart(canvasId, 'bar', data, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y}%`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        });
    }

    /**
     * Créer un graphique de répartition des tâches
     */
    createTaskDistributionChart(canvasId, tasks) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const statusCount = {
            'à faire': tasks.filter(t => t.status === 'à faire').length,
            'en cours': tasks.filter(t => t.status === 'en cours').length,
            'terminé': tasks.filter(t => t.status === 'terminé').length
        };

        const data = {
            labels: ['À faire', 'En cours', 'Terminé'],
            datasets: [{
                data: Object.values(statusCount),
                backgroundColor: ['#f59e0b', '#06b6d4', '#10b981'],
                borderWidth: 0
            }]
        };

        return this.createChart(canvasId, 'doughnut', data, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        });
    }

    /**
     * Créer un graphique de charge de travail par membre
     */
    createWorkloadChart(canvasId, members, tasks) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const workloadData = members.map(member => {
            const memberTasks = tasks.filter(t => 
                t.assignee === member.id && t.status !== 'terminé'
            );
            return {
                name: member.firstName,
                count: memberTasks.length
            };
        });

        const data = {
            labels: workloadData.map(w => w.name),
            datasets: [{
                label: 'Tâches actives',
                data: workloadData.map(w => w.count),
                backgroundColor: this.defaultColors,
                borderWidth: 0
            }]
        };

        return this.createChart(canvasId, 'bar', data, {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        });
    }

    /**
     * Créer un graphique de timeline (derniers 30 jours)
     */
    createActivityTimelineChart(canvasId, activities) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Grouper les activités par jour
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return date.toISOString().split('T')[0];
        });

        const activityCounts = last30Days.map(day => {
            return activities.filter(a => {
                const actDate = new Date(a.timestamp).toISOString().split('T')[0];
                return actDate === day;
            }).length;
        });

        const data = {
            labels: last30Days.map(d => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })),
            datasets: [{
                label: 'Activités',
                data: activityCounts,
                backgroundColor: '#4f46e540',
                borderColor: '#4f46e5',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };

        return this.createChart(canvasId, 'line', data, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        });
    }

    /**
     * Créer un graphique générique
     */
    createChart(canvasId, type, data, options = {}) {
        // Détruire l'ancien graphique s'il existe
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        this.charts[canvasId] = new Chart(ctx, {
            type,
            data,
            options: {
                ...options,
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                }
            }
        });

        return this.charts[canvasId];
    }

    /**
     * Détruire un graphique
     */
    destroyChart(canvasId) {
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
    }

    /**
     * Détruire tous les graphiques
     */
    destroyAll() {
        Object.keys(this.charts).forEach(id => this.destroyChart(id));
    }

    /**
     * Mettre à jour un graphique
     */
    updateChart(canvasId, newData) {
        const chart = this.charts[canvasId];
        if (!chart) return;

        chart.data = newData;
        chart.update();
    }
}

// Instance singleton
const chartService = new ChartService();
