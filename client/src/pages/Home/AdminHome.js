import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminHome() {
    const navigate = useNavigate()

    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])
    const [classes, setClasses] = useState([])
    const [statuses, setStatuses] = useState([])
    const [teacherFirstStatus, setTeacherFirstStatus] = useState(0)
    const [teacherSecondStatus, setTeacherSecondStatus] = useState(0)
    const [studentFirstStatus, setStudentFirstStatus] = useState(0)
    const [studentSecondStatus, setStudentSecondStatus] = useState(0)

    useEffect(() => {
        // get all students
        axios
            .get('http://localhost:3001/student').then((response) => {
                setStudents(response.data)
            })

        // get all teachers
        axios
            .get('http://localhost:3001/teacher').then((response) => {
                setTeachers(response.data)
            })

        // get all subjects
        axios
            .get('http://localhost:3001/subject').then((response) => {
                setSubjects(response.data)
            })

        // get all classes
        axios
            .get('http://localhost:3001/class').then((response) => {
                setClasses(response.data)
            })

        // get all statuses
        axios
            .get('http://localhost:3001/status').then((response) => {
                setStatuses(response.data)
            })

        axios
            .get('http://localhost:3001/teacher/status/1').then((response) => {
                setTeacherFirstStatus(response.data.length)
            })

        axios
            .get('http://localhost:3001/teacher/status/2').then((response) => {
                setTeacherSecondStatus(response.data.length)
            })

        axios
            .get('http://localhost:3001/student/status/1').then((response) => {
                setStudentFirstStatus(response.data.length)
            })

        axios
            .get('http://localhost:3001/student/status/3').then((response) => {
                setStudentSecondStatus(response.data.length)
            })


    }, [])

    return (
        <div className='home-container'>
            <div className='card' onClick={() => navigate('/teacher/list')}>
                <div className='card-header'>
                    nauczyciele
                </div>
                <div className='card-body'>
                    <div className='icon-container'><i className="fa-solid fa-user-tie"></i></div>
                    <div className='card-content'>
                        <div>Liczba nauczycieli: {teachers.length}</div>
                        {statuses.map((value, key) => {
                            if (value.id === 1) {
                                return <div key={key}>{value.name}: {teacherFirstStatus}</div>
                            }
                            else if (value.id === 2) {
                                return <div key={key}>{value.name}: {teacherSecondStatus}</div>
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-header'>
                    uczniowie
                </div>
                <div className='card-body'>
                    <div className='icon-container'><i className="fa-solid fa-user-graduate"></i></div>
                    <div className='card-content'>
                        <div>Liczba uczniów: {students.length}</div>
                        {statuses.map((value, key) => {
                            if (value.id === 1) {
                                return <div key={key}>{value.name}: {studentFirstStatus}</div>
                            }
                            else if (value.id === 3) {
                                return <div key={key}>{value.name}: {studentSecondStatus}</div>
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-header'>
                    klasy
                </div>
                <div className='card-body'>
                    <div className='icon-container'><i className="fa-solid fa-chalkboard"></i></div>
                    <div className='card-content'>
                        <div>Liczba klas: {classes.length}</div>
                        <div>Liczba przedmiotów: {subjects.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome