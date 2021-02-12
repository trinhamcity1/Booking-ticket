require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./db');
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use(cors());
app.use(express.json())
// get all flights
app.get("/api/v1/flights", async (req, res) => {
    try{
    const results = await db.query("select * from flights");
    
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            flights: results.rows,
            // flight_id: "1001",
            // flight_no: "PG0010",
            // scheduled_departure: "2020-11-10 00:50:00-06",
            // scheduled_arrival: "2020-11-10 05:55:00-06",
            // departure_airport: "HOU",
            // arrival_airport:"JFK",
            // status:"Scheduled",
            // aircraft_code: 773,
            // seats_available: 50,
            // seats_booked: 0,
        },
    
    });
    } catch(err) {
        console.log(err);

    }
   
});
// get one direct flights
app.get("/api/v1/flights/:flight_id/direct", async (req, res) => {
    console.log(req.params.flight_id);
    try{
    const flight = await db.query("select * from flights where flight_id = $1 and type = 'Direct'",[req.params.flight_id]);
    const flight_leg = await db.query("select * from flight_leg where flight_id = $1",[req.params.flight_id]);
    res.status(200).json({
        status: "success",
        data:{
            flight: flight.rows[0],
            flight_leg: flight_leg.rows[0],
            // flight_id: "1001",
            // flight_no: "PG0010",
            // scheduled_departure: "2020-11-10 00:50:00-06",
            // scheduled_arrival: "2020-11-10 05:55:00-06",
            // departure_airport: "HOU",
            // arrival_airport:"JFK",
            // status:"Scheduled",
            // aircraft_code: 773,
            // seats_available: 50,
            // seats_booked: 0,
        },
    
    });
    } catch(err) {
        console.log(err);

    }
   
});

// get one indirect flights
app.get("/api/v1/flights/:flight_id/indirect", async (req, res) => {
    console.log(req.params.flight_id);
    try{
    const flight = await db.query("select * from flights where flight_id = $1 and type = 'Indirect'",[req.params.flight_id]);
    const flight_leg = await db.query("select * from flight_leg where flight_id = $1",[req.params.flight_id]);
    res.status(200).json({
        status: "success",
        data:{
            flight: flight.rows[0],
            flight_leg0: flight_leg.rows[0],
            flight_leg1: flight_leg.rows[1],
            // flight_id: "1001",
            // flight_no: "PG0010",
            // scheduled_departure: "2020-11-10 00:50:00-06",
            // scheduled_arrival: "2020-11-10 05:55:00-06",
            // departure_airport: "HOU",
            // arrival_airport:"JFK",
            // status:"Scheduled",
            // aircraft_code: 773,
            // seats_available: 50,
            // seats_booked: 0,
        },
    
    });
    } catch(err) {
        console.log(err);

    }
   
});
// get all indirect flights
app.get("/api/v1/indirectflights", async (req, res) => {
    try{
    const results = await db.query("select * from flights where type = 'Indirect'");
    
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            flights: results.rows,
            // flight_id: "1001",
            // flight_no: "PG0010",
            // scheduled_departure: "2020-11-10 00:50:00-06",
            // scheduled_arrival: "2020-11-10 05:55:00-06",
            // departure_airport: "HOU",
            // arrival_airport:"JFK",
            // status:"Scheduled",
            // aircraft_code: 773,
            // seats_available: 50,
            // seats_booked: 0,
        },
    
    });
    } catch(err) {
        console.log(err);

    }
   
});

