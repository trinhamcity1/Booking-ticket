import React, { useEffect, useState} from 'react';

import { useHistory } from 'react-router-dom';
import axios from "axios";
const CheckBookReference = () => {

    const [book_ref, setBookRef] = useState("");
    const [passenger_name, setPassengerName] = useState("");
    const [passenger_id, setPassengerID] = useState("");
    const [card_number, setCardNumber] = useState("");
    const [taxes, setTaxes] = useState("");
    const [discounts, setDiscounts] = useState("");
    const [flight_id, setFlightID] = useState("");
    const [ticket_no, setTicketNo] = useState("");
    const [book_date, setBookDate] = useState("");
    const [total_amount, setTotalAmount] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            // const response = await SearchFinder.get("/");
            // const parseResponse = await response.json();
            // console.log(parseResponse);
            const response = await axios.get("http://localhost:3006/api/v1/getbookref", {
                params: {
                    book_ref
                    
                }
            }).then((response) => {

                console.log(response);
                setBookRef(response.data.data.bookings.book_ref)
                setTicketNo(response.data.data.ticket.ticket_no);
                setFlightID(response.data.data.ticket.flight_id);
                setPassengerID(response.data.data.passengerid.passenger_id);
                setPassengerName(response.data.data.passengerid.passenger_name);
                setPhone(response.data.data.passengerid.phone);
                setEmail(response.data.data.passengerid.email);

            });

        } catch (err) {

        }

    }

    
    return (
        <div>
        <h4>Enter your booking reference.</h4>
            <form action="" onSubmit={onSubmitForm}>
                <div className="form-row">
                    <div className='col'>
                        <input
                            type="text"
                            
                            placeholder="Enter your booking reference ... like 730249907"
                            className="form-control"
                            value={book_ref}
                            onChange={e => setBookRef(e.target.value)}
                        />
                    </div>
                   
                    <button
                        className="btn btn-success">Search</button>

                </div>
            </form>
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
        </div>
    )
}

export default CheckBookReference
