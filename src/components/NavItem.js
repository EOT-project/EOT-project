import { Link } from "react-router-dom";

const NavItem = (props) => {

    return (
        <li><Link to={props.value}><p>{props.name}</p></Link></li>
    );
};

export default NavItem;