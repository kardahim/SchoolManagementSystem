import React, { useEffect, useState } from 'react'
import './ClassList.scss'
import axios from 'axios'

function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/teacher').then((response) => {
                setTeachers(response.data)
            })

        axios
            .get('http://localhost:3001/class').then((response) => {
                setClasses(response.data)
            })
    }, [])

    return (
        <div className='list-container-class'>
            <div className='list-content'>
                <div className="list-header">Klasy</div>
                {classes.map((value, key) => {
                    return (
                        <div className='list-row' key={key}>
                            {value.name} •
                            {teachers.map((v, k) => {
                                if (value.TeacherId == v.id)
                                    return <div>{v.first_name} {v.last_name}</div>
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeacherList