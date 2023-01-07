import { Link } from "react-router-dom";

const NavItem = ({item}) => {

    const decodeText = (text) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    };

    console.log(decodeText(item));
    
    
    return (
        <Link to={decodeText(item)}><li>{item}</li></Link>
    );
};

export default NavItem;