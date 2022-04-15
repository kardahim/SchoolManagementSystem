import React, { useEffect, useState } from 'react'
import './TeacherList.scss'
import axios from 'axios'

function TeacherList() {
    const [teacherFirstStatus, setTeacherFirstStatus] = useState([])
    const [teacherSecondStatus, setTeacherSecondStatus] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/teacher/status/1').then((response) => {
                setTeacherFirstStatus(response.data)
            })

        axios
            .get('http://localhost:3001/teacher/status/2').then((response) => {
                setTeacherSecondStatus(response.data)
            })

        axios
            .get('http://localhost:3001/subject').then((response) => {
                setSubjects(response.data)
            })
    }, [])

    return (
        <div className='list-container'>
            <div className='list-content'>
                <div className="list-header">Aktywni</div>
                {teacherFirstStatus.map((value, key) => {
                    return (
                        <div className='list-row' key={key}>
                            {value.first_name} • {value.last_name}
                            • {value.email} • {value.isAdmin ? 'Administrator' : 'Nauczyciel'} •

                            {subjects.map((v, k) => {
                                if (value.id === v.TeacherId)
                                    return <div>{v.name}</div>
                            })}
                        </div>
                    )
                })}
                <div className="list-header">Zwolnieni</div>
                {teacherSecondStatus.map((value, key) => {
                    return (
                        <div className='list-row' key={key}>
                            {value.first_name} • {value.last_name}
                            • {value.email} • {value.isAdmin ? 'Administrator' : 'Nauczyciel'} •

                            {subjects.map((v, k) => {
                                if (value.id === v.TeacherId)
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