app.get("/api/v1/bookings", async (req, res) => {
    try{
    const results = await db.query("select * from bookings");
    
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            bookings: results.rows,
            // flight_id: "1001",
            // flight_no: "PG0010",
            // scheduled_departure: "2020-11-10 00:50:00-06",
            // scheduled_arrival: "2020-11-10 05:55:00-06",
            // departure_airport: "HOU",
            // arrival_airport:"JFK",
            // status:"Scheduled",
            // aircraft_code: 773,
            // seats_available: 50,
            // seats_booked: 0,
        },
    
    });
    } catch(err) {
        console.log(err);

    }
   
});
//Get a flight
app.get("/api/v1/flights/:flight_id", async (req, res) => {
    console.log(req.params.flight_id);
    try {
        const flights = await db.query("select * from flights where flight_id = $1", [req.params.flight_id]);
        //select * from restaurants where id = req.params.id

        const flight_leg = await db.query("select * from flight_leg where flight_id = $1", [req.params.flight_id]);
        //select * from restaurants where id = req.params.id
        const flight_info = await db.query("select * from flight_info where flight_id = $1", [req.params.flight_id]);
        console.log(flight_leg.rows)
        res.status(200).json({
        status: "success",
        data:{ 
            flight: flights.rows[0],
            flight_leg: flight_leg,
            flight_info: flight_info.rows[0],
            // flight_leg1: flight_leg.rows[1],

        }, 
    });
    } catch (err) {
        console.log(err)

    }

 
});
 //Create a Flight need to fix 
app.post("/api/v1/flights", async (req, res) => {
    console.log(req.body);
    try{
        const results = await db.query(
            "INSERT INTO flights (flight_id, flight_no, scheduled_departure, scheduled_arrival, departure_airport, arrival_airport, status, aircraft_code, seats_available, seats_booked) values ($1, $2, '2020-11-10 00:50:00-06' ,'2020-11-10 05:55:00-06', $3, $4, $5, $6, $7, $8)",[req.params.flight_id, req.body.flight_no, req.body.departure_airport, req.body.arrival_airport, req.body.status, req.body.aircraft_code, req.body.seats_available, req.body.seats_booked]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                flight_id: 1010,
            },

        });
    } catch (err) {
    console.log(err);
    }
    
});

// Update flights

// app.put("/api/v1/flights/:flight_id", async (req, res) =>{
//     try{
//         const results = await db.query(
//             //"update flights SET seats_available = $1, seats_booked = $2 where flight_id = $3 returning *", 
//             //[req.body.seats_available, req.body.seats_booked, req.params.flight_id]

//             "update flights Set seats_available = seats_available - $1, seats_booked = seats_booked + $1 WHERE flight_id = $2 returning * ;",
//             [req.body.seats_booked, req.params.flight_id],
            
            
//         );
//                 const results2 = await db.query(


//             "insert into passenger_info  (passenger_id, passenger_name) values (1, 'Tri Nham' ) returning * ;",
            
            
//         );
//         const results1 = await db.query(
//             //"update flights SET seats_available = $1, seats_booked = $2 where flight_id = $3 returning *", 
//             //[req.body.seats_available, req.body.seats_booked, req.params.flight_id]

//             "insert into bookings  (passenger_id, number_of_tickets, flights_id) values (1, $1 ,$2) returning * ;",
//             [req.body.seats_booked, req.params.flight_id]
            
//         );

//         res.status(200).json({
//                 status: "success",
//                 data:{
//                     flight_id: results.rows[0],
//                     book_ref: results1.rows[0],
//                     passenger_id: results2.rows[0],
//                 },
//     });
    
//     } catch (err) {
//         console.log(err);
//     }
//     console.log(req.params.flight_id);
//     console.log(req.body);
    
// });

//buy ticket on 1 flight
app.put("/api/v1/flights/:flight_id", async (req, res) =>{
    
    try{
        const flights = await db.query(
            //"update flights SET seats_available = $1, seats_booked = $2 where flight_id = $3 returning *", 
            //[req.body.seats_available, req.body.seats_booked, req.params.flight_id]

            "update flights Set seats_available = seats_available - 1 WHERE flight_id = $1 returning * ;",
            [req.params.flight_id],
            
            
        );
        const book_ref = await db.query(
            "insert into bookings (book_ref, book_date, waitlist, total_amount) values ((random () * (999999999+1+ 1) + 1):: int, current_timestamp, 'no', 225.00) returning *;",  
        );




        // const passenger = await db.query(
        //     "INSERT INTO passenger_info (passenger_name, phone, email) values ($1, $2, $3);",
        //     [req.body.passenger_name, req.body.phone, req.body.email]);

        // const ticket = await db.query(
        //     //"update flights SET seats_available = $1, seats_booked = $2 where flight_id = $3 returning *", 
        //     //[req.body.seats_available, req.body.seatsbooked, req.params.flight_id]

        //     "insert into ticket (flight_id) values ($1) returning * ;",
        //     [req.params.flight_id]
            
        // );
        res.status(200).json({
                status: "success",
                data:{
                    
                    flights: flights.rows[0],
                    book_ref: book_ref.rows[0].book_ref,
                    
                    // passenger: passenger.rows[0],
                    // ticket: ticket.rows[0],

                },
    });
    
    } catch (err) {
        console.log(err);
    }
    console.log(req.params.flight_id);
    console.log(req.body.book_ref);
    
});

