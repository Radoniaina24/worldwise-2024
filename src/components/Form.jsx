
import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import {useNavigate, useSearchParams} from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import axios from "axios";
import Message from "./Message";
import Spinner from "./Spinner";
import {useCities} from "../context/contextCities";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const {createCity, isLoading} = useCities()
  const navigate = useNavigate()
  const [isLoadingGeocode, setIsLoadingGeocode]=useState(false)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlLocation()
  const [emoji, setEmoji] = useState("")
    const [geocodingError, setGeocodingError] = useState("")
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
    useEffect(function(){
        async function fetchCityData(){
            if(!lat && !lng) return;
            try{
                setIsLoadingGeocode(true)
                setGeocodingError("")
                const res = await axios.get(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.data
                if(!data.countryCode){
                    throw new Error("Il n’a pas l’air d’être une ville. Cliquez ailleurs")
                }
                setCityName(data.city ||data.locality || "")
                setCountry(data.countryName)
                setEmoji(convertToEmoji(data.countryCode))
                setIsLoadingGeocode(false)

            }catch (err){
               setGeocodingError(err.message)
            }
            finally {
                setIsLoadingGeocode(false)
            }
        }
        fetchCityData()
    }, [lat, lng]);
  async function handleSubmit(e){
      e.preventDefault()
      if(!cityName || !date) return;
      const newCity = {
          cityName,
          country,
          emoji,
          date,
          notes,
          "position": {lat, lng},
      }
      await createCity(newCity)
      navigate('/app/cities')
  }
  if(isLoadingGeocode) return <Spinner/>
  if(!lat && !lng) return <Message message="Commencez par cliquer quelque part sur la carte"/>
  if(geocodingError) return <Message message={geocodingError}/>
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">Nom de la ville</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Quand êtes-vous allé à  {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/Y"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes sur votre voyage à {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
          <Button type={"primary"}>
              Add
          </Button>
        <Button
            type={"back"}
            onClick={(e)=>{
                e.preventDefault();
                navigate(-1);
            }}
        >
            &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
