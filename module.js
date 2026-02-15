class TemplateModule {
    constructor(container, config) {
        this.container = container;
        this.config = config;

        // Initialize any state here
        this.data = this.loadData();

        // Initialize
        this.init();
    }

    async init() {
        // Load HTML template
        const response = await fetch('/modules/template/module.html');
        const html = await response.text();
        this.container.innerHTML = html;

        // Get references to DOM elements
        this.contentElement = this.container.querySelector('.template-content');
        this.headerElement = this.container.querySelector('.template-header');

        // Set up any event listeners
        this.setupEventListeners();

        // Initial render
        this.render();

        // Optional: Set up periodic updates
        // this.startAutoUpdate();
    }

    setupEventListeners() {
        // Example: Add event listeners here
        // const button = this.container.querySelector('.template-button');
        // button.addEventListener('click', () => this.handleButtonClick());
    }

    loadData() {
        // Load data from localStorage if needed
        const stored = localStorage.getItem('template-data');
        return stored ? JSON.parse(stored) : [];

        // Or return default data
        // return this.config.defaultData || [];
    }

    saveData() {
        // Save data to localStorage if needed
        localStorage.setItem('template-data', JSON.stringify(this.data));
    }

    render() {
        // Update the UI based on current state
        // Example:
        // this.contentElement.innerHTML = this.data.map(item => `
        //   <div class="template-list-item">${this.escapeHtml(item.text)}</div>
        // `).join('');
    }

    // Example: Handle user interactions
    handleButtonClick() {
        console.log('Button clicked!');
        // Update state
        // this.data.push({ text: 'New item' });
        // this.saveData();
        // this.render();
    }

    // Optional: Set up automatic updates
    startAutoUpdate() {
        this.updateInterval = setInterval(() => {
            this.render();
        }, 60000); // Update every minute
    }

    // Utility: Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup when module is removed
    destroy() {
        // Clear any intervals
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Remove any event listeners if needed
        // Clean up any other resources
    }
}

// Export to global scope
window.TemplateModule = TemplateModule;