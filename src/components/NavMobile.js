// import { IoClose } from "react-icons/io5";

const NavMobile = ({isClicked, setIsClicked}) => {

    return (
        <>
            <div className={`overlay ${isClicked ? 'backdrop' : ''}`}></div>
            {/* <div className={`menuMobile ${isClicked ? 'showMenu' : ''}`}>
                <IoClose onClick={() => setIsClicked(false)} className="closeMenuIcon"/>
            </div>  */}
        </>
    
    );
}

export default NavMobile;

