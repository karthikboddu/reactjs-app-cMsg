import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { checkIsAuthenticated, authSignUp, authLogin, authLogout, checkLogin } from './auth'
import {getAuthToken,isLogin,useAuth,getAuth}  from "./auth";
import { userLogin,userRegister } from "./services";
export const AuthContext = React.createContext({})

export default function Auth({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuth()
        console.log(checkAuth())
    }, [])

    const checkAuth = () => getAuth()
        .then( setIsAuthenticated(true),console.log(isAuthenticated))
        .catch((error =>{
            setIsAuthenticated(false)
        }) )
       

    const login = credentials => userLogin(credentials.email,credentials.password)
        .then(setIsAuthenticated(true))
        .catch(error => {
            alert(error)
            setIsAuthenticated(false)
        })

    const logout = () => {
        authLogout()
        setIsAuthenticated(false)
    }

    const signUp = credentials => userRegister(credentials)
        .then(setIsAuthenticated(true))
        .catch(error => {
            alert(error)
            setIsAuthenticated(false)
        })

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, signUp }}>
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
