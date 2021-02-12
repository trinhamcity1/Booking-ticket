import React, { useContext, useEffect } from 'react';
import { FlightsContext } from '../context/FlightsContext';
import { useParams } from "react-router-dom";
import FlightFinder from '../apis/FlightFinder';
import Flight_leg from '../components/Flight_leg';
import Flight_leg0 from '../components/Flight_leg0';
import DetailFlights from '../components/DetailFlights';
const FlightDetailPage = () => {
    const {flight_id} = useParams()
    const {selectedFlight, setSelectedFlight} = useContext(FlightsContext)

    useEffect (() =>{
        const fetchData = async () => {

            try {

            const response = await FlightFinder.get(`/${flight_id}`);
            console.log(response);
            setSelectedFlight(response.data.data.flight);    
            } catch (error) {
                console.log(error)
            }
            
        };
        fetchData()
    }, []) ;
    return (
        <div>

            {selectedFlight && selectedFlight.flight_id}
            <DetailFlights/>
        </div>
    );
}

export default FlightDetailPage
