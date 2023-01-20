import { Link } from "react-router-dom";

const NavItem = (props) => {

    return (
        !props.value
        ?
            <li className="loading"><Link to="/" onClick={() => props.setIsClicked(false)} className="loading"><p className={`loading ${props.isClicked ? 'menuItem' : ''}`}>{props.name}</p></Link></li>
        :
            <li className="loading"><Link to={props.value} onClick={() => props.setIsClicked(false)} className="loading"><p className={`loading ${props.isClicked ? 'menuItem' : ''}`}>{props.name}</p></Link></li>
    );
};

export default NavItem;

