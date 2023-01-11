import { Link } from "react-router-dom";

const NavItem = ({item}) => {

    //function to remove space and special characters
    const decodeText = (text) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        const url = textArea.value.replace(/ /g, "").toLowerCase()
        return url;
     }    
    
    return (
        <Link to={decodeText(item)}><li><p>{item}</p></li></Link>
    );
};

export default NavItem;