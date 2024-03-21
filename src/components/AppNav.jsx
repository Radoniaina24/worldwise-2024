import React from 'react';
import styles from './AppNav.module.css'
import {NavLink} from "react-router-dom";
function AppNav(props) {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to={"cities"}>Villes</NavLink>
                </li>
                <li>
                    <NavLink to={"countries"}>Pays</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default AppNav;