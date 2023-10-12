import React from 'react';

const DashboardSection = ({ children, sectionTitle, extraClassNames }) => {
    return (
        <section className={`dashboard-section ${extraClassNames}`}>
            <div className='dashboard-section-title'>
                {sectionTitle}
            </div>
            <div className='dashboard-section-content'>
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;
