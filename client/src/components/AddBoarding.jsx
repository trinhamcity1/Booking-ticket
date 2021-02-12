import React, {useContext, useEffect, useState} from 'react';

import { useParams, useHistory } from 'react-router-dom';
// import FlightFinder from '../apis/FlightFinder';
// import { FlightsContext } from '../context/FlightsContext';
import axios from "axios";
const AddBoarding = () => {
    const [flight_id, setFlightID] = useState("");
    let history = useHistory()
    const [scheduled_departure, setScheduledDeparture] = useState("");
    const [passenger_name,setPassengerName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [ticket_booked, setTicketBooked] = useState("");
    const [ticket_no, setTicketNo] = useState("");
    const [book_ref, setBookRef] = useState("");
    const [passenger_id, setPassengerID] = useState("");
    const [boarding_no, setBoardingNo] = useState("");
    const [gate,setGate] = useState("");
    const [checked_bags,setCheckedBags] = useState("");
    const [claim_gate,setClaimGate] = useState("");
    const [claim_no,setClaimNo] = useState("");

    useEffect(() =>{
        const fetchData = async() => {
            
            axios.get("http://localhost:3006/api/v1/getticket",
            {
                
                    ticket_no,
                    book_ref,
                    flight_id,
                    ticket_booked,
                    scheduled_departure,
                
            }).then((response) => {
                let ticket = response;
                console.log(response);
    setTicketNo(response.data.data.getticket.ticket_no);
    setFlightID(response.data.data.getticket.flight_id);
    setBookRef(response.data.data.getticket.book_ref);
    
            });
        };
        fetchData();
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault()
            
            const response = await axios.post("http://localhost:3006/api/v1/addboarding",
            {

                    ticket_no,
                    scheduled_departure,
                    flight_id,
                    

                
            }).then((response) => {
                let ticket = response;
                console.log(response);
    setBoardingNo(response.data.data.addboarding.boarding_no);
    setFlightID(response.data.data.addboarding.flight_id);
    setGate(response.data.data.addboarding.gate);
    setCheckedBags(response.data.data.addboarding.checked_bags);
    setClaimNo(response.data.data.addbaggage.claim_no);
    setClaimGate(response.data.data.addbaggage.claim_gate);

});
};
const handleSubmit1 = async (e) => {
    e.preventDefault()
    try {
        history.push(`/`);
    } catch (error) {
        
    }
}
    return (
        <div>
            <h2>Transaction Approved!</h2>
<form>
            <table className="table table-dark">
                    <thead>
                        <tr><th scope="col">Your ticket number</th>
                            <th scope="col">Your booking reference</th>
                            <th scope="col">Your Flight ID</th>



                            {/* <th scope="col">Buy</th>
                            <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={ticket_no}>
                        <td> <input disabled value={ticket_no} onChange = {(e) => setTicketNo(e.target.value)} type="text" className="form-control" placeholder="PassengerID"/></td>
                            <td>{book_ref}</td>
                            <td> <input disabled value={flight_id} onChange = {(e) => setFlightID(e.target.value)} type="text" className="form-control" placeholder="PassengerID"/></td>



 
                            {/* <td><button onClick={()=> handleUpdate(flight_id)} className="btn btn-warning">Update</button></td> */}
                        </tr>
                        
                    </tbody>
                </table>

            <table className="table table-dark">
                    <thead>
                        <tr><th scope="col">Your boarding number:</th>
                            <th scope="col">Your boarding gate:</th>
                            <th scope="col">Your boarding time:</th>
                            <th scope="col">Your checked bags:</th>



                            {/* <th scope="col">Buy</th>
                            <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={ticket_no}>
                            <td> <input disabled value={boarding_no} onChange = {(e) => setPassengerID(e.target.value)} type="text" className="form-control" placeholder=""/></td>
                            <td> <input disabled value={gate} onChange = {(e) => setPassengerID(e.target.value)} type="text" className="form-control" placeholder=""/></td>
                            <td> <input disabled value={"2020-12-14 15:50:00+03"} type="text" className="form-control" placeholder="PassengerID"/></td>
                            <td> <input disabled value={checked_bags} onChange = {(e) => setCheckedBags(e.target.value)} type="number" className="form-control" placeholder=""/></td>



 
                            
                        </tr>
                        
                    </tbody>
                </table>

                <table className="table table-dark">
                    <thead>
                        <tr><th scope="col">Your Claim Gate:</th>
                            <th scope="col">Your Claim number:</th>





                        </tr>
                    </thead>
                    <tbody>

                        <tr key={ticket_no}>
                            <td> <input disabled value={claim_gate} onChange = {(e) => setPassengerID(e.target.value)} type="text" className="form-control" placeholder=""/></td>
                            <td> <input disabled value={claim_no} onChange = {(e) => setPassengerID(e.target.value)} type="text" className="form-control" placeholder=""/></td>

 
                            
                        </tr>
                        
                    </tbody>
                </table>
                
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Show The Information</button>
                <div><button onClick={handleSubmit1} type="submit" className="btn btn-danger">Go to home page</button></div>
                </form>
        </div>
    )
}

export default AddBoarding
