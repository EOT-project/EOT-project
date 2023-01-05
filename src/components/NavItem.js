import { Link } from "react-router-dom";

const NavItem = ({item}) => {
    return (
        <Link to={`/${item.menuItems}`}><li>{item.menuItems}</li></Link>
    );
};

export default NavItem;