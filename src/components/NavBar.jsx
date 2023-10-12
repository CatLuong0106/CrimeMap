import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <div id="title"><Link to="/">Crime Map</Link></div>
            <div className="others">
                <div className="link"><Link to="/about">about</Link></div>
                <div className="link"><Link to="/author">author</Link></div>
            </div>
        </nav>
    );
}

export default NavBar;
