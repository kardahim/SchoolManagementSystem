import React, { useEffect, useState } from 'react'
import './StudentList.scss'
import axios from 'axios'

function TeacherList() {
    const [studentFirstStatus, setStudentFirstStatus] = useState([])
    const [studentSecondStatus, setStudentSecondStatus] = useState([])
    const [classes, setClasses] = useState([])
    // this is a bad solution but it's works
    const [isChange, setIsChange] = useState(false)

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
    }, [isChange])

    function changeStatus(id, status) {
        let data
        if (status == 1) data = 3
        else if (status == 3) data = 1

        setIsChange(false)
        axios.put(`http://localhost:3001/student/${id}`, { status: data })
            .then((response) => {
                setIsChange(true)
            })
    }

    return (
        <div className='list-container-student'>
            <div className='list-content'>
                <div className="list-header">Aktywni</div>
                {studentFirstStatus.map((value, key) => {
                    return (
                        <div className='list-row' key={key}>
                            {value.first_name} • {value.last_name}
                            • {value.email}  •

                            {classes.map((v, k) => {
                                if (value.ClassId === v.id)
                                    return <div key={k}>{v.name}</div>
                            })}
                            <i className="fa-solid fa-user-graduate icon" title='Zmień status' onClick={() => changeStatus(value.id, 1)}></i>
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
                            <i className="fa-solid fa-user icon" title='Zmień status' onClick={() => changeStatus(value.id, 3)}></i>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default TeacherList