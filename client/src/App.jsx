import React, {} from 'react';
import{BrowserRouter as Router, Switch, Route} from "react-router-dom"
import AddBoarding from './components/AddBoarding';
import AddPayment from './components/AddPayment';
import CheckBookRef from './components/CheckBookRef';
import CheckBookReference from './components/CheckBookReference';
import CreateBooking from './components/CreateBooking';
import CreateTicket from './components/CreateTicket';

import DirectInfo from './components/DirectInfo';
import IndirectInfo from './components/IndirectInfo';
import { FlightsContextProvider } from './context/FlightsContext';

import FlightDetailPage from './routes/FlightDetailPage';
import Home from "./routes/Home";
import SearchPage from './routes/SearchPage';
import UpdatePage from "./routes/UpdatePage";

const App = () => {
    return ( 
        <FlightsContextProvider>
               <div className ="container">
        <Router>
            <Switch>
            <Route exact path ="/" component= {Home}/>
            <Route exact path ="/flights/:flight_id/update" component= {UpdatePage}/>
            <Route exact path ="/flights/:flight_id" component= {FlightDetailPage}/>
            <Route exact path ="/search" component= {SearchPage}/>
            <Route exact path ="/flights/:flight_id/direct" component= {DirectInfo}/>
            <Route exact path ="/flights/:flight_id/indirect" component= {IndirectInfo}/>
            <Route exact path ="/createbooking" component= {CreateBooking}/>
            <Route exact path ="/createticket" component= {CreateTicket}/>
            <Route exact path ="/addpayment" component= {AddPayment}/>
            <Route exact path ="/addboarding" component= {AddBoarding}/>
            <Route exact path ="/checkbookref" component= {CheckBookRef}/>
            <Route exact path ="/checkbookreference" component= {CheckBookReference}/>
            </Switch>        
        </Router>
        
    </div> 
        </FlightsContextProvider>

    )};

export default App;