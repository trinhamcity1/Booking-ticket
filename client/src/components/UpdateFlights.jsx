import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FlightFinder from '../apis/FlightFinder';
import { FlightsContext } from '../context/FlightsContext';

const UpdateFlights = (props) => {
    const {flights, setFlights} = useContext(FlightsContext);

    const {flight_id} = useParams();
    
    let history = useHistory();
    const [seats_available, SetSeatsAvailable] = useState("");
    const [seats_booked, SetSeatsBooked] = useState("");
    const [flight_no, SetFlightNumber] = useState("");
    const [scheduled_departure, SetScheduledDeparture] = useState("")
    const [scheduled_arrival, SetScheduledArrival] = useState("");
    const [departure_airport, SetDepartureAirport] = useState("");
    const [arrival_airport, SetArrivalAirport] = useState("");
    const [a, setA] = useState("");
    const [book_ref, SetBookRef] = useState("");

    //console.log(flight_id);

    useEffect(() =>{
        const fetchData = async() => {
            const response = await FlightFinder.get(`/${flight_id}`);
            console.log(response.data.data);
            // SetSeatsBooked(response.data.data.flight.seats_booked);
            setA(response.data.data.flight.seats_available);
            SetFlightNumber(response.data.data.flight.flight_no);
            SetScheduledDeparture(response.data.data.flight.scheduled_departure);
            SetScheduledArrival(response.data.data.flight.scheduled_arrival);
            SetDepartureAirport(response.data.data.flight.departure_airport);
            SetArrivalAirport(response.data.data.flight.arrival_airport);
            // SetBookRef
            

            

        };
        fetchData();
    },[]);

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const updatedFlights = await FlightFinder.put(`/${flight_id}`, {
            seats_available, book_ref,
        });
        history.push(`/createbooking`);

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
                    <label htmlFor=""><b>Please Remember your flight ID. You will be asked prior to purchase a ticket in order to prove yourself are not robot.</b></label>
                    
                </div>
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
                    <label htmlFor="seats_available">Number of tickets avaiable.</label>
                    <input disabled value={a} onChange={e => setA(e.target.value)} id="seats_available" className="form-control" type="number"/>
                </div>
                <div className ="form-group">
                    <label >Base Price:</label>
                    <input placeholder ="$225.00"disabled id="seats_available" className="form-control" type="number"/>
                </div>
                <div className ="form-group">
                    <label htmlFor="seats_available"><b>Choose an available booking refernce and Click Buy to Buy 1 ticket</b></label>
                    
                </div>

                {/* <div className ="form-group">
                    <label htmlFor="seats_available">Number of ticket you want to buy</label>
                    <input value={seats_available} onChange={e => SetSeatsAvailable(e.target.value)} id="seats_available" className="form-control" type="number"/>
                </div> */}
                    {/* <select value={book_ref} onChange = {(e) => SetBookRef(e.target.value)} className="custom-select my-1 mr-sm-2">
                            <option disabled>available booking reference to select</option>
                            <option value="abc1">abc1</option>
                            <option value="abc2">abc2</option>
                            <option value="abc3">abc3</option>
                            <option value="abc4">abc4</option>
                            <option value="abc5">abc5</option>
                    </select> */}
                <button type="submit" onClick={handleSubmit} className="btn btn-primary"><b>BUY</b></button>
            </form>
        </div>
        
    )
}

export default UpdateFlights
