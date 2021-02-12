import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import FlightFinder from '../apis/FlightFinder';
// import { FlightsContext } from '../context/FlightsContext';
import axios from "axios";
import FlightFinder from '../apis/FlightFinder';
const CreateTicket = () => {
    const [flight_id, setFlightID] = useState("");
    let history = useHistory()
 
    const [passenger_name,setPassengerName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [ticket_booked, setTicketBooked] = useState("");
    const [ticket_no, setTicketNo] = useState("");
    const [book_ref, setBookRef] = useState("");
    const [passenger_id, setPassengerID] = useState("");
    useEffect(() =>{
        const fetchData = async() => {
            axios.get("http://localhost:3006/api/v1/getticket",
            {
                
                    ticket_no,
                    book_ref,
                    flight_id,
                    ticket_booked,
                
            }).then((response) => {
                let ticket = response;
                console.log(response);
                // setFlightResults(response.data.data);
                // setSearchResult(...searchResult, response.data.data[0].flight_id);
    setBookRef(response.data.data.getticket.book_ref);
    setTicketNo(response.data.data.getticket.ticket_no);
    setFlightID(response.data.data.getticket.flight_id);
    
            });

            // SetSeatsAvailable(response.data.data.flight.seats_available);

           
            

        };
        fetchData();
    },[]);
    
    // setBookRef(response.data.data.ticket.book_ref);
    // setTicketNo(response.data.data.ticket.ticket_no);
    // setFlightID(response.data.data.ticket.flight_id);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
            const response = await axios.post(`http://localhost:3006/api/v1/createpassenger`, {
                    passenger_name,
                    book_ref,
                    email,
                    phone,
                    passenger_id,

                
                }).then((response) => {
                    let ticket = response;
                    console.log(response);
                    // setFlightResults(response.data.data);
                    // setSearchResult(...searchResult, response.data.data[0].flight_id);

        setPassengerID(response.data.data.createpassenger.passenger_id);
                // history.push(`/createticket`);
            console.log(response);
        
        });

        // SetSeatsAvailable(response.data.data.flight.seats_available);

       
        

    };
        
    const handleSubmit1 = async (e) => {
        e.preventDefault()
        
 
                history.push(`/addpayment`);

        
            
        };
    //     useEffect(() =>{
    //     const fetchData = async() => {
    //         axios.get("http://localhost:3006/api/v1/getpassengerid",
    //         {
                
    //         passenger_id
                
    //         }).then((response) => {
    //             let ticket = response;
    //             console.log(response);
    //             // setFlightResults(response.data.data);
    //             // setSearchResult(...searchResult, response.data.data[0].flight_id);
    // setBookRef(response.data.data.createpassenger.book_ref);
    // setPassengerID(response.data.data.createpassenger.passenger_id);
    
    //         });

    //         // SetSeatsAvailable(response.data.data.flight.seats_available);

           
            

    //     };
    //     fetchData();
    // },[]);

    return (
        <div>
            <h3 class="display-4"><b>Enter your information</b></h3>
            <h4 class="display-4"><small class="muted">Please fill all of the boxes prior to proceed</small></h4>
            <div className="list-group">



                <div>
        
            {/* <h2>Flight ID: {flights[0].flight_id}</h2>
            <h3>Departure from: {flights[0].departure_airport}</h3>
            <h3>Arrive to: {flights[0].arrival_airport}</h3>
            <h4>Scheduled departure time: {flights[0].scheduled_departure}</h4>
            <h4>Scheduled time arrive at the destination: {flights[0].scheduled_arrival}</h4>
            <h4>Seats avaiable: {flights[0].seats_available}</h4> */}

            <form action="">
            <div className ="form-group">
                    <label htmlFor="book_ref">This will be your booking reference. <small>Please do not lose it</small></label>
                    <input disabled value={book_ref} onChange={e => setBookRef(e.target.value)} id="book_ref" className="form-control" type="text"/>
                    
                </div>
                <div className ="form-group">
                    <label htmlFor="passenger_id">Your Passenger ID will be generated. <small>Please fill all of the boxes below</small></label>
                    <input disabled value={passenger_id} onChange={e => setPassengerID(e.target.value)} id="passenger_id" className="form-control" type="text"/>
                    
                </div>
                <div className ="form-group">
                    <label htmlFor="flight_id">Please enter your FULL NAME. <small>First name + Last name</small></label>
                    <input value={passenger_name} onChange={e => setPassengerName(e.target.value)} id="passenger_name" className="form-control" type="text"/>
                    
                </div>
                <div className ="form-group">
                    <label htmlFor="phone">phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} id="phone" className="form-control" type="number"/>
                </div>

                <div className ="form-group">
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} id="email" className="form-control" type="text"/>
                </div>


                <button type="submit" onClick={handleSubmit} className="btn btn-primary"><b>Press to generate the Passenger ID</b></button>
                                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Your Booking Reference</th>
                            <th scope="col">Your ticket number</th>
                            <th scope="col">The Flight ID</th>


                            {/* <th scope="col">Buy</th>
                            <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={book_ref}>
                            <td>{book_ref}</td>
                            <td>{ticket_no}</td>
                            <td>{flight_id}</td>



 
                            {/* <td><button onClick={()=> handleUpdate(flight_id)} className="btn btn-warning">Update</button></td> */}
                        </tr>
                        
                    </tbody>
                </table>

                <table className="table table-dark">
                    <thead>
                        <tr><th scope="col">Your Passenger ID</th>
                            <th scope="col">Your Full Name</th>
                            <th scope="col">Your Phone Number</th>
                            <th scope="col">Your Email</th>


                            {/* <th scope="col">Buy</th>
                            <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={passenger_id}>
                            <td>{passenger_id}</td>
                            <td>{passenger_name}</td>
                            <td>{phone}</td>
                            <td>{email}</td>

 
                            {/* <td><button onClick={()=> handleUpdate(flight_id)} className="btn btn-warning">Update</button></td> */}
                        </tr>
                        
                    </tbody>
                </table>

            </form>
            <div> 
                
            </div>
            <button type="submit" onClick={handleSubmit1} className="btn btn-danger"><b>Proceed to payment</b></button>
            <h4>Please take a screenshoot of your Ticket</h4>
        </div>
            </div>
        </div>
    )
}

export default CreateTicket
