import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios'
import './GradeList.scss'

function StudentHome() {
    const { authState } = useContext(AuthContext)
    const [grades, setGrades] = useState([])
    const [subjects, setSubjects] = useState([])
    const [average, setAverage] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        // get all grades
        axios
            .get(`http://localhost:3001/grade/student/${authState.id}`).then((response) => {
                setGrades(response.data)
                console.log(response.data)
            })
        axios
            .get('http://localhost:3001/subject').then((response) => {
                setSubjects(response.data)
            })
    }, [])

    useEffect(() => {
        subjects.forEach(subject => {
            let top = 0
            let bottom = 0
            let avg = 0
            grades.forEach(grade => {
                if (subject.id == grade.Teacher.SubjectId) {
                    top += (grade.value * grade.weight)
                    bottom += grade.weight
                }
            })
            if (bottom != 0) {
                avg = top / bottom
            }
            setAverage(state => [...state, avg])
        });
    }, [subjects])

    useEffect(() => {
        let value = 0
        let counter = 0
        average.map((v, k) => {
            if (v != 0) {
                value += v
                counter++
            }
        })
        setTotal(value / counter)
    }, [average])
    return (
        <div className='list-container'>
            <div className='list-content'>
                {subjects.map((value, key) => {
                    return (
                        <div>
                            <div className="list-header" key={key}>{value.name}</div>
                            {grades.map((v, k) => {
                                if (value.id == v.Teacher.SubjectId) {
                                    return (
                                        <div className='list-row' key={k} title={`Waga: ${v.weight}`}>
                                            {v.value}
                                        </div>
                                    )
                                }
                            })}
                            <div className='list-row'>
                                {average[key] == 0 ? "Brak danych" : `Średnia z przedmiotu: ${average[key]}`}
                            </div>
                        </div>
                    )
                })}
                <div>
                    <div className="list-header">Średnia</div>
                    <div className='list-row'>
                        {total}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StudentHome