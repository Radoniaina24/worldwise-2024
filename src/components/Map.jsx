import React, {useEffect, useState} from 'react';
import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useCities} from "../context/contextCities";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlLocation from "../hooks/useUrlLocation";
function Map(props) {
    const {cities} = useCities()
    const [mapLat, mapLng] = useUrlLocation()
    const {
        isLoading: isLoadingPosition,
        position: positionGeolocation,
        getPosition,
    } = useGeolocation()
    const [mapPosition, setMapPosition] = useState([40, 40])
    useEffect(function(){
        if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },[mapLat, mapLng])

    useEffect(() => {
        if(positionGeolocation) setMapPosition([
            positionGeolocation.lat,
            positionGeolocation.lng
        ])
    }, [positionGeolocation]);

    return (
        <div className={styles.mapContainer}>
            {
                <Button type={"position"} onClick={getPosition}>
                    {isLoadingPosition ? "Loading...": "Utilisez votre position"}
                </Button>
            }
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    cities.map((city)=>(
                        <Marker
                            position={[
                            city.position.lat,
                            city.position.lng
                        ]}
                            key={city.cityName}
                        >
                            <Popup>
                                {city.cityName}
                            </Popup>
                        </Marker>
                    ))
                }
                <ChangePosition position={mapPosition}/>
                <Click/>
            </MapContainer>
        </div>
    );
    function ChangePosition({position}){
        const map = useMap()
        map.setView(position)
        return null;
    }
    function Click(){
        const navigate = useNavigate()
        useMapEvents({
            click: (e) => {
                navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
            }
        })
    }
}

export default Map;