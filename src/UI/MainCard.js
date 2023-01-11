const MainCard = (props) => {   
     
    return (
        <div className="mainCard" style={{"background": `linear-gradient(90deg, #D5C7E2 1%, rgba(213,199,226,0.90) 62%, rgba(255,255,255,0.00) 100%), url(${props.image})`, "backgroundRepeat": "no-repeat", "backgroundPosition": "center",
        "backgroundSize": "cover"}}>{props.children}</div>
    );
}

export default MainCard;