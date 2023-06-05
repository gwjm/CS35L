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
      'volcano',
      'geekblue',
      'magenta',
    ];
    const randomIndex = Math.floor(Math.random() * antDesignColors.length);
    return antDesignColors[randomIndex];
  };
  