import { Link } from "react-router-dom";

const NavItem = (props) => {

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    };

    const menuItemHandler = () => {
        props.setIsClicked(false);
        goToTop();
    };


    return (
        !props.value
        ?
            <li className="loading"><Link to="/" onClick={menuItemHandler} className="loading"><p className={`loading ${props.isClicked ? 'menuItem' : ''}`}>{props.name}</p></Link></li>
        :
            <li className="loading"><Link to={props.value} onClick={menuItemHandler} className="loading"><p className={`loading ${props.isClicked ? 'menuItem' : ''}`}>{props.name}</p></Link></li>
    );
};

export default NavItem;


