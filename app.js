// ===== DATA =====
let projects = [
    {
        id: 1, name: "Refonte Site Web", color: "#4f46e5",
        desc: "Refonte complète du site vitrine de l'entreprise.",
        status: "en cours", priority: "haute",
        start: "2024-01-10", end: "2024-03-31",
        members: [1, 2, 3], progress: 65
    },
    {
        id: 2, name: "Application Mobile", color: "#10b981",
        desc: "Développement d'une application iOS et Android.",
        status: "en cours", priority: "haute",
        start: "2024-02-01", end: "2024-06-30",
        members: [1, 4], progress: 30
    },
    {
        id: 3, name: "Campagne Marketing", color: "#f59e0b",
        desc: "Lancement de la campagne publicitaire Q2.",
        status: "planifié", priority: "moyenne",
        start: "2024-04-01", end: "2024-05-31",
        members: [3, 5], progress: 0
    },
    {
        id: 4, name: "Dashboard Analytics", color: "#8b5cf6",
        desc: "Création d'un tableau de bord de reporting.",
        status: "terminé", priority: "basse",
        start: "2023-11-01", end: "2024-01-15",
        members: [2, 4], progress: 100
    }
];

let tasks = [
    { id: 1, name: "Créer la maquette UI", desc: "Design des wireframes et maquettes haute fidélité.", project: 1, assignee: 2, status: "terminé",   priority: "haute",   due: "2024-02-15", progress: 100 },
    { id: 2, name: "Développer la homepage", desc: "Intégration HTML/CSS/JS de la page d'accueil.",    project: 1, assignee: 1, status: "en cours",  priority: "haute",   due: "2024-03-10", progress: 60  },
    { id: 3, name: "API REST backend",        desc: "Création des endpoints pour l'application mobile.", project: 2, assignee: 1, status: "en cours",  priority: "haute",   due: "2024-03-20", progress: 45  },
    { id: 4, name: "Tests unitaires",         desc: "Écriture des tests pour les composants principaux.", project: 1, assignee: 4, status: "à faire",  priority: "moyenne", due: "2024-03-25", progress: 0   },
    { id: 5, name: "Brief créatif",           desc: "Rédaction du brief pour l'agence créative.",       project: 3, assignee: 3, status: "à faire",  priority: "moyenne", due: "2024-04-05", progress: 0   },
    { id: 6, name: "Design UI mobile",        desc: "Maquettes pour iOS et Android.",                   project: 2, assignee: 2, status: "à faire",  priority: "haute",   due: "2024-03-05", progress: 0   },
    { id: 7, name: "Rapport mensuel",         desc: "Rédaction du rapport d'activité mensuel.",         project: 4, assignee: 5, status: "terminé",   priority: "basse",   due: "2024-01-31", progress: 100 },
    { id: 8, name: "Optimisation SEO",        desc: "Audit et optimisation du référencement naturel.",  project: 1, assignee: 3, status: "à faire",  priority: "moyenne", due: "2024-03-28", progress: 0   }
];

let members = [
    { id: 1, firstName: "Alice",   lastName: "Martin",  email: "alice.martin@projex.fr",   role: "Développeur Full-Stack", dept: "développement" },
    { id: 2, firstName: "Bob",     lastName: "Dupont",  email: "bob.dupont@projex.fr",     role: "Designer UI/UX",         dept: "design"        },
    { id: 3, firstName: "Claire",  lastName: "Leroy",   email: "claire.leroy@projex.fr",   role: "Chef de projet",         dept: "management"    },
    { id: 4, firstName: "David",   lastName: "Bernard", email: "david.bernard@projex.fr",  role: "Développeur Backend",    dept: "développement" },
    { id: 5, firstName: "Emma",    lastName: "Petit",   email: "emma.petit@projex.fr",     role: "Chargée Marketing",      dept: "marketing"     }
];

let activities = [
    { icon: "fa-plus",        iconBg: "blue",   text: "<strong>Alice Martin</strong> a créé le projet <strong>Refonte Site Web</strong>",      time: "Il y a 2h"  },
    { icon: "fa-check",       iconBg: "green",  text: "<strong>Bob Dupont</strong> a terminé la tâche <strong>Créer la maquette UI</strong>",   time: "Il y a 4h"  },
    { icon: "fa-user-plus",   iconBg: "purple", text: "<strong>Emma Petit</strong> a rejoint le projet <strong>Campagne Marketing</strong>",     time: "Il y a 6h"  },
    { icon: "fa-edit",        iconBg: "orange", text: "<strong>David Bernard</strong> a mis à jour la tâche <strong>API REST backend</strong>",  time: "Hier"       },
    { icon: "fa-flag",        iconBg: "red",    text: "<strong>Claire Leroy</strong> a défini la priorité de <strong>Design UI mobile</strong>", time: "Hier"       }
];

