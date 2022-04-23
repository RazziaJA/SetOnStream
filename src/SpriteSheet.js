import Sprite from './Sprite';

const SpriteSheet = ({ filename, data, sprite, ...props }) => {
  if (!filename || !data || !sprite) {
    return null;
  }

  const currentSprite = data[sprite];

  const spriteData = { ...currentSprite, filename, props };

  return <Sprite {...spriteData} />;
};

export default SpriteSheet;