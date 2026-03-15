// Custom File Card Web Component
class FileCard extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }
    
    static get observedAttributes() {
        return ['fileName', 'sample', 'site', 'timeOfDay', 'depth', 'day'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    
    render() {
        const fileName = this.getAttribute('fileName') || '';
        const sample = this.getAttribute('sample') || '0';
        const site = this.getAttribute('site') || '';
        const timeOfDay = this.getAttribute('timeOfDay') || '';
        const depth = this.getAttribute('depth') || '';
        const day = this.getAttribute('day') || '';
        
        this.innerHTML = `
            <div class="file-card">
                <div class="file-name">
                    <img src="./styles/assets/svg/file.svg" alt="file icon" width="20" height="20" onerror="this.style.display='none'"/>
                    <p>${fileName}</p>
                </div>
                <div class="file-sample">
                    <p>Sample ${sample}</p>
                </div>
                <div class="file-tags">
                    <div class="tag">${site}</div>
                    <div class="tag">${timeOfDay}</div>
                    <div class="tag">${depth}</div>
                    <div class="tag">${day}</div>
                </div>
                <div class="file-delete">
                    <img src="./styles/assets/svg/trash.svg" alt="delete" width="20" height="20" onerror="this.textContent='×'"/>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const deleteBtn = this.querySelector('.file-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                const fileId = this.getAttribute('data-file-id');
                if (fileId && window.deleteFile) {
                    window.deleteFile(fileId);
                }
            });
        }
    }
}

// Register the custom element
customElements.define('file-card', FileCard);