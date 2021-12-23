import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {  authLogout } from './auth'
import {getAuth}  from "./auth";
import { userLogin,userRegister } from "./services";
import { useSnackbar } from 'notistack';
export const AuthContext = React.createContext({})

export default function Auth({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //const [isLoading, setIsLoading] = useState(true)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(() => {
        checkAuth()
        console.log(checkAuth())
    }, [])

    const checkAuth = () => getAuth()
        .then( setIsAuthenticated(true),console.log(isAuthenticated))
        .catch((error =>{
            enqueueSnackbar('Could not Authenticate', {
                    variant: 'error',
                })
            setIsAuthenticated(false)
        }) )
       

    const login = credentials => userLogin(credentials.email,credentials.password)
        .then(setIsAuthenticated(true))
        .catch(error => {
            alert(error)
                enqueueSnackbar('Could not Authenticate', {
                    variant: 'error',
                })
            setIsAuthenticated(false)
        })

    const logout = () => {
        authLogout()
        setIsAuthenticated(false)
    }

    const signUp = credentials => userRegister(credentials)
        .then(setIsAuthenticated(true))
        .catch(error => {
            enqueueSnackbar('Could not Authenticate', {
                    variant: 'error',
                })
            alert(error)
            setIsAuthenticated(false)
        })

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

Auth.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array
    ])
}
