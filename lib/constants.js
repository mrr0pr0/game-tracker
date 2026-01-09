// Console options
export const CONSOLES = [
    { value: 'ps5', label: 'PlayStation 5' },
    { value: 'ps4', label: 'PlayStation 4' },
    { value: 'xbox-series', label: 'Xbox Series X|S' },
    { value: 'xbox-one', label: 'Xbox One' },
    { value: 'switch', label: 'Nintendo Switch' },
    { value: 'pc', label: 'PC' },
    { value: 'mobile', label: 'Mobile' },
];

// Game themes/genres
export const THEMES = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'rpg', label: 'RPG' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'sports', label: 'Sports' },
    { value: 'racing', label: 'Racing' },
    { value: 'shooter', label: 'Shooter' },
    { value: 'puzzle', label: 'Puzzle' },
    { value: 'simulation', label: 'Simulation' },
    { value: 'horror', label: 'Horror' },
    { value: 'platformer', label: 'Platformer' },
    { value: 'fighting', label: 'Fighting' },
];

// Game status options
export const STATUSES = [
    { value: 'playing', label: 'Playing', color: 'var(--status-playing)' },
    { value: 'completed', label: 'Completed', color: 'var(--status-completed)' },
    { value: 'backlog', label: 'Backlog', color: 'var(--text-muted)' },
    { value: 'dropped', label: 'Dropped', color: 'var(--danger)' },
];

// Navigation items
export const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: 'home' },
    { href: '/games/add', label: 'Add Game', icon: 'plus' },
    { href: '/settings', label: 'Settings', icon: 'settings' },
];