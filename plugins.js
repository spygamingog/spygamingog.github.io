const GITHUB_USERNAME = 'spygamingog';
const TOPIC_FILTER = 'minecraft-plugin'; // Change this to the topic you use on GitHub

async function fetchPlugins() {
    const pluginGrid = document.getElementById('plugin-grid-dynamic');
    if (!pluginGrid) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
        const repos = await response.json();

        // Filter repos by topic
        const filteredRepos = repos.filter(repo => repo.topics && repo.topics.includes(TOPIC_FILTER));

        if (filteredRepos.length === 0) {
            pluginGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No plugins found with the specified topic.</p>';
            return;
        }

        pluginGrid.innerHTML = filteredRepos.map(repo => {
            const modrinthUrl = `https://modrinth.com/plugin/${repo.name.toLowerCase()}`;
            const detailsUrl = `plugin.html?repo=${repo.name}`;
            return `
                <div class="plugin-card">
                    <div class="plugin-icon"><i class="${getPluginIcon(repo.name)}"></i></div>
                    <div class="repo-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    </div>
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <div class="plugin-actions">
                        <div class="btn-group">
                            <a href="${detailsUrl}" class="btn-plugin btn-view" style="background: var(--primary-color); color: var(--dark-bg);"><i class="fas fa-info-circle"></i> Details</a>
                            <a href="${repo.html_url}" target="_blank" class="btn-plugin btn-github"><i class="fab fa-github"></i> Source</a>
                        </div>
                        <div class="btn-group">
                            <a href="${modrinthUrl}" target="_blank" class="btn-plugin btn-modrinth"><i class="fas fa-download"></i> Modrinth</a>
                            <button onclick="openReviewModal('${repo.name}')" class="btn-plugin btn-review"><i class="fas fa-comment"></i> Review</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Error fetching plugins:', error);
        pluginGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Failed to load plugins from GitHub.</p>';
    }
}

function getPluginIcon(repoName) {
    const icons = {
        'SpyCore': 'fas fa-layer-group',
        'SpyBedWars': 'fas fa-bed',
        'SpyHunts': 'fas fa-crosshairs',
        'SpyNPCs': 'fas fa-users',
        'SpySpectator': 'fas fa-eye',
        'SpyInventories': 'fas fa-boxes',
        'SpyNetherPortals': 'fas fa-dungeon'
    };
    return icons[repoName] || 'fas fa-puzzle-piece';
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchPlugins);