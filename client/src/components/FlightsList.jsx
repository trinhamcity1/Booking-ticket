import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import FlightFinder from "../apis/FlightFinder"
import { FlightsContext } from '../context/FlightsContext';

const FlightsList = (props) => {
    const {flights, setFlights}= useContext(FlightsContext);
    let history = useHistory()

    useEffect(() =>{
        const fetchData = async () =>{
          try{
            const response = await FlightFinder.get("/");
            setFlights(response.data.data.flights);
        } catch (err) {}    
        };


      fetchData();

    },[]);


    // const handleUpdate = (e,flight_id)=>{
    //     e.stopPropagation()
    //     history.push(`/flights/${flight_id}/update`)
    // };

    const handleFlightSelect = (flight_id)=>{
        history.push(`/flights/${flight_id}`);
    };
    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Flight ID</th>
                        <th scope="col">Departure airport</th>
                        <th scope="col">Arrival airport</th>
                        <th scope="col">Type</th>
                        <th scope="col">Seats available</th>
                        {/* <th scope="col">Buy</th>
                        <th scope="col">Delete</th> */}
                    </tr>
                </thead>
                <tbody>
                {flights && flights.map(flight => {
                    return (
                        <tr onClick={() => handleFlightSelect(flight.flight_id)}key ={flight.flight_id}>
                            <td>{flight.flight_id}</td>
                            <td>{flight.departure_airport}</td>
                            <td>{flight.arrival_airport}</td>
                            <td>{flight.type}</td>
                            <td>{flight.seats_available}</td>

                            {/* <td><button onClick={(e)=> handleUpdate(e, flight.flight_id)} className="btn btn-warning">Update</button></td>
                            <td><button className="btn btn-danger">Delete</button></td> */}
                        </tr>
                    );
                        
                    })}
                    {/* <tr>
                        <td>1001</td>
                        <td>12312</td>
                        <td>3232323</td>
                        <td>2323223</td>
                        <td>ASD</td>
                        <td>DSA</td>
                        <td>YEAS</td>
                        <td>CDSA</td>
                        <td>50</td>
                        <td>0</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default FlightsList
