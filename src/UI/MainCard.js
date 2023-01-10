const MainCard = (props) => {    
    return (
        <div className="mainCard" style={{"background": `linear-gradient( 90deg,rgb(211, 200, 224) 50%, transparent, rgb(255, 255, 255) 100%), url(${props.image})`, "backgroundRepeat": "no-repeat", "backgroundPosition": "center",
        "backgroundSize": "cover"}}>{props.children}</div>
    );
}

export default MainCard;