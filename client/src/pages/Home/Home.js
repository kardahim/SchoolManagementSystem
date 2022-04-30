import React, { useContext } from 'react'
import './Home.scss'
import { AuthContext } from '../../helpers/AuthContext'
import Admin from './AdminHome'
import Student from './StudentHome'
import Teacher from './TeacherHome'

function Home() {
    const { authState } = useContext(AuthContext)

    if (authState.isAdmin) {
        return (
            <Admin />
        )
    }
    else if (authState.isTeacher) {
        return (
            <Teacher />
        )
    }
    else if (authState.status) {
        return (
            <Student />
        )
    }
}

export default Home