import React, {useContext, useEffect, useState} from 'react';

import { useParams, useHistory } from 'react-router-dom';
// import FlightFinder from '../apis/FlightFinder';
// import { FlightsContext } from '../context/FlightsContext';
import axios from "axios";
const CheckBookRef = () => {
    let history = useHistory()
 

    const [flight_id, setFlightID] = useState("");

    const [departure_airport, setDeparture_airport] = useState("");
    const [arrival_airport, setArrival_airport] = useState("");
    const [type, setType] = useState("");
    const [seats_available, setSeatsAvailable] = useState("");
    const [book_ref, setBookRef] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            history.push(`/checkbookreference`);
        } catch (error) {
            
        }
    }
    return (
        <div>
            <h4>If you already have a ticket, click here to check it.</h4>
            <form>

                    <button type="submit" onClick={handleSubmit} className="btn btn-danger"><b>Click to check your ticket</b></button>
        </form></div>
    )
}

export default CheckBookRef