//Delete flight

app.delete("/api/v1/flights/:flight_id", (req, res) =>{
    res.status(204).json({
        status:"success",
    });
    
});

//Create passenger info
app.post("/api/v1/passenger", async (req, res) => {
    console.log(req.body);
    try{
        const passenger = await db.query(
            "INSERT INTO passenger_info (passenger_id, passenger_name, phone, email, passenger_created) values ($1, $2, $3, current_timestamp );",
            [req.body.passenger_name, req.body.phone, req.body.email]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                passenger: passenger.rows[0],
            },

        });
    } catch (err) {
    console.log(err);
    }
    
});


//buy ticket
app.get("/api/v1/createbooking", async (req, res) => {
    console.log(req.body);
    try{


        const buyticket = await db.query(
            "insert into bookings (book_ref, book_date, waitlist, total_amount) values ((random () * (999999999+1+ 1) + 1):: int, current_timestamp, 'no', 225.00) returning *;",  
            
        );
        // const createticket = await db.query(
        //     "insert into ticket (ticket_no, flight_id, book_ref) values ((random () * (99999+1+ 1) + 1):: int, $1, $2) returning *;",
        //     [req.body.flight_id, req.params.book_ref]);  
            
        ;
        console.log(buyticket);
        res.status(201).json({
            status: "success",
            data:{
                bookings: buyticket.rows[0],
                // ticket: createticket.row[0],
            },

        });
    } catch (err) {
    console.log(err);
    }
    
});
//create a ticket 
app.post("/api/v1/createticket", async (req, res) => {
    console.log(req.body);

    try{

        const createticket = await db.query(
            "insert into ticket (ticket_no, flight_id, book_ref, ticket_booked) values ((random () * (99999+1+ 1) + 1):: int, $1, $2, current_timestamp) returning *",
            [req.body.flight_id, req.body.book_ref]);  
            
        console.log(createticket);
        res.status(201).json({
            status: "success",
            data:{
                ticket: createticket.rows[0],
            },

        });
    } catch (err) {
    console.log(err);
    }
    
});
//get the recent ticket created
app.get("/api/v1/getticket", async (req, res) => {
    
    try {
        
        const getticket = await db.query(
            "select ticket_no, flight_id, book_ref, ticket_booked from ticket order by ticket_booked desc limit 1;");  
        const scheduled_departure = await db.query(
            "select scheduled_departure from flight_leg where flight_id=$1",
            [req.body.flight_id]);
        console.log(getticket);
        res.status(201).json({
            status: "success",
            data:{
                getticket: getticket.rows[0],
                scheduled_departure: scheduled_departure.rows[0]
            },

        });
    } catch (error) {
        console.log(error);
    }
})

//fill in passenger information create passenger
app.post("/api/v1/createpassenger", async (req, res) => {
    
    try {
        
        const createpassenger = await db.query(
            "insert into passenger_info (passenger_id, book_ref, passenger_name, phone, email, passenger_created) values ((random () * (9999999+1+ 1) + 1):: int, $1,$2,$3,$4, current_timestamp) returning *;",
            
            [req.body.book_ref, req.body.passenger_name, req.body.phone, req.body.email]);  

        console.log(createpassenger);
        res.status(201).json({
            status: "success",
            data:{
                createpassenger: createpassenger.rows[0],
            },

        });
    } catch (error) {
        console.log(error);
    }
})

