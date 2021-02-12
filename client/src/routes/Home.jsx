import React, {} from 'react';
import ChooseType from '../components/ChooseType';
import FlightsList from '../components/FlightsList'
import Header from '../components/Header'
import Search from '../components/Search'
import CheckBookings from './CheckBookings';

const Home = () => {
    
    return (
        <div>

            <Header/>
            
            <Search/>
            <CheckBookings/>
           <FlightsList/>
            
        </div>
    )
}

export default Home
