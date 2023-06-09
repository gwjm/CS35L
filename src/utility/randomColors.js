// Ant design colors for user tags
const antDesignColors = [
  'pink',
  'geekblue',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'volcano',
  'lime',
  'gold',
  'red',
  'magenta',
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * antDesignColors.length);
  return antDesignColors[randomIndex];
};

export const getColor = (index) => {
  return antDesignColors[index % antDesignColors.length];
}