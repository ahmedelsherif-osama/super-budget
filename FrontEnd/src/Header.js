import { Link as ReactLink } from 'react-router-dom';

function Header(props) {

    let currentPath = props.path;

    let homeClass = currentPath === '/' ? 'active' : '';
    let aboutClass = currentPath === '/about' ? 'active' : '';
    let contactClass = currentPath === '/contact' ? 'active' : '';

    return (
        <div className="container">
            <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <ReactLink to="/" className={`nav-link ${homeClass}`}>Home</ReactLink>
                </li>
                <li className="nav-item">
                    <ReactLink to="/about" className={`nav-link ${aboutClass}`}>About</ReactLink>
                </li>
                <li className="nav-item">
                    <ReactLink to="/contact" className={`nav-link ${contactClass}`}>Contact</ReactLink>
                </li>
            </ul>
            </header>
        </div>
    )
}

export default Header;