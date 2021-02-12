import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import FlightFinder from '../apis/FlightFinder';
// import { FlightsContext } from '../context/FlightsContext';
import axios from "axios";
import FlightFinder from '../apis/FlightFinder';


const CreateBooking = () => {

    const [flight_id, setFlightID] = useState("");
    let history = useHistory()
 


    const [ticket_no, setTicketNo] = useState("");
    const [book_ref, setBookRef] = useState("");
    const [book_date, setBookDate] = useState("");
    const [total_amount, setTotalAmount] = useState("");
    

    useEffect(() =>{
        const fetchData = async() =>{
          
            try {
                // const response = await SearchFinder.get("/");
                // const parseResponse = await response.json();
                // console.log(parseResponse);
                  axios.get(`http://localhost:3006/api/v1/createbooking`, {
                    
                        book_ref,
                        

                    
                }).then((response) => {
                    let flight = response;
                    console.log(response);
                    setBookRef(response.data.data.bookings.book_ref);
                    setBookDate(response.data.data.bookings.book_date);
                    setTotalAmount(response.data.data.bookings.total_amount);
                    // setTicketNo(response.data.data.ticket.ticket_no);
                });
    
            } catch (err) {
    
            }
    
        };
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
            const response = await axios.post(`http://localhost:3006/api/v1/createticket`, {
                
                    book_ref,
                    flight_id,
                
                });
                history.push(`/createticket`);
            console.log(response);
        
            
        };
    
    return (
        <div>

<div>
        <h1>Please add your <b>information</b> for the flight</h1>
            {/* <h2>Flight ID: {flights[0].flight_id}</h2>
            <h3>Departure from: {flights[0].departure_airport}</h3>
            <h3>Arrive to: {flights[0].arrival_airport}</h3>
            <h4>Scheduled departure time: {flights[0].scheduled_departure}</h4>
            <h4>Scheduled time arrive at the destination: {flights[0].scheduled_arrival}</h4>
            <h4>Seats avaiable: {flights[0].seats_available}</h4> */}


            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Your Booking Reference </th>
                            <th scope="col">Booked When</th>
                            <th scope="col">Base amount</th>

                            {/* <th scope="col">Buy</th>
                            <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={book_ref}>
                            <td>{book_ref}</td>
                            <td>{book_date}</td>
                            <td>{total_amount}</td>


 
                            {/* <td><button onClick={()=> handleUpdate(flight_id)} className="btn btn-warning">Update</button></td> */}
                        </tr>
                        
                    </tbody>
                </table> 

            </div>
            
            <form action="">
                <div className ="form-group">
                    <label htmlFor="flight_id">Please Re-Enter your Flight ID</label>
                    <input  value={flight_id} onChange={e => setFlightID(e.target.value)} id="flight_id" className="form-control" type="number"/>
                    
                </div>


                

             
                <button onClick={(e)=> handleSubmit(e,flight_id)}type="submit"  className="btn btn-primary"><b>BUY</b></button>
            </form>
            {/* <button onClick={(e)=> handleUpdate(e,flight_id)} className="btn btn-warning">Click here to continue to book this ticket</button> */}


        </div>
        

        </div>
    )
}

export default CreateBooking
