import React, { useEffect, useState } from 'react'
import './StudentList.scss'
import axios from 'axios'

function TeacherList() {
    const [studentFirstStatus, setStudentFirstStatus] = useState([])
    const [studentSecondStatus, setStudentSecondStatus] = useState([])
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/student/status/1').then((response) => {
                setStudentFirstStatus(response.data)
            })

        axios
            .get('http://localhost:3001/student/status/3').then((response) => {
                setStudentSecondStatus(response.data)
            })

        axios
            .get('http://localhost:3001/class').then((response) => {
                setClasses(response.data)
            })
    }, [])

    return (
        <div className='list-container'>
            <div className='list-content'>
                <div className="list-header">Aktywni</div>
                {studentFirstStatus.map((value, key) => {
                    return (
                        <div className='list-row' key={key}>
                            {value.first_name} • {value.last_name}
                            • {value.email}  •

                            {classes.map((v, k) => {
                                if (value.ClassId === v.id)
                                    return <div>{v.name}</div>
                            })}
                        </div>
                    )
                })}
                <div className="list-header">absolwenci</div>
                {studentSecondStatus.map((value, key) => {
                    return (
                        <div className='list-row' key={key}>
                            {value.first_name} • {value.last_name}
                            • {value.email} •

                            {classes.map((v, k) => {
                                if (value.ClassId === v.id)
                                    return <div>{v.name}</div>
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeacherList