// Filter games by console, theme, and status
export function filterGames(games, filters) {
    let filtered = [...games];

    if (filters.console && filters.console !== 'all') {
        filtered = filtered.filter(game => game.console === filters.console);
    }

    if (filters.theme && filters.theme !== 'all') {
        filtered = filtered.filter(game => game.theme === filters.theme);
    }

    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(game => game.status === filters.status);
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(game =>
            game.title.toLowerCase().includes(searchLower)
        );
    }

    return filtered;
}

// Sort games
export function sortGames(games, sortBy = 'recent') {
    const sorted = [...games];

    switch (sortBy) {
        case 'recent':
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'status':
            return sorted.sort((a, b) => a.status.localeCompare(b.status));
        default:
            return sorted;
    }
}