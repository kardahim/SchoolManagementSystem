import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Home.scss'
import { AuthContext } from '../../helpers/AuthContext'

function Home() {
    const navigate = useNavigate()
    const { authState, setAuthState } = useContext(AuthContext)

    useEffect(() => {
        if (!authState.status) {
            navigate('/login')
        }
    }, [])

    if (authState.isAdmin) {
        return (
            <div>test dyrektora</div>
        )
    }
    else if (authState.isTeacher) {
        return (
            <div>test nauczyciela</div>
        )
    }
    else if (authState.status) {
        <div>test ucznia</div>
    }
}

export default Home