let currentPage   = "dashboard";
let projectView   = "grid";
let selectedColor = "#4f46e5";
let calendarDate  = new Date();
let draggedTaskId = null;
let nextProjectId = 5;
let nextTaskId    = 9;
let nextMemberId  = 6;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    initColorPicker();
    initCalendar();
    updateStats();
    renderDashboard();
    renderProjects();
    renderTasks();
    renderTeam();
    updateTaskFilterProject();
    updateMemberCheckboxes();
    initSearch();
    initConfirmDialog();
    btnAddMain();
});

// ===== SIDEBAR =====
function initSidebar() {
    const sidebar     = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    const toggleBtn   = document.getElementById("toggleSidebar");

    toggleBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle("mobile-open");
        } else {
            sidebar.classList.toggle("collapsed");
            mainContent.classList.toggle("expanded");
        }
    });

    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            navigateTo(item.dataset.page);
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("mobile-open");
            }
        });
    });
}

function navigateTo(page) {
    currentPage = page;

    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    document.querySelector(`.nav-item[data-page="${page}"]`).classList.add("active");

    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page-${page}`).classList.add("active");

    const titles = {
        dashboard: "Tableau de bord",
        projects:  "Projets",
        tasks:     "Tâches",
        team:      "Équipe",
        calendar:  "Calendrier"
    };
    document.getElementById("pageTitle").textContent = titles[page];

    if (page === "calendar") renderCalendar();
    if (page === "dashboard") renderDashboard();
}

// ===== STATS =====
function updateStats() {
    const activeProjects = projects.filter(p => p.status === "en cours").length;
    const doneTasks      = tasks.filter(t => t.status === "terminé").length;
    const pendingTasks   = tasks.filter(t => t.status === "en cours").length;
    const today          = new Date().toISOString().split("T")[0];
    const overdue        = tasks.filter(t => t.due < today && t.status !== "terminé").length;

    document.getElementById("statProjects").textContent = activeProjects;
    document.getElementById("statDone").textContent     = doneTasks;
    document.getElementById("statPending").textContent  = pendingTasks;
    document.getElementById("statOverdue").textContent  = overdue;
}

// ===== DASHBOARD =====
function renderDashboard() {
    updateStats();
    renderRecentProjects();
    renderUrgentTasks();
    renderActivity();
}

function renderRecentProjects() {
    const container = document.getElementById("recentProjects");
    const recent    = [...projects].slice(-4).reverse();

    if (!recent.length) {
        container.innerHTML = emptyState("fa-folder", "Aucun projet", "Créez votre premier projet !");
        return;
    }

    container.innerHTML = recent.map(p => `
        <div class="recent-project-item">
            <div class="rp-color" style="background:${p.color}"></div>
            <div class="rp-info">
                <h4>${p.name}</h4>
                <p>${getStatusTag(p.status)}</p>
            </div>
            <div class="rp-progress">${p.progress}%</div>
        </div>
    `).join("");
}

function renderUrgentTasks() {
    const container = document.getElementById("urgentTasks");
    const today     = new Date().toISOString().split("T")[0];
    const urgent    = tasks
        .filter(t => t.priority === "haute" && t.status !== "terminé")
        .slice(0, 4);

    if (!urgent.length) {
        container.innerHTML = emptyState("fa-check-circle", "Aucune tâche urgente", "Tout est sous contrôle !");
        return;
    }

    container.innerHTML = urgent.map(t => {
        const project  = projects.find(p => p.id === t.project);
        const assignee = members.find(m => m.id === t.assignee);
        const isOverdue = t.due < today;
        return `
            <div class="urgent-task-item">
                ${getPriorityTag(t.priority)}
                <div class="ut-info">
                    <h4>${t.name}</h4>
                    <p>${project ? project.name : "—"} · ${assignee ? assignee.firstName : "—"}</p>
                </div>
                <span class="task-due ${isOverdue ? "overdue" : ""}">
                    <i class="fas fa-calendar"></i> ${formatDate(t.due)}
                </span>
            </div>
        `;
    }).join("");
}

function renderActivity() {
    const container = document.getElementById("recentActivity");
    const bgMap = {
        blue: "#eff6ff", green: "#f0fdf4",
        orange: "#fffbeb", red: "#fef2f2", purple: "#f5f3ff"
    };
    const colorMap = {
        blue: "#3b82f6", green: "#10b981",
        orange: "#f59e0b", red: "#ef4444", purple: "#8b5cf6"
    };

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
        `).join("") +
    `</div>`;
}

