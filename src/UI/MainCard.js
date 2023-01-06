const MainCard = (props) => {
    return (
        <div className={`mainCard ${props.className}`}>{props.children}</div>
    );
}

export default MainCard;