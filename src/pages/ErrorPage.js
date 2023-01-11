import {Link} from 'react-router-dom'

const ErrorPage = ()=>{
    return(
        <div className="errorPage">
            <h1>404 - page not found</h1>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
            <Link to={`/`}>
                <button className="goBackHome">Go To Homepage</button>
            </Link>
        </div>
    )
}

export default ErrorPage