// ===== PROJECTS =====
function renderProjects() {
    const container      = document.getElementById("projectsContainer");
    const statusFilter   = document.getElementById("filterProjectStatus").value;
    const priorityFilter = document.getElementById("filterProjectPriority").value;

    let filtered = projects.filter(p => {
        const matchStatus   = statusFilter   === "all" || p.status   === statusFilter;
        const matchPriority = priorityFilter === "all" || p.priority === priorityFilter;
        return matchStatus && matchPriority;
    });

    if (!filtered.length) {
        container.innerHTML = emptyState("fa-folder-open", "Aucun projet trouvé", "Modifiez vos filtres ou créez un nouveau projet.");
        return;
    }

    container.innerHTML = filtered.map(p => {
        const projectMembers = members.filter(m => p.members.includes(m.id));
        const taskCount      = tasks.filter(t => t.project === p.id).length;
        const isListView     = container.classList.contains("list-view");

        return `
            <div class="project-card" style="--project-color:${p.color}" onclick="openProjectDetail(${p.id})">
                ${isListView ? `<div style="width:4px;background:${p.color};position:absolute;top:0;left:0;bottom:0;border-radius:10px 0 0 10px"></div>` : ""}
                <div class="project-card-main">
                    <div class="project-card-header">
                        <div>
                            <h3>${p.name}</h3>
                            <p>${p.desc}</p>
                        </div>
                        <div class="project-actions" onclick="event.stopPropagation()">
                            <button class="action-btn" onclick="openEditProject(${p.id})" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn danger" onclick="confirmDeleteProject(${p.id})" title="Supprimer">
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
                    ${p.end ? `<p style="font-size:.75rem;color:var(--text-light);margin-top:8px"><i class="fas fa-calendar-alt" style="margin-right:4px"></i>Échéance : ${formatDate(p.end)}</p>` : ""}
                </div>
            </div>
        `;
    }).join("");
}

function openProjectDetail(id) {
    // Navigate to tasks filtered by project
    navigateTo("tasks");
    document.getElementById("filterTaskProject").value = id;
    renderTasks();
}

function setProjectView(view) {
    projectView = view;
    const container = document.getElementById("projectsContainer");
    container.className = `projects-container ${view}-view`;
    document.getElementById("viewGrid").classList.toggle("active", view === "grid");
    document.getElementById("viewList").classList.toggle("active", view === "list");
    renderProjects();
}

// ===== PROJECT MODAL =====
function openAddProject() {
    document.getElementById("modalProjectTitle").textContent = "Nouveau projet";
    document.getElementById("formProject").reset();
    document.getElementById("projectId").value = "";
    selectedColor = "#4f46e5";
    document.querySelectorAll(".color-option").forEach(o => {
        o.classList.toggle("selected", o.dataset.color === selectedColor);
    });
    updateMemberCheckboxes();
    openModal("modalProject");
}

function openEditProject(id) {
    const p = projects.find(p => p.id === id);
    if (!p) return;

    document.getElementById("modalProjectTitle").textContent = "Modifier le projet";
    document.getElementById("projectId").value       = p.id;
    document.getElementById("projectName").value     = p.name;
    document.getElementById("projectDesc").value     = p.desc;
    document.getElementById("projectStatus").value   = p.status;
    document.getElementById("projectPriority").value = p.priority;
    document.getElementById("projectStart").value    = p.start;
    document.getElementById("projectEnd").value      = p.end;

    selectedColor = p.color;
    document.querySelectorAll(".color-option").forEach(o => {
        o.classList.toggle("selected", o.dataset.color === p.color);
    });

    updateMemberCheckboxes(p.members);
    openModal("modalProject");
}

function saveProject() {
    const name = document.getElementById("projectName").value.trim();
    if (!name) { showToast("Le nom du projet est requis.", "error"); return; }

    const id       = document.getElementById("projectId").value;
    const checkedMembers = [...document.querySelectorAll(".member-checkbox-item.checked")]
        .map(el => parseInt(el.dataset.id));

    const data = {
        name:     name,
        desc:     document.getElementById("projectDesc").value.trim(),
        status:   document.getElementById("projectStatus").value,
        priority: document.getElementById("projectPriority").value,
        start:    document.getElementById("projectStart").value,
        end:      document.getElementById("projectEnd").value,
        members:  checkedMembers,
        color:    selectedColor,
        progress: 0
    };

    if (id) {
        const idx = projects.findIndex(p => p.id === parseInt(id));
        data.progress = projects[idx].progress;
        projects[idx] = { ...projects[idx], ...data };
        showToast("Projet modifié avec succès !", "success");
        addActivity("fa-edit", "orange", `Projet <strong>${name}</strong> modifié`);
    } else {
        data.id       = nextProjectId++;
        data.progress = 0;
        projects.push(data);
        showToast("Projet créé avec succès !", "success");
        addActivity("fa-plus", "blue", `Nouveau projet <strong>${name}</strong> créé`);
    }

    closeModal("modalProject");
    renderProjects();
    updateTaskFilterProject();
    updateMemberCheckboxes();
    renderDashboard();
}

