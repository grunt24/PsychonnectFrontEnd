import logo from "../assets/img/logo-removebg-preview.png";

const Logo = () => {
  return (
    <div className="logo">
      <a href="/" className="logo-text">
        <img className="logo-img" src={logo} alt="Logo" /> 
      </a>
    </div>
  );
};

export default Logo;
