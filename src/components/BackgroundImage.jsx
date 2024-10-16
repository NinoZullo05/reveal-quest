import MainAfter from '../assets/MainAfter.jpg';

function BackgroundImage() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${MainAfter})` }}
    ></div>
  );
}

export default BackgroundImage;
