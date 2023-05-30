import logo from '../nav.png';
import "./Navbar.css"

export default function Navbar() {
  return (
    <div className="header-container">
      <img className="logo-img" src={logo} alt="divergent logo"></img>
    </div>
  );
}