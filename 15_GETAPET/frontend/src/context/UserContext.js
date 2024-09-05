import { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({ children }) {
    const { autheticated, register, logout, login } = useAuth();

    return (
        <Context.Provider value={{ autheticated, register, login , logout}}>
            {children}
        </Context.Provider>
    )
}

export { Context, UserProvider };
