const MainCard = (props) => {   
     
    return (
        <div className="mainCard loading" style={{"background": `linear-gradient(90deg, #BAE6DA 1%, rgba(186,230,219) 62%, rgba(255,255,255,0.00) 100%), url(${props.image})`, "backgroundRepeat": "no-repeat", "backgroundPosition": "center",
        "backgroundSize": "cover"}}>{props.children}</div>
    );
}

export default MainCard;