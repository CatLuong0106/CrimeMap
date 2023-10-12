import React from 'react';

const CrimeCircle = ({ children }) => {
    return (
        <div className='big-crime-circle'>
            <div className='small-crime-circle'>
                {children}
            </div>
        </div>
    );
}

export default CrimeCircle;
