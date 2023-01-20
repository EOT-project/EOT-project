import { Link } from "react-router-dom";

const NavItem = (props) => {

    return (
        !props.value
        ?
            <li className="loading"><Link to="/" className="loading"><p className="loading">{props.name}</p></Link></li>
        :
            <li className="loading"><Link to={props.value} className="loading"><p className="loading">{props.name}</p></Link></li>
    );
};

export default NavItem;