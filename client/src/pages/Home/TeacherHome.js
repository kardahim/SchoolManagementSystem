import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios'
import './GradeList.scss'

function TeacherHome() {
    const navigate = useNavigate()

    const { authState } = useContext(AuthContext)
    const [students, setStudnets] = useState([])
    const [classes, setClassess] = useState([])

    useEffect(() => {
        // get all classess
        axios
            .get('http://localhost:3001/class').then((response) => {
                setClassess(response.data)
            })
        axios
            .get('http://localhost:3001/student').then((response) => {
                setStudnets(response.data)
            })
    }, [])

    return (
        <div className='list-container'>
            <div className='list-content'>
                {classes.map((value, key) => {
                    return (
                        <div>
                            <div className="list-header" key={key}>{value.name}</div>
                            {students.map((v, k) => {
                                if (value.id == v.ClassId && v.StatusId == 1) {
                                    return (
                                        <div className='list-row student-row' key={k} onClick={() => navigate('/add/grade', { state: { studentId: v.id, studentName: `${v.first_name} ${v.last_name}` } })}>
                                            {v.first_name} • {v.last_name} • {v.email}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default TeacherHome