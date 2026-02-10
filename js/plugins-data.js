const pluginsData = [
    {
        id: "spyhitw",
        name: "SpyHITW",
        description: "A professional Hole In The Wall minigame with dynamic walls, setup UI, and advanced performance optimizations.",
        icon: "fas fa-wall",
        color: "spy-neon-blue",
        modrinthId: "spyhitw", // Replace with actual Modrinth project ID/slug
        githubRepo: "SpyHITW", // Replace with actual repo name
        tags: ["Minigame", "1.21", "Competitive"],
        features: [
            "Dynamic Wall Generation",
            "Interactive Setup UI",
            "Multi-direction Support",
            "Advanced Performance"
        ]
    },
    {
        id: "spyrun-core",
        name: "SpyRun Core",
        description: "The engine behind the speedrunning platform. Handles matchmaking, timing, and world generation.",
        icon: "fas fa-stopwatch",
        color: "spy-neon-blue",
        modrinthId: "spyrun-core",
        githubRepo: "SpyRun-Core",
        tags: ["Core", "Spigot", "Matchmaking"]
    },
    {
        id: "spyspectator",
        name: "SpySpectator",
        description: "Advanced spectator mode with first-person view, inventory inspection, and teleport menu.",
        icon: "fas fa-eye",
        color: "spy-neon-purple",
        modrinthId: "spyspectator",
        githubRepo: "SpySpectator",
        tags: ["Utility", "Moderation"]
    },
    {
        id: "spyhunts",
        name: "SpyHunts",
        description: "Manhunt gamemode automation. Includes tracking compasses, role assignment, and win condition detection.",
        icon: "fas fa-compass",
        color: "green-500",
        modrinthId: "spyhunts",
        githubRepo: "SpyHunts",
        tags: ["Manhunt", "Tracking"]
    }
];

async function fetchModrinthData(projectId) {
    try {
        const response = await fetch(`https://api.modrinth.com/v2/project/${projectId}`);
        if (!response.ok) throw new Error('Modrinth project not found');
        return await response.ok ? await response.json() : null;
    } catch (error) {
        console.error(`Error fetching Modrinth data for ${projectId}:`, error);
        return null;
    }
}

async function fetchGithubData(repo) {
    try {
        // Replace 'SpyGamingOG' with actual organization/user name
        const response = await fetch(`https://api.github.com/repos/SpyGamingOG/${repo}`);
        if (!response.ok) throw new Error('Github repo not found');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching Github data for ${repo}:`, error);
        return null;
    }
}
