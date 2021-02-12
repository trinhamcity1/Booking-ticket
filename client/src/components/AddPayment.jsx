import React, {useContext, useEffect, useState} from 'react';

import { useParams, useHistory } from 'react-router-dom';
// import FlightFinder from '../apis/FlightFinder';
// import { FlightsContext } from '../context/FlightsContext';
import axios from "axios";
const AddPayment = () => {
    let history = useHistory()
    const [passenger_name, setPassengerName] = useState("");
    const [passenger_id, setPassengerID] = useState("");
    const [card_number, setCardNumber] = useState("");
    const [taxes, setTaxes] = useState("");
    const [discounts, setDiscounts] = useState("");
    useEffect(() =>{
        const fetchData = async() => {
            axios.get("http://localhost:3006/api/v1/getpassengerid",
            {
                
            passenger_id,
            passenger_name,
                
            }).then((response) => {
                let ticket = response;
                console.log(response);
                // setFlightResults(response.data.data);
                // setSearchResult(...searchResult, response.data.data[0].flight_id);
    setPassengerID(response.data.data.createpassenger.passenger_id);
    setCardNumber(response.data.data.createpassenger.card_number);
    setPassengerName(response.data.data.createpassenger.passenger_name);
    
            });

            // SetSeatsAvailable(response.data.data.flight.seats_available);

           
            

        };
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3006/api/v1/addpayment`, {
                passenger_id,
                card_number,
                taxes,
                discounts,

            });

            console.log(response);
            history.push(`/addboarding`);

        } catch (error) {
            
        }
    }
    return (
        <div>
                        <h2><b>Enter your payment information</b></h2>

        <div className="mb-4">
            <form action="">
            
                    <div className="col"><label htmlFor="book_ref">Your Passenger ID <small></small></label>
                        <input disabled value={passenger_id} onChange = {(e) => setPassengerID(e.target.value)} type="text" className="form-control" placeholder="PassengerID"/>
                    
                    </div>
                    <div className="col"><label htmlFor="book_ref">Your card number<small></small></label>
                        <input value={card_number} onChange = {(e) => setCardNumber(e.target.value)} type="text" className="form-control" placeholder="Please Enter your card number"/>
                    
                    </div>
                    <div className="col"><label htmlFor="book_ref">Your Name<small></small></label>
                        <input value={passenger_name} onChange = {(e) => setPassengerName(e.target.value)} type="text" className="form-control" placeholder="Please Enter your card number"/>
                    
                    </div>
                    <div className="col"><label htmlFor="book_ref">Tax<small></small></label>
                        <input disabled  className ="form-control" type="text" placeholder="8.2%"/>
                    </div>
                    <div className="col"><label htmlFor="book_ref"><b>Special Discount</b> for <b>today</b> booking<small></small></label>
                        <input disabled  className ="form-control" type="text" placeholder="$10"/>
                    </div>
                    <div className="col">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Pay</button>
                    </div>
                    
                    
            </form>
        </div>
        </div>
    )
}

export default AddPayment
