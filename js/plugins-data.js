/**
 * Dynamically fetches all repositories from the spygamingog GitHub account
 * and filters them by the 'minecraft-plugins' topic.
 */
async function fetchPluginsFromGithub() {
    try {
        const username = 'spygamingog';
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!response.ok) throw new Error('Failed to fetch GitHub repositories');
        
        const repos = await response.json();
        
        // Filter repositories that have the 'minecraft-plugins' topic
        const filteredRepos = repos.filter(repo => 
            repo.topics && repo.topics.includes('minecraft-plugins')
        );

        // Map GitHub repos to our plugin structure
        return filteredRepos.map(repo => ({
            id: repo.name.toLowerCase(),
            name: repo.name,
            description: repo.description || "No description provided.",
            icon: getIconForRepo(repo.name),
            color: getColorForRepo(repo.name),
            modrinthId: repo.name.toLowerCase(), // Assuming Modrinth slug matches repo name
            githubRepo: repo.name,
            tags: repo.topics.filter(t => t !== 'minecraft-plugins').map(t => t.charAt(0).toUpperCase() + t.slice(1)),
            stars: repo.stargazers_count,
            language: repo.language
        }));
    } catch (error) {
        console.error('Error fetching plugins from GitHub:', error);
        return [];
    }
}

function getIconForRepo(name) {
    const icons = {
        'spyhitw': 'fas fa-wall',
        'spyrun': 'fas fa-stopwatch',
        'spyspectator': 'fas fa-eye',
        'spyhunts': 'fas fa-compass',
        'spycore': 'fas fa-microchip'
    };
    const key = Object.keys(icons).find(k => name.toLowerCase().includes(k));
    return icons[key] || 'fas fa-puzzle-piece';
}

function getColorForRepo(name) {
    const colors = {
        'spyhitw': 'spy-neon-blue',
        'spyrun': 'spy-neon-purple',
        'spyspectator': 'spy-neon-purple',
        'spyhunts': 'green-500'
    };
    const key = Object.keys(colors).find(k => name.toLowerCase().includes(k));
    return colors[key] || 'spy-neon-blue';
}

async function fetchModrinthData(projectId) {
    try {
        // We use the slug or ID to fetch data from Modrinth
        const response = await fetch(`https://api.modrinth.com/v2/project/${projectId}`);
        if (!response.ok) return null;
        const data = await response.json();
        return {
            downloads: data.downloads,
            followers: data.followers,
            latest_version: data.latest_version || '1.0.0',
            icon_url: data.icon_url,
            id: data.id
        };
    } catch (error) {
        console.error(`Error fetching Modrinth data for ${projectId}:`, error);
        return null;
    }
}

async function fetchGithubData(repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/spygamingog/${repo}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error(`Error fetching Github data for ${repo}:`, error);
        return null;
    }
}
