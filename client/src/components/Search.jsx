import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";


const Search = () => {
    let history = useHistory()
 
    const [resultFlight] = useState("")
    const [flight_id, setFlightID] = useState("");

    const [departure_airport, setDeparture_airport] = useState("");
    const [arrival_airport, setArrival_airport] = useState("");
    const [type, setType] = useState("");
    const [seats_available, setSeatsAvailable] = useState("");





    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            // const response = await SearchFinder.get("/");
            // const parseResponse = await response.json();
            // console.log(parseResponse);
            const response = await axios.get("http://localhost:3006/api/v1/search", {
                params: {
                    departure_airport,
                    arrival_airport
                }
            }).then((response) => {
                let flight = response.data.data.flight;
                console.log(flight);
                // setFlightResults(response.data.data);
                // setSearchResult(...searchResult, response.data.data[0].flight_id);
                setFlightID(flight.flight_id);
                setDeparture_airport(flight.departure_airport);
                setArrival_airport(flight.arrival_airport);
                setType(flight.type);
                setSeatsAvailable(flight.seats_available);
                console.log(resultFlight);
            });

        } catch (err) {

        }

    }

    const handleFlightSelect = (flight_id)=>{
        history.push(`/flights/${flight_id}`);
    };
    return (
        
        <div className="mb-4">
            <h4>Enter the departure airport code And your wished destination airport code to search for a flight.</h4>
            <form action="" onSubmit={onSubmitForm}>
                <div className="form-row">
                    <div className='col'>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter departure airport... like HOU"
                            className="form-control"
                            value={departure_airport}
                            onChange={e => setDeparture_airport(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter arrival airport...like JFK"
                            className="form-control"
                            value={arrival_airport}
                            onChange={e => setArrival_airport(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-success">Search</button>

                </div>
            </form>



            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Flight ID</th>
                            <th scope="col">Departure airport</th>
                            <th scope="col">Arrival airport</th>
                            <th scope="col">Type</th>
                            <th scope="col">Seats available</th>

                        </tr>
                    </thead>
                    <tbody>

                    <tr onClick={() => handleFlightSelect(flight_id)}key ={flight_id}>
                            <td>{flight_id}</td>

                            <td>{departure_airport}</td>
                            <td>{arrival_airport}</td>
                            <td>{type}</td>
                            <td>{seats_available}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Search
