/**
 * Service de notifications toast
 */
class NotificationService {
    constructor() {
        this.container = null;
        this.init();
    }

    /**
     * Initialiser le conteneur de notifications
     */
    init() {
        if (document.getElementById('toast-container')) return;
        
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    /**
     * Afficher une notification
     */
    show(message, type = 'info', duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Retrait automatique
        setTimeout(() => {
            this.remove(toast);
        }, duration);
        
        return toast;
    }

    /**
     * Créer un élément toast
     */
    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="notificationService.remove(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        return toast;
    }

    /**
     * Retirer une notification
     */
    remove(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Notifications rapides
     */
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    /**
     * Notification de confirmation
     */
    confirm(message, onConfirm, onCancel) {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-icon">
                <i class="fas fa-question-circle"></i>
            </div>
            <p class="confirm-message">${message}</p>
            <div class="confirm-actions">
                <button class="btn btn-outline" id="confirm-cancel">Annuler</button>
                <button class="btn btn-primary" id="confirm-ok">Confirmer</button>
            </div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        const remove = () => {
            overlay.classList.add('hide');
            setTimeout(() => document.body.removeChild(overlay), 300);
        };
        
        dialog.querySelector('#confirm-ok').onclick = () => {
            if (onConfirm) onConfirm();
            remove();
        };
        
        dialog.querySelector('#confirm-cancel').onclick = () => {
            if (onCancel) onCancel();
            remove();
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                if (onCancel) onCancel();
                remove();
            }
        };
    }
}

// Instance singleton
const notificationService = new NotificationService();
