import React, { useState } from 'react';
import { useMap } from '../contexts/MapContext';
import getRandomColor from '../utils/RandomColor';

const Dashboard = () => {
    const { changeThemeColorOfAll, setDrawMode } = useMap();

    const onChangeColor = () => { changeThemeColorOfAll(getRandomColor()); }
    const onDrawModeChange = (event) => {
        setDrawMode(event.target.value)
    }

    return (
        <div id="dashboard">

            <button onClick={onChangeColor} >Change color</button>
            <div onChange={onDrawModeChange}>
                <div><input type="radio" name="drawmode" value="None" /> Disable drawing mode</div>
                <div><input type="radio" name="drawmode" value="Point" /> Draw Points</div>
                <div><input type="radio" name="drawmode" value="LineString" /> Draw Lines</div>
                <div><input type="radio" name="drawmode" value="Polygon" /> Draw Polygon</div>
            </div>
        </div>
    );
}

export default Dashboard;
