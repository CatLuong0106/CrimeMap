import React from 'react';

const NavBar = () => {
    return (
        <nav>
            <div id="title"><a href="/">Crime Map</a></div>
            <div class="others">
                <div class="link"><a href="/">about</a></div>
                <div class="link"><a href="/">author</a></div>
            </div>
        </nav>
    );
}

export default NavBar;
