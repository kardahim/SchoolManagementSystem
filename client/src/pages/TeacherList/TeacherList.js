import React, { useEffect, useState } from 'react'
import './TeacherList.scss'
import axios from 'axios'

function TeacherList() {
    const [teacherFirstStatus, setTeacherFirstStatus] = useState([])
    const [teacherSecondStatus, setTeacherSecondStatus] = useState([])
    const [subjects, setSubjects] = useState([])
    // this is a bad solution but it's works
    const [isChange, setIsChange] = useState(false)

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
    }, [isChange])

    function changeStatus(id, status) {
        let data
        if (status == 1) data = 2
        else if (status == 2) data = 1

        setIsChange(false)
        axios.put(`http://localhost:3001/teacher/${id}`, { status: data })
            .then((response) => {
                setIsChange(true)
            })
    }

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
                            <i className="fa-solid fa-user icon" title='Zmień status' onClick={() => changeStatus(value.id, 1)}></i>
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
                            <i className="fa-solid fa-user-graduate icon" title='Zmień status' onClick={() => changeStatus(value.id, 2)}></i>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeacherList