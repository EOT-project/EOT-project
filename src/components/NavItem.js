import { Link } from "react-router-dom";

const NavItem = ({item}) => {
    return (
        <Link to={`${item}`}><li>{item}</li></Link>
    );
};

export default NavItem;