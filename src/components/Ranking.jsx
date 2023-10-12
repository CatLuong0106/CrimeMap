import React from 'react';

const Ranking = ({ offenses }) => {
    const rankColor = ['#022C49', '#016FB9', '#22AED1']

    let offensesList = []
    for (let offenseName in offenses) {
        offensesList.push([offenseName.replace('/', ' / '), offenses[offenseName]])
    }
    offensesList.sort((a, b) => {return b[1] - a[1]})

    return (
        <div className='rank' color='red'>
            {offensesList.slice(0, 10).map((offense, i) => {
                return <div key={i} className='rank-item' style={
                    i < rankColor.length ? { backgroundColor: rankColor[i], color: 'white' } : {}
                }>
                    <div className='rank-title'>{offense[0]}</div>
                    <div className='rank-value'>{offense[1]}</div>
                </div>
            })}
        </div>
    );
}

export default Ranking;
