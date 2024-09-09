import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage();
    const [autheticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {
        let msgText = 'registration completed successfully';
        let msgType = 'success';

        try {
            const data = await api
                .post('/users/register', user)
                .then((response) => {
                    return response.data
                });

            await authUser(data);
        } catch (error) {
            // tratar erro
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }

    async function login(user) {
        let msgText = 'Login completed successfully';
        let msgType = 'success';

        try {
            const data = await api.post('/users/login', user)
            .then((response) => {
                return response.data
            })

            await authUser(data)

        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    function logout(){
        const msgText = 'Logout completed successfully';
        const msgType = 'success'

        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        navigate('/')

        setFlashMessage(msgText, msgType);
    }

    return { register, autheticated , logout, login};
}