//load passenger ID
app.get("/api/v1/getpassengerid", async (req, res) => {
    
    try{
        //const {departure_airport} = req.query;
        const results = await db.query(
            "select * from passenger_info order by passenger_created desc limit 1;", 
            //"SELECT * FROM FLIGHTs WHERE departure_airport || ' ' || arrival_airport ILIKE $1",[`%${req.body.departure_airport}$%`])
            )
        ;
        // const results1 = await db.query(
        //     "select * from flight_info where flight_id = $1;", [req.body.flight_id]
        //     //"SELECT * FROM FLIGHTs WHERE departure_airport || ' ' || arrival_airport ILIKE $1",[`%${req.body.departure_airport}$%`])
        //     )
        // ;
        res.status(200).json({
            status: "success",
            data:{
                createpassenger: results.rows[0],
                // createpassenger: results1.rows[0],
            },
});
  
    } catch (err) {
        console.log(err);
    }

});

//Add payment
app.post("/api/v1/addpayment", async (req, res) => {
    
    try {
        
        const addpayment = await db.query(
            "insert into payment (passenger_id, card_number, taxes, discounts) values ($1, $2, 0.82, 10.00) returning *;",
            
            [req.body.passenger_id, req.body.card_number]);  

        console.log(addpayment);
        res.status(201).json({
            status: "success",
            data:{
                addpayment: addpayment.rows[0],
            },

        });
    } catch (error) {
        console.log(error);
    }
})

//generate boarding
app.post("/api/v1/addboarding", async (req, res) => {
    
    try {
        
        const addboarding = await db.query(
            "insert into boarding (ticket_no, flight_id, boarding_no, boarding_time, gate, checked_bags) values ($1,$2,(random () * (9999+1+ 1) + 1):: int,'2020-12-14 15:50:00+03',(random () * (9+1+ 1) + 1):: int, 1 ) returning *;",
            
            [req.body.ticket_no, req.body.flight_id]);  
        const addbaggage = await db.query(
                "insert into baggage (ticket_no, flight_id, claim_gate, claim_no) values ($1,$2,(random () * (9+1+ 1) + 1):: int,(random () * (999+1+ 1) + 1):: int) returning *;",
                
                [req.body.ticket_no, req.body.flight_id]); 

        console.log(addboarding);
        res.status(201).json({
            status: "success",
            data:{
                addboarding: addboarding.rows[0],
                addbaggage: addbaggage.rows[0],
            },

        });
    } catch (error) {
        console.log(error);
    }
})

//getbookref
app.get("/api/v1/getbookref", async (req, res) => {
    
    try{
        //const {departure_airport} = req.query;
        const bookings = await db.query(
            "SELECT * from bookings where book_ref = $1;", 
            [req.query.book_ref])
        ;
        const passengerid = await db.query(
            "SELECT * from passenger_info where book_ref = $1;", 
            [req.query.book_ref])
        ;
        const ticket = await db.query(
            "SELECT * from ticket where book_ref = $1;", 
            [req.query.book_ref])
        ;
        res.status(200).json({
            status: "success",
            data:{
                bookings: bookings.rows[0],
                passengerid: passengerid.rows[0],
                ticket: ticket.rows[0],
            },
});
  
    } catch (err) {
        console.log(err);
    }

});
//Search flighjt
app.get("/api/v1/search", async (req, res) => {
    
    try{
        //const {departure_airport} = req.query;
        const results = await db.query(
            "SELECT * FROM FLIGHTs WHERE departure_airport ilike $1 and arrival_airport ilike $2", 
            //"SELECT * FROM FLIGHTs WHERE departure_airport || ' ' || arrival_airport ILIKE $1",[`%${req.body.departure_airport}$%`])
            [req.query.departure_airport, req.query.arrival_airport])
        ;
        res.status(200).json({
            status: "success",
            data:{
                flight: results.rows[0],
            },
});
  
    } catch (err) {
        console.log(err);
    }

});

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is up and ${port}`);
});
    