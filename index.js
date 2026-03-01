export default class HelloWorldModule {
    constructor(wrapper, config) {
        this.wrapper = wrapper;
        this.config = config;

        this.init();
    }

    async init() {
        // Load CSS file
        const cssText = await fetch(new URL("./styles.css", import.meta.url))
            .then(res => res.text());
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssText);
        this.wrapper.adoptedStyleSheets.push(sheet);

        // Load HTML
        const response = await fetch(new URL("./module.html", import.meta.url))
        const html = await response.text();

        // Render module
        const container = document.createElement("div");
        container.innerHTML = html;
        container.className = "container";
        this.wrapper.appendChild(container);

        // Bind event handlers
        this.registerHandlers();
    }

    registerHandlers() {
        this.wrapper.getElementById("echo-btn-post").addEventListener("click", this.echoPost);
        this.wrapper.getElementById("echo-btn-get").addEventListener("click", this.echoGet);
    }

    // Won't work when running via preview but allows for some basic testing
    echoPost = async () => {
        const endpoint = "echo"
        const queryParams = {foo: "bar"}
        const body = {message: "Hello World"}

        const url = new URL(endpoint + '?' + new URLSearchParams(queryParams).toString(), import.meta.url);
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        try {
            console.log(`Posting to: ${url.href}`);
            const response = await fetch(url, payload);
            this.data = await response.json();
            console.log(this.data);
        } catch(err) {
            console.error(`Failed to POST to '${endpoint}': `, err);
        }
    }

    // Won't work when running via preview but allows for some basic testing
    echoGet = async () => {
        const endpoint = "echo"
        const queryParams = {foo: "bar"};

        const url = new URL(endpoint + '?' + new URLSearchParams(queryParams).toString(), import.meta.url);

        try {
            console.log(`Getting: ${url.href}`);
            const response = await fetch(url);
            this.data = await response.json();
            console.log(this.data);
        } catch(err) {
            console.error(`Failed to fetch '${endpoint}': `, err);
        }
    }

    destroy() {
        // Cleanup timers/listeners if needed
    }
}