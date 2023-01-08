const MainCard = (props) => {
    console.log(props.image);
    
    return (
        <div className="mainCard" style={{"background": `linear-gradient( 90deg,rgb(211, 200, 224) 50%, transparent, rgb(255, 255, 255) 100%), url(${props.image})`, "background-repeat": "no-repeat", "background-position": "center",
        "background-size": "cover"}}>{props.children}</div>
    );
}

export default MainCard;