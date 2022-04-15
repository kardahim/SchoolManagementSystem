import React, { useEffect, useContext } from 'react'
import './AddNewUser.scss'
import Teacher from './TeacherForm'
import Student from './StudentForm'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../helpers/AuthContext'

function AddNewUser() {
    // const navigate = useNavigate()
    const { authState, setAuthState } = useContext(AuthContext)

    // useEffect(() => {
    //     if (!authState.isAdmin) {
    //         navigate('/login')
    //     }
    // }, [])

    if (sessionStorage.getItem('user') === 'student') {
        return (
            Student.call()
        )
    }
    else {
        return (
            Teacher.call()
        )
    }
}

export default AddNewUser