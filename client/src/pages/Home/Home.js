import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Home.scss'
import { AuthContext } from '../../helpers/AuthContext'
import Admin from './AdminHome'
import axios from 'axios'

function Home() {
    const { authState, setAuthState } = useContext(AuthContext)

    // const navigate = useNavigate()
    // const { authState, setAuthState } = useContext(AuthContext)
    // useEffect(() => {
    //     if (!authState.status) {
    //         console.log(authState)
    //         navigate('/login')
    //     }
    // }, [])

    // FIXME: work only with link, url redirect to login (even if user is logged)
    if (authState.isAdmin) {
        return (
            <Admin />
        )
    }
    else if (authState.isTeacher) {
        return (
            <div>test nauczyciela</div>
        )
    }
    else if (authState.status) {
        return (
            <div>test ucznia</div>
        )
    }
}

export default Home