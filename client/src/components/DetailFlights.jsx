import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FlightFinder from '../apis/FlightFinder';
import { FlightsContext } from '../context/FlightsContext';

const DetailFlights = (props) => {
    const {flights, setFlights} = useContext(FlightsContext);

    const {flight_id} = useParams();
    
    let history = useHistory();
    const [seats_available, SetSeatsAvailable] = useState("");
    const [seats_booked, SetSeatsBooked] = useState("");
    // const [flight_no, SetFlightNumber] = useState("");
    const [scheduled_departure, SetScheduledDeparture] = useState("")
    const [scheduled_arrival, SetScheduledArrival] = useState("");
    const [departure_airport, SetDepartureAirport] = useState("");
    const [arrival_airport, SetArrivalAirport] = useState("");
    const [type, SetType] = useState("");
    const [movie, SetMovie] = useState("");
    const [meal, SetMeal] = useState("");
    const [internet, SetInternet] = useState("");

    //console.log(flight_id);

    useEffect(() =>{
        const fetchData = async() => {
            const response = await FlightFinder.get(`/${flight_id}`);
            console.log(response.data.data);
            // SetSeatsBooked(response.data.data.flight.seats_booked);
            SetSeatsAvailable(response.data.data.flight.seats_available);
            // SetFlightNumber(response.data.data.flight.flight_no);
            SetScheduledDeparture(response.data.data.flight.scheduled_departure);
            SetScheduledArrival(response.data.data.flight.scheduled_arrival);
            SetDepartureAirport(response.data.data.flight.departure_airport);
            SetArrivalAirport(response.data.data.flight.arrival_airport);
            SetType(response.data.data.flight.type);
            SetMovie(response.data.data.flight_info.movie);
            SetMeal(response.data.data.flight_info.meal);
            SetInternet(response.data.data.flight_info.internet);
            

            

        };
        fetchData();
    },[]);


    const handleDirect = (e,flight_id)=>{
        e.stopPropagation()
        history.push(`/flights/${flight_id}/direct`)
    };

    const handleIndirect = (e,flight_id)=>{
        e.stopPropagation()
        history.push(`/flights/${flight_id}/indirect`)
    };
    
    return (
        
        <div>
        
            {/* <h2>Flight ID: {flights[0].flight_id}</h2>
            <h3>Departure from: {flights[0].departure_airport}</h3>
            <h3>Arrive to: {flights[0].arrival_airport}</h3>
            <h4>Scheduled departure time: {flights[0].scheduled_departure}</h4>
            <h4>Scheduled time arrive at the destination: {flights[0].scheduled_arrival}</h4>
            <h4>Seats avaiable: {flights[0].seats_available}</h4> */}

            <form action="">
                <div className ="form-group">
                    <label htmlFor="flight_id">Flight ID</label>
                    <input disabled value={flight_id} onChange={e => flight_id(e.target.value)} id="flight_id" className="form-control" type="number"/>
                    
                </div>
                <div className ="form-group">
                    <label htmlFor="departure_airport">Departure airport</label>
                    <input disabled value={departure_airport} onChange={e => SetDepartureAirport(e.target.value)} id="departure_airport" className="form-control" type="text"/>
                </div>

                <div className ="form-group">
                    <label htmlFor="arrival_airport">Arrival airport</label>
                    <input disabled value={arrival_airport} onChange={e => SetArrivalAirport(e.target.value)} id="arrival_airport" className="form-control" type="text"/>
                </div>

                {/* <div className ="form-group">
                    <label htmlFor="seats_booked">Number of tickets have been bought</label>
                    <input disabled value={seats_booked} onChange={e => SetSeatsBooked(e.target.value)} id="seats_booked" className="form-control" type="number"/>
                </div> */}

                <div className ="form-group">
                    <label htmlFor="seats_available">Number of tickets available to buy</label>
                    <input disabled value={seats_available} onChange={e => SetSeatsAvailable(e.target.value)} id="seats_available" className="form-control" type="number"/>
                </div>
                <div className ="form-group">
                    <label htmlFor="movie">Movie provided</label>
                    <input disabled value={movie} onChange={e => SetMovie(e.target.value)} id="movie" className="form-control" type="text"/>
                </div>
                <div className ="form-group">
                    <label htmlFor="movie">Meal provided</label>
                    <input disabled value={meal} onChange={e => SetMeal(e.target.value)} id="meal" className="form-control" type="text"/>
                </div>
                <div className ="form-group">
                    <label htmlFor="internet">Internet availability</label>
                    <input disabled value={internet} onChange={e => SetInternet(e.target.value)} id="seats_available" className="form-control" type="text"/>
                </div>

                <div className ="form-group">
                    <label htmlFor="type">Type of the flight</label>
                    <input disabled value={type} onChange={e => SetType(e.target.value)} id="type" className="form-control" type="text"/>
                </div>

                {/* <div className ="form-group">
                    <label htmlFor="seats_available">Number of ticket you want to buy</label>
                    <input value={seats_available} onChange={e => SetSeatsAvailable(e.target.value)} id="seats_available" className="form-control" type="number"/>
                </div> */}
                <button onClick={(e)=> handleDirect(e, flight_id)} className="btn btn-warning">If the flight is <b>DIRECT</b> click here for more info</button><button onClick={(e)=> handleIndirect(e, flight_id)} className="btn btn-danger">If the flight is <b>INDIRECT</b> click here for more info</button>

            </form>
        </div>
        
    )
}

export default DetailFlights
