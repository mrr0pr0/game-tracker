// Calculate dashboard statistics
export function calculateStats(games) {
    const stats = {
        total: games.length,
        playing: 0,
        completed: 0,
        backlog: 0,
        dropped: 0,
    };

    games.forEach(game => {
        if (game.status === 'playing') stats.playing++;
        else if (game.status === 'completed') stats.completed++;
        else if (game.status === 'backlog') stats.backlog++;
        else if (game.status === 'dropped') stats.dropped++;
    });

    return stats;
}

// Calculate completion rate
export function getCompletionRate(games) {
    if (games.length === 0) return 0;
    const completed = games.filter(g => g.status === 'completed').length;
    return Math.round((completed / games.length) * 100);
}

// Get games by console
export function getGamesByConsole(games) {
    const consoleStats = {};

    games.forEach(game => {
        if (!consoleStats[game.console]) {
            consoleStats[game.console] = 0;
        }
        consoleStats[game.console]++;
    });

    return consoleStats;
}

// Get games by theme
export function getGamesByTheme(games) {
    const themeStats = {};

    games.forEach(game => {
        if (!themeStats[game.theme]) {
            themeStats[game.theme] = 0;
        }
        themeStats[game.theme]++;
    });

    return themeStats;
}