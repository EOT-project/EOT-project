import { Link } from "react-router-dom";

const NavItem = (props) => {

    return (
        <li className="loading"><Link to={props.value} className="loading"><p className="loading">{props.name}</p></Link></li>
    );
};

export default NavItem;