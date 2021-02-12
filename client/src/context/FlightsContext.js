import React, {useState, createContext} from "react";

export const FlightsContext = createContext();

export const FlightsContextProvider = (props) =>{

    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState([null])
    const addFlights = (flight) => {
        setFlights([...flights, flight]);
    };

    return (
        <FlightsContext.Provider 
        value = {{
            flights, setFlights, addFlights, selectedFlight, setSelectedFlight
            }}>
            {props.children}
        </FlightsContext.Provider>
    );
};