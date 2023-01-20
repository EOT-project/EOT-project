import LoaderLogo from "./LoaderLogo";

const LoaderNav = () => {
    return (
        <div className="loaderContainer">
                <nav>
                    <LoaderLogo className="loading"/>
                    <ul>
                        <li><p className="navListItem"/></li>
                        <li><p className="navListItem"/></li>
                        <li><p className="navListItem"/></li>
                        <li><p className="navListItem"/></li>
                    </ul>
                </nav>
        </div>
    );
}

export default LoaderNav;