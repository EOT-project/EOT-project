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
        <li><Link to={decodeText(item)}><p>{item}</p></Link></li>
    );
};

export default NavItem;