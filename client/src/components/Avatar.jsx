// Avatar.jsx - a round profile picture.
// If the user has no photo yet, it shows their initials instead ("Aadhya Rao" -> "AR").

function getInitials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = words.slice(0, 2).map((word) => word[0].toUpperCase());
  return initials.join('') || '?';
}

function Avatar({ name, image, size = 44 }) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.38) };

  if (image) {
    return <img className="avatar" src={image} alt={`${name}'s profile photo`} style={style} />;
  }

  return (
    <span className="avatar" style={style} role="img" aria-label={`${name}'s profile picture`}>
      {getInitials(name)}
    </span>
  );
}

export default Avatar;
