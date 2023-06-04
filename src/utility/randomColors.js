
// Helper function to get a random color from Ant Design's color palette
export const getRandomColor = () => {
    // Ant design colors for user tags
    const antDesignColors = [
        'pink',
        'red',
        'yellow',
        'orange',
        'cyan',
        'green',
        'blue',
        'purple',
        'lime',
        'gold',
    ];
    const randomIndex = Math.floor(Math.random() * antDesignColors.length);
    return antDesignColors[randomIndex];
};