// ===== TASKS =====
function renderTasks() {
    const projectFilter  = document.getElementById("filterTaskProject").value;
    const statusFilter   = document.getElementById("filterTaskStatus").value;
    const priorityFilter = document.getElementById("filterTaskPriority").value;

    let filtered = tasks.filter(t => {
        const matchProject  = projectFilter  === "all" || t.project  === parseInt(projectFilter);
        const matchStatus   = statusFilter   === "all" || t.status   === statusFilter;
        const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
        return matchProject && matchStatus && matchPriority;
    });

    const todo       = filtered.filter(t => t.status === "à faire");
    const inProgress = filtered.filter(t => t.status === "en cours");
    const done       = filtered.filter(t => t.status === "terminé");

    document.getElementById("count-todo").textContent       = todo.length;
    document.getElementById("count-inprogress").textContent = inProgress.length;
    document.getElementById("count-done").textContent       = done.length;

    document.getElementById("cards-todo").innerHTML       = todo.length       ? todo.map(renderTaskCard).join("")       : emptyKanban();
    document.getElementById("cards-inprogress").innerHTML = inProgress.length ? inProgress.map(renderTaskCard).join("") : emptyKanban();
    document.getElementById("cards-done").innerHTML       = done.length       ? done.map(renderTaskCard).join("")       : emptyKanban();
}

function renderTaskCard(t) {
    const project   = projects.find(p => p.id === t.project);
    const assignee  = members.find(m => m.id === t.assignee);
    const today     = new Date().toISOString().split("T")[0];
    const isOverdue = t.due < today && t.status !== "terminé";
    const color     = project ? project.color : "var(--primary)";

    return `
        <div class="task-card"
             style="border-left-color:${color}"
             draggable="true"
             ondragstart="dragStart(event, ${t.id})"
             ondragend="dragEnd(event)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
                <h4>${t.name}</h4>
                <div style="display:flex;gap:4px">
                    <button class="action-btn" onclick="openEditTask(${t.id})" title="Modifier"><i class="fas fa-edit"></i></button>
                    <button class="action-btn danger" onclick="confirmDeleteTask(${t.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            ${t.desc ? `<p>${t.desc}</p>` : ""}
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
                ${getPriorityTag(t.priority)}
                ${project ? `<span class="tag tag-gray" style="font-size:.7rem">${project.name}</span>` : ""}
            </div>
            ${t.progress > 0 ? `
                <div class="task-progress-bar">
                    <div class="task-progress-fill" style="width:${t.progress}%;background:${color}"></div>
                </div>
                <span style="font-size:.7rem;color:var(--text-light)">${t.progress}%</span>
            ` : ""}
            <div class="task-card-footer">
                ${assignee ? `
                    <div style="display:flex;align-items:center;gap:6px">
                        <div class="member-chip" style="width:22px;height:22px;font-size:.6rem;background:${memberColor(assignee.id)}">
                            ${assignee.firstName[0]}${assignee.lastName[0]}
                        </div>
                        <span style="font-size:.75rem;color:var(--text-light)">${assignee.firstName}</span>
                    </div>
                ` : "<span></span>"}
                <span class="task-due ${isOverdue ? "overdue" : ""}">
                    <i class="fas fa-calendar"></i> ${formatDate(t.due)}
                </span>
            </div>
        </div>
    `;
}

function emptyKanban() {
    return `<div style="text-align:center;padding:24px;color:var(--text-light);font-size:.82rem">Aucune tâche</div>`;
}

// ===== TASK MODAL =====
function openAddTask() {
    document.getElementById("modalTaskTitle").textContent = "Nouvelle tâche";
    document.getElementById("formTask").reset();
    document.getElementById("taskId").value = "";
    document.getElementById("taskProgress").value = "0";
    updateTaskModalSelects();
    openModal("modalTask");
}

function openEditTask(id) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;

    document.getElementById("modalTaskTitle").textContent  = "Modifier la tâche";
    document.getElementById("taskId").value       = t.id;
    document.getElementById("taskName").value     = t.name;
    document.getElementById("taskDesc").value     = t.desc;
    document.getElementById("taskStatus").value   = t.status;
    document.getElementById("taskPriority").value = t.priority;
    document.getElementById("taskDue").value      = t.due;
    document.getElementById("taskProgress").value = t.progress;

    updateTaskModalSelects();

    document.getElementById("taskProject").value  = t.project;
    document.getElementById("taskAssignee").value = t.assignee;

    openModal("modalTask");
}

function updateTaskModalSelects() {
    const projectSel  = document.getElementById("taskProject");
    const assigneeSel = document.getElementById("taskAssignee");

    projectSel.innerHTML = projects.map(p =>
        `<option value="${p.id}">${p.name}</option>`
    ).join("");

    assigneeSel.innerHTML = `<option value="">— Non assigné —</option>` +
        members.map(m =>
            `<option value="${m.id}">${m.firstName} ${m.lastName}</option>`
        ).join("");
}

