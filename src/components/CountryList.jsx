import React from 'react';
import styles from './CityList.module.css'
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import CountryItem from "./CountryItem";
import logo from "./Logo";
import {useCities} from "../context/contextCities";
function CountryList() {
    const {cities, isLoading} = useCities()
    if(isLoading) return <Spinner/>
    if(!cities.length) return <Message message={'Add your first city by clicking on a city on the map'}/>

    const countries = cities.reduce((arr, city)=>{
        const isInclude = arr.map(el => el.country).includes(city.country)
        if(!isInclude){
            return [...arr, {country: city.country, emoji: city.emoji}]
        }else{
            return arr
        }
    },[])

    return (
        <ul className={styles.cityList}>
            {countries.map((country)=><CountryItem country={country} key={country.country} />)}
        </ul>
    );
}

export default CountryList;