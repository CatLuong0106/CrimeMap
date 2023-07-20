import React from 'react';

const Dashboard = ({ parentOnClickHandler }) => {
    return (
        <div id="dashboard">
            <input type="range" min="1" max="10" />
            <button onClick={parentOnClickHandler} >Change color</button>
            <fieldset>
                <legend>Pick an option</legend>

                <div className="option">
                    <input type="checkbox" id="scales" name="scales" />
                    <label htmlFor="scales">Option 1</label>
                </div>

                <div className="option">
                    <input type="checkbox" id="horns" name="horns" />
                    <label htmlFor="horns">Option 2</label>
                </div>
            </fieldset>

        </div>
    );
}

export default Dashboard;
