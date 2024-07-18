import React, { createContext, useState, useContext } from 'react';

const AppointmentsContext = createContext();

export const useAppointments = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);

    return (
        <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    );
};
