import React, { useState } from 'react';
import { useMap } from '../contexts/MapContext';
import CrimeCircle from './CrimeCircle';
import DashboardSection from './DashboardSection';
import Ranking from './Ranking';
import Graph from './Graph';

const Dashboard = () => {
    const { dashboardData, closeDashboard, toggleHeatmap } = useMap()
    // console.log(dashboardData)

    return (
        <div id="dashboard" className='half-view'>
            <div className='dashboard-head'>
                <div className='dashboard-title'>{dashboardData.name}</div>
                <button className='close-button' onClick={(e) => closeDashboard()}>✖</button>
            </div>
            <div className='dashboard-display'>
                <DashboardSection sectionTitle={'Area Crime Score'}>
                    <CrimeCircle>{dashboardData.crimeScore ? dashboardData.crimeScore.toFixed() : 0}</CrimeCircle>
                </DashboardSection>
                <DashboardSection sectionTitle={'Top Offenses Count in Area, 2010 - 2023'}>
                    <Ranking offenses={dashboardData.offenses}></Ranking>
                </DashboardSection>
                <DashboardSection sectionTitle={'Crime Count By Year'} extraClassNames={'graphical-section graph1'}>
                    <Graph src={"/CrimeDistByYear.png"}></Graph>
                </DashboardSection>
                <DashboardSection sectionTitle={'Crime Count By Year'} extraClassNames={'graphical-section graph2'}>
                    <Graph src={"/Top5Crimes2023.png"}></Graph>
                </DashboardSection>

            </div>
        </div>
    );
}

export default Dashboard;
