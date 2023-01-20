import LoaderLogo from "./LoaderLogo";

const LoaderFooter = () => {
    return (
        <div className="loaderContainer">
            <footer>
                <div className="footerContainer">
                    <LoaderLogo className="loading"/>
                    <div className="socialMediaContainer">
                        <div className="email"/>
                        <ul>
                            <li><p className="footerItem"/></li>
                            <li><p className="footerItem"/></li>

                        </ul>
                    </div>
                </div>
            </footer>
            
        </div>
    );
}

export default LoaderFooter;