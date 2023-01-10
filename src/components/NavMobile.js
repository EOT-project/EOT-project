
const NavMobile = ({isClicked, setIsClicked}) => {

    return (
        <div className={`menuMobile ${isClicked ? 'showMenu' : ''}`}>
            <button className="closeBtn" onClick={() => setIsClicked(false)}>Close</button>
            <p>Hola</p>
        </div> 
        
    
    );
}

export default NavMobile;