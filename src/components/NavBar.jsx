import React from 'react';

const NavBar = () => {
    return (
        <nav>
            <div id="title"><a href="/">Crime Map</a></div>
            <div className="others">
                <div className="link"><a href="/">about</a></div>
                <div className="link"><a href="/">author</a></div>
            </div>
        </nav>
    );
}

export default NavBar;