function saveTask() {
    const name = document.getElementById("taskName").value.trim();
    if (!name) { showToast("Le nom de la tâche est requis.", "error"); return; }

    const id = document.getElementById("taskId").value;

    const data = {
        name:     name,
        desc:     document.getElementById("taskDesc").value.trim(),
        project:  parseInt(document.getElementById("taskProject").value),
        assignee: parseInt(document.getElementById("taskAssignee").value) || null,
        status:   document.getElementById("taskStatus").value,
        priority: document.getElementById("taskPriority").value,
        due:      document.getElementById("taskDue").value,
        progress: parseInt(document.getElementById("taskProgress").value) || 0
    };

    if (id) {
        const idx = tasks.findIndex(t => t.id === parseInt(id));
        tasks[idx] = { ...tasks[idx], ...data };
        showToast("Tâche modifiée avec succès !", "success");
        addActivity("fa-edit", "orange", `Tâche <strong>${name}</strong> modifiée`);
    } else {
        data.id = nextTaskId++;
        tasks.push(data);
        showToast("Tâche créée avec succès !", "success");
        addActivity("fa-plus", "blue", `Nouvelle tâche <strong>${name}</strong> créée`);
    }

    updateProjectProgress();
    closeModal("modalTask");
    renderTasks();
    renderDashboard();
    updateStats();
}

function updateProjectProgress() {
    projects.forEach(p => {
        const projectTasks = tasks.filter(t => t.project === p.id);
        if (projectTasks.length === 0) return;
        const total = projectTasks.reduce((sum, t) => sum + t.progress, 0);
        p.progress  = Math.round(total / projectTasks.length);
    });
}

// ===== DRAG & DROP =====
function dragStart(event, taskId) {
    draggedTaskId = taskId;
    event.target.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
}

function dragEnd(event) {
    event.target.classList.remove("dragging");
    document.querySelectorAll(".kanban-cards").forEach(col => col.classList.remove("drag-over"));
}

function allowDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
}

function drop(event, newStatus) {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");

    if (!draggedTaskId) return;

    const task = tasks.find(t => t.id === draggedTaskId);
    if (!task) return;

    const oldStatus = task.status;
    task.status     = newStatus;

    if (newStatus === "terminé")  task.progress = 100;
    if (newStatus === "à faire")  task.progress = 0;

    updateProjectProgress();
    renderTasks();
    renderDashboard();
    updateStats();

    if (oldStatus !== newStatus) {
        addActivity("fa-arrows-alt", "blue", `Tâche <strong>${task.name}</strong> déplacée vers <strong>${newStatus}</strong>`);
        showToast(`Tâche déplacée : ${newStatus}`, "success");
    }

    draggedTaskId = null;
}

// ===== DELETE PROJECT =====
function confirmDeleteProject(id) {
    const p = projects.find(p => p.id === id);
    if (!p) return;
    showConfirm(
        `Supprimer "${p.name}" ?`,
        "Ce projet et toutes ses tâches associées seront supprimés définitivement.",
        () => deleteProject(id)
    );
}

function deleteProject(id) {
    const p   = projects.find(p => p.id === id);
    const name = p ? p.name : "";
    projects  = projects.filter(p => p.id !== id);
    tasks     = tasks.filter(t => t.project !== id);
    renderProjects();
    renderTasks();
    updateTaskFilterProject();
    renderDashboard();
    updateStats();
    showToast(`Projet "${name}" supprimé.`, "success");
    addActivity("fa-trash", "red", `Projet <strong>${name}</strong> supprimé`);
}

// ===== DELETE TASK =====
function confirmDeleteTask(id) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;
    showConfirm(
        `Supprimer "${t.name}" ?`,
        "Cette tâche sera supprimée définitivement.",
        () => deleteTask(id)
    );
}

function deleteTask(id) {
    const t    = tasks.find(t => t.id === id);
    const name = t ? t.name : "";
    tasks      = tasks.filter(t => t.id !== id);
    updateProjectProgress();
    renderTasks();
    renderDashboard();
    updateStats();
    showToast(`Tâche "${name}" supprimée.`, "success");
    addActivity("fa-trash", "red", `Tâche <strong>${name}</strong> supprimée`);
}

