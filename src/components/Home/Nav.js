import { Link } from "react-router-dom";
import logo from "../../assets/logo_black1.png"

const Nav = () => {
    return (
        <nav>
            <Link to="/">
                <div className="logoContainer">
                     <img src={logo} alt="logo"/>
                </div>
            </Link>
            <ul>   
                <Link to="/the-opportunity"><li>The opportunity</li></Link>
                <Link to="/call-to-action"><li>Call To Action</li></Link>
                <Link to="/newsroom"><li>Newsroom</li></Link>
            </ul>
        </nav>
    )
};

export default Nav;