const Sprite = ({ filename, x, y, width, height, ...props }) => {
  if (!filename) {
    return null;
  }

  const style = {
    backgroundImage: `url(${filename})`,
    backgroundPosition: `${x * (-1)}px ${y * (-1)}px`,
    backgroundRepeat: 'no-repeat',
    width,
    height,
    ...props.style
  };

  return <div style={style} />;
};

Sprite.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export default Sprite;