// ===== TEAM =====
function renderTeam() {
    const container = document.getElementById("teamGrid");
    const colors    = ["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4"];

    if (!members.length) {
        container.innerHTML = emptyState("fa-users", "Aucun membre", "Ajoutez des membres à votre équipe.");
        return;
    }

    container.innerHTML = members.map((m, i) => {
        const color        = colors[i % colors.length];
        const memberTasks  = tasks.filter(t => t.assignee === m.id);
        const doneTasks    = memberTasks.filter(t => t.status === "terminé").length;
        const memberProjs  = projects.filter(p => p.members.includes(m.id)).length;

        return `
            <div class="member-card">
                <div class="member-card-avatar" style="background:${color}">
                    ${m.firstName[0]}${m.lastName[0]}
                </div>
                <h3>${m.firstName} ${m.lastName}</h3>
                <p class="member-role">${m.role}</p>
                <p class="member-email">${m.email}</p>
                <span class="tag tag-gray" style="margin-bottom:12px;display:inline-flex">
                    ${getDeptIcon(m.dept)} ${m.dept}
                </span>
                <div class="member-stats">
                    <div class="member-stat">
                        <span class="num">${memberProjs}</span>
                        <span class="lbl">Projets</span>
                    </div>
                    <div class="member-stat">
                        <span class="num">${memberTasks.length}</span>
                        <span class="lbl">Tâches</span>
                    </div>
                    <div class="member-stat">
                        <span class="num">${doneTasks}</span>
                        <span class="lbl">Terminées</span>
                    </div>
                </div>
                <div class="member-card-actions">
                    <button class="btn btn-sm btn-outline" onclick="openEditMember(${m.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteMember(${m.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function getDeptIcon(dept) {
    const icons = {
        développement: '<i class="fas fa-code" style="margin-right:4px"></i>',
        design:        '<i class="fas fa-paint-brush" style="margin-right:4px"></i>',
        marketing:     '<i class="fas fa-bullhorn" style="margin-right:4px"></i>',
        management:    '<i class="fas fa-briefcase" style="margin-right:4px"></i>',
        autre:         '<i class="fas fa-user" style="margin-right:4px"></i>'
    };
    return icons[dept] || icons.autre;
}

// ===== MEMBER MODAL =====
function openAddMember() {
    document.getElementById("modalMemberTitle").textContent = "Nouveau membre";
    document.getElementById("formMember").reset();
    document.getElementById("memberId").value = "";
    openModal("modalMember");
}

function openEditMember(id) {
    const m = members.find(m => m.id === id);
    if (!m) return;

    document.getElementById("modalMemberTitle").textContent   = "Modifier le membre";
    document.getElementById("memberId").value        = m.id;
    document.getElementById("memberFirstName").value = m.firstName;
    document.getElementById("memberLastName").value  = m.lastName;
    document.getElementById("memberEmail").value     = m.email;
    document.getElementById("memberRole").value      = m.role;
    document.getElementById("memberDept").value      = m.dept;

    openModal("modalMember");
}

function saveMember() {
    const firstName = document.getElementById("memberFirstName").value.trim();
    const lastName  = document.getElementById("memberLastName").value.trim();
    const email     = document.getElementById("memberEmail").value.trim();

    if (!firstName || !lastName) { showToast("Prénom et nom sont requis.", "error"); return; }
    if (!email) { showToast("L'email est requis.", "error"); return; }

    const id   = document.getElementById("memberId").value;
    const data = {
        firstName,
        lastName,
        email,
        role: document.getElementById("memberRole").value.trim(),
        dept: document.getElementById("memberDept").value
    };

    if (id) {
        const idx  = members.findIndex(m => m.id === parseInt(id));
        members[idx] = { ...members[idx], ...data };
        showToast("Membre modifié avec succès !", "success");
        addActivity("fa-user-edit", "orange", `Membre <strong>${firstName} ${lastName}</strong> modifié`);
    } else {
        data.id = nextMemberId++;
        members.push(data);
        showToast("Membre ajouté avec succès !", "success");
        addActivity("fa-user-plus", "purple", `<strong>${firstName} ${lastName}</strong> a rejoint l'équipe`);
    }

    closeModal("modalMember");
    renderTeam();
    updateMemberCheckboxes();
    updateTaskModalSelects();
}

// ===== DELETE MEMBER =====
function confirmDeleteMember(id) {
    const m = members.find(m => m.id === id);
    if (!m) return;
    showConfirm(
        `Supprimer "${m.firstName} ${m.lastName}" ?`,
        "Ce membre sera retiré de l'équipe et de tous les projets.",
        () => deleteMember(id)
    );
}

function deleteMember(id) {
    const m    = members.find(m => m.id === id);
    const name = m ? `${m.firstName} ${m.lastName}` : "";
    members    = members.filter(m => m.id !== id);

    // Remove from projects
    projects.forEach(p => {
        p.members = p.members.filter(mid => mid !== id);
    });

    // Unassign tasks
    tasks.forEach(t => {
        if (t.assignee === id) t.assignee = null;
    });

    renderTeam();
    renderProjects();
    renderTasks();
    updateMemberCheckboxes();
    showToast(`Membre "${name}" supprimé.`, "success");
    addActivity("fa-user-minus", "red", `Membre <strong>${name}</strong> supprimé`);
}

// ===== CALENDAR =====
function initCalendar() {
    document.getElementById("prevMonth").addEventListener("click", () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById("nextMonth").addEventListener("click", () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        renderCalendar();
    });
}

function renderCalendar() {
    const year  = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const today = new Date();

    const monthNames = ["Janvier","Février","Mars","Avril","Mai","Juin",
                        "Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    document.getElementById("calendarTitle").textContent = `${monthNames[month]} ${year}`;

    const firstDay  = new Date(year, month, 1);
    const lastDay   = new Date(year, month + 1, 0);
    const startDay  = (firstDay.getDay() + 6) % 7; // Monday = 0
    const totalDays = lastDay.getDate();

    const calendarDays = document.getElementById("calendarDays");
    calendarDays.innerHTML = "";

    // Get all events (task due dates + project end dates) for this month
    const monthEvents = [];

    tasks.forEach(t => {
        if (!t.due) return;
        const d = new Date(t.due);
        if (d.getFullYear() === year && d.getMonth() === month) {
            monthEvents.push({ day: d.getDate(), label: t.name, type: "task", priority: t.priority, id: t.id });
        }
    });

    projects.forEach(p => {
        if (!p.end) return;
        const d = new Date(p.end);
        if (d.getFullYear() === year && d.getMonth() === month) {
            monthEvents.push({ day: d.getDate(), label: `📁 ${p.name}`, type: "project", priority: p.priority, id: p.id, color: p.color });
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
        const dayEl   = document.createElement("div");
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
    const remaining  = 42 - totalCells;
    for (let d = 1; d <= remaining; d++) {
        const dayEl = document.createElement("div");
        dayEl.className = "calendar-day other-month";
        dayEl.innerHTML = `<div class="day-number">${d}</div>`;
        calendarDays.appendChild(dayEl);
    }

    // Events list
    renderCalendarEvents(monthEvents, monthNames[month], year);
}

function renderCalendarEvents(events, monthName, year) {
    const container = document.getElementById("calendarEvents");
    if (!events.length) {
        container.innerHTML = `<p style="color:var(--text-light);font-size:.875rem;padding:8px 0">Aucun événement ce mois-ci.</p>`;
        return;
    }

    const sorted = [...events].sort((a, b) => a.day - b.day);
    container.innerHTML = sorted.map(e => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
            <div style="
                background:${e.type === "project" ? e.color : "var(--primary)"};
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
                <p style="font-size:.75rem;color:var(--text-light)">${e.type === "project" ? "Fin de projet" : "Échéance tâche"} · ${monthName} ${year}</p>
            </div>
            ${getPriorityTag(e.priority)}
        </div>
    `).join("");
}

// ===== COLOR PICKER =====
function initColorPicker() {
    document.querySelectorAll(".color-option").forEach(opt => {
        opt.addEventListener("click", () => {
            document.querySelectorAll(".color-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            selectedColor = opt.dataset.color;
        });
    });
}

// ===== MEMBER CHECKBOXES =====
function updateMemberCheckboxes(selectedIds = []) {
    const container = document.getElementById("memberCheckboxes");
    container.innerHTML = members.map(m => `
        <div class="member-checkbox-item ${selectedIds.includes(m.id) ? "checked" : ""}"
             data-id="${m.id}"
             onclick="toggleMemberCheck(this)">
            ${m.firstName} ${m.lastName}
        </div>
    `).join("");
}

function toggleMemberCheck(el) {
    el.classList.toggle("checked");
}

// ===== TASK FILTER PROJECT =====
function updateTaskFilterProject() {
    const sel = document.getElementById("filterTaskProject");
    const val = sel.value;
    sel.innerHTML = `<option value="all">Tous les projets</option>` +
        projects.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
    sel.value = val;
}

// ===== MODALS =====
function openModal(id) {
    document.getElementById(id).classList.add("open");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("open");
}

// Close modal on overlay click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
        if (e.target === overlay) closeModal(overlay.id);
    });
});

// ===== CONFIRM DIALOG =====
function initConfirmDialog() {
    const html = `
        <div class="confirm-overlay" id="confirmOverlay">
            <div class="confirm-box">
                <i class="fas fa-exclamation-triangle"></i>
                <h3 id="confirmTitle">Confirmer la suppression</h3>
                <p id="confirmMessage">Cette action est irréversible.</p>
                <div class="confirm-actions">
                    <button class="btn btn-outline" onclick="closeConfirm()">Annuler</button>
                    <button class="btn btn-danger" id="confirmOkBtn">Supprimer</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);
}

function showConfirm(title, message, onConfirm) {
    document.getElementById("confirmTitle").textContent   = title;
    document.getElementById("confirmMessage").textContent = message;
    document.getElementById("confirmOverlay").classList.add("open");
    document.getElementById("confirmOkBtn").onclick = () => {
        onConfirm();
        closeConfirm();
    };
}

function closeConfirm() {
    document.getElementById("confirmOverlay").classList.remove("open");
}

// ===== TOAST =====
function showToast(message, type = "default") {
    const toast = document.getElementById("toast");
    const icons = {
        success: "fa-check-circle",
        error:   "fa-times-circle",
        warning: "fa-exclamation-circle",
        default: "fa-info-circle"
    };
    toast.innerHTML  = `<i class="fas ${icons[type] || icons.default}"></i> ${message}`;
    toast.className  = `toast ${type} show`;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===== ACTIVITY =====
function addActivity(icon, iconBg, text) {
    activities.unshift({ icon: `fa-${icon.replace("fa-","")}`, iconBg, text, time: "À l'instant" });
    if (activities.length > 20) activities.pop();
}

// ===== SEARCH =====
function initSearch() {
    document.getElementById("searchInput").addEventListener("input", e => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
            renderProjects();
            renderTasks();
            return;
        }

        if (currentPage === "projects") {
            const container = document.getElementById("projectsContainer");
            const filtered  = projects.filter(p =>
                p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
            );
            if (!filtered.length) {
                container.innerHTML = emptyState("fa-search", "Aucun résultat", `Aucun projet pour "${q}"`);
                return;
            }
            // Re-render with filtered list temporarily
            const backup = projects;
            const temp   = filtered;
            container.innerHTML = temp.map(p => {
                const projectMembers = members.filter(m => p.members.includes(m.id));
                const taskCount      = tasks.filter(t => t.project === p.id).length;
                return buildProjectCard(p, projectMembers, taskCount);
            }).join("");
        }

        if (currentPage === "tasks") {
            const filtered = tasks.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
            const todo       = filtered.filter(t => t.status === "à faire");
            const inProgress = filtered.filter(t => t.status === "en cours");
            const done       = filtered.filter(t => t.status === "terminé");
            document.getElementById("cards-todo").innerHTML       = todo.map(renderTaskCard).join("")       || emptyKanban();
            document.getElementById("cards-inprogress").innerHTML = inProgress.map(renderTaskCard).join("") || emptyKanban();
            document.getElementById("cards-done").innerHTML       = done.map(renderTaskCard).join("")       || emptyKanban();
        }
    });
}

function buildProjectCard(p, projectMembers, taskCount) {
    return `
        <div class="project-card" style="--project-color:${p.color}" onclick="openProjectDetail(${p.id})">
            <div class="project-card-header">
                <div>
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                </div>
                <div class="project-actions" onclick="event.stopPropagation()">
                    <button class="action-btn" onclick="openEditProject(${p.id})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn danger" onclick="confirmDeleteProject(${p.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${p.progress}%;background:${p.color}"></div>
            </div>
            <div class="project-meta">
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    ${getStatusTag(p.status)}
                    ${getPriorityTag(p.priority)}
                    <span class="tag tag-gray">${taskCount} tâche${taskCount !== 1 ? "s" : ""}</span>
                </div>
                <div class="project-members">
                    ${projectMembers.slice(0,4).map(m => `
                        <div class="member-chip" style="background:${memberColor(m.id)}">
                            ${m.firstName[0]}${m.lastName[0]}
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;
}

// ===== BTN ADD MAIN =====
function btnAddMain() {
    document.getElementById("btnAddMain").addEventListener("click", () => {
        if (currentPage === "projects")  openAddProject();
        else if (currentPage === "tasks") openAddTask();
        else if (currentPage === "team")  openAddMember();
        else openAddProject();
    });
}

// ===== HELPERS =====
function getStatusTag(status) {
    const map = {
        "en cours": "tag-blue",
        "terminé":  "tag-green",
        "en pause": "tag-orange",
        "planifié": "tag-gray",
        "à faire":  "tag-gray"
    };
    return `<span class="tag ${map[status] || "tag-gray"}">${status}</span>`;
}

function getPriorityTag(priority) {
    const map = {
        "haute":   "tag-red",
        "moyenne": "tag-orange",
        "basse":   "tag-green"
    };
    return `<span class="tag ${map[priority] || "tag-gray"}">${priority}</span>`;
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { day:"2-digit", month:"short", year:"numeric" });
}

function memberColor(id) {
    const colors = ["#4f46e5","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#14b8a6"];
    return colors[(id - 1) % colors.length];
}

function emptyState(icon, title, text) {
    return `
        <div class="empty-state">
            <i class="fas ${icon}"></i>
            <h3>${title}</h3>
            <p>${text}</p>
        </div>
    `;
}