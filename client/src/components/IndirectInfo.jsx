import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FlightFinder from '../apis/FlightFinder';
import { FlightsContext } from '../context/FlightsContext';

const IndirectInfo = (props) => {
    const {flight_leg0, setFlightLeg0} = useContext(FlightsContext);

    const {flight_id} = useParams();
    
    let history = useHistory();
    const [seats_available, SetSeatsAvailable] = useState("");

    const [leg_no, SetLegNo] = useState("");

    const [departure_airport0, SetDepartureAirport0] = useState("");
    const [arrival_airport0, SetArrivalAirport0] = useState("");
    const [departure_airport1, SetDepartureAirport1] = useState("");
    const [arrival_airport1, SetArrivalAirport1] = useState("");
    const [scheduled_departure1, SetScheduledDeparture1] = useState("")
    const [scheduled_arrival1, SetScheduledArrival1] = useState("");
    const [scheduled_departure0, SetScheduledDeparture0] = useState("")
    const [scheduled_arrival0, SetScheduledArrival0] = useState("");

    //console.log(flight_id);

    useEffect(() =>{
        const fetchData = async() => {
            const response = await FlightFinder.get(`/${flight_id}/indirect`);
            console.log(response.data.data);
            // SetSeatsBooked(response.data.data.flight.seats_booked);

            SetLegNo(response.data.data.flight_leg0.leg_no);

            SetDepartureAirport0(response.data.data.flight_leg0.departure_airport);

            SetArrivalAirport0(response.data.data.flight_leg0.arrival_airport);

            SetScheduledDeparture0(response.data.data.flight_leg0.scheduled_departure);

            SetScheduledArrival0(response.data.data.flight_leg0.scheduled_arrival);

            SetDepartureAirport1(response.data.data.flight_leg1.departure_airport);

            SetArrivalAirport1(response.data.data.flight_leg1.arrival_airport);

            SetScheduledDeparture1(response.data.data.flight_leg1.scheduled_departure);

            SetScheduledArrival1(response.data.data.flight_leg1.scheduled_arrival);
            

        };
        fetchData();
    },[]);

    // const handleSubmit = async(e) =>{
    //     e.preventDefault()
    //     const updatedFlights = await FlightFinder.put(`/${flight_id}`, {
    //         seats_booked,
    //     });
    //     history.push("/");

    // };

    const handleUpdate = (e,flight_id)=>{
        e.stopPropagation()
        history.push(`/flights/${flight_id}/update`)
    };
    return (
        
        <div>
        <h1>This flight is an <b>INDIRECT</b> flight</h1>
            {/* <h2>Flight ID: {flights[0].flight_id}</h2>
            <h3>Departure from: {flights[0].departure_airport}</h3>
            <h3>Arrive to: {flights[0].arrival_airport}</h3>
            <h4>Scheduled departure time: {flights[0].scheduled_departure}</h4>
            <h4>Scheduled time arrive at the destination: {flights[0].scheduled_arrival}</h4>
            <h4>Seats avaiable: {flights[0].seats_available}</h4> */}

            <form action="">
                <div className ="form-group">
                    <label htmlFor="leg_no">leg ID</label>
                    <input disabled value={leg_no} onChange={e => SetLegNo(e.target.value)} id="leg_no" className="form-control" type="number"/>
                    
                </div>
                <div className ="form-group">
                    <label htmlFor="departure_airport0">Departure airport</label>
                    <input disabled value={departure_airport0} onChange={e => SetDepartureAirport0(e.target.value)} id="departure_airport0" className="form-control" type="text"/>
                </div>

                <div className ="form-group">
                    <label htmlFor="arrival_airport0">Final Arrival airport</label>
                    <input disabled value={arrival_airport1} onChange={e => SetArrivalAirport1(e.target.value)} id="arrival_airport0" className="form-control" type="text"/>
                </div>

                {/* <div className ="form-group">
                    <label htmlFor="seats_booked">Number of tickets have been bought</label>
                    <input disabled value={seats_booked} onChange={e => SetSeatsBooked(e.target.value)} id="seats_booked" className="form-control" type="number"/>
                </div> */}


                {/* <div className ="form-group">
                    <label htmlFor="seats_available">Number of ticket you want to buy</label>
                    <input value={seats_available} onChange={e => SetSeatsAvailable(e.target.value)} id="seats_available" className="form-control" type="number"/>
                </div> */}
                {/* <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button> */}
            </form>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Flight ID</th>
                            <th scope="col">Leg number</th>
                            <th scope="col">Departure airport</th>
                            <th scope="col">Arrival airport</th>
                            <th scope="col">Scheduled departure time</th>
                            <th scope="col">Scheduled arrival time</th>

                            {/* <th scope="col">Buy</th>
                            <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={flight_id}>
                            <td>{flight_id}</td>
                            <td>{leg_no}</td>
                            <td>{departure_airport0}</td>
                            <td>{arrival_airport0}</td>
                            <td>{scheduled_departure0}</td>
                            <td>{scheduled_arrival0}</td>

 
                            {/* <td><button onClick={()=> handleUpdate(flight_id)} className="btn btn-warning">Update</button></td> */}
                        </tr>
                        <tr key={flight_id}>
                            <td>{flight_id}</td>
                            <td>{leg_no}</td>
                            <td>{departure_airport1}</td>
                            <td>{arrival_airport1}</td>
                            <td>{scheduled_departure1}</td>
                            <td>{scheduled_arrival1}</td>

 
                            {/* <td><button onClick={()=> handleUpdate(flight_id)} className="btn btn-warning">Update</button></td> */}
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            
            <button onClick={(e)=> handleUpdate(e,flight_id)} className="btn btn-warning">Click here to continue to book this ticket</button>


        </div>
        

        
    )
}

export default IndirectInfo
