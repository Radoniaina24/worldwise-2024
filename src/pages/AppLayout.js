import React from 'react';
import Sidebar from "../components/Sidebar";
import styles from './AppLayout.module.css'
import Map from "../components/Map";
import User from "../components/User";

function AppLayout(props) {
    return (
        <div className={styles.app}>
            <User/>
            <Sidebar/>
            <Map/>
        </div>
    );
}

export default AppLayout;