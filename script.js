// Sample server data
const servers = [
    { name: "Server 1", status: "online", cpu: 20, memory: 45 },
    { name: "Server 2", status: "offline", cpu: 0, memory: 0 },
    { name: "Server 3", status: "warning", cpu: 75, memory: 80 },
];

// Function to generate server cards
function renderServers() {
    const container = document.getElementById('servers');
    container.innerHTML = ""; // Clear previous content

    servers.forEach((server, index) => {
        const card = document.createElement('div');
        card.className = 'server-card';

        card.innerHTML = `
            <h2>${server.name}</h2>
            <p>Status: <span class="status ${server.status}">${server.status}</span></p>
            <p>CPU Usage: ${server.cpu}%</p>
            <p>Memory Usage: ${server.memory}%</p>
            <button onclick="simulateRestart(${index})">Restart Server</button>
        `;

        container.appendChild(card);
    });
}

// Function to simulate server restart
function simulateRestart(index) {
    servers[index].status = "online";
    servers[index].cpu = Math.floor(Math.random() * 50);
    servers[index].memory = Math.floor(Math.random() * 50);
    renderServers();
}

// Auto-refresh every 5 seconds with random CPU/Memory changes
setInterval(() => {
    servers.forEach(server => {
        if(server.status !== "offline") {
            server.cpu = Math.floor(Math.random() * 100);
            server.memory = Math.floor(Math.random() * 100);
            if(server.cpu > 80 || server.memory > 80) {
                server.status = "warning";
            } else {
                server.status = "online";
            }
        }
    });
    renderServers();
}, 5000);

// Initial render
renderServers();
