import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AuthContext } from '../../helpers/AuthContext'
import * as Yup from 'yup'
import './AddNewGrade.scss'
import axios from 'axios'

function AddNewGrade() {
    const location = useLocation()
    const { authState } = useContext(AuthContext)
    const [marks, setMarks] = useState([1, 2, 3, 4, 5])
    const [weights, setWeights] = useState([1, 2, 3, 4, 5])

    const initialValues = {
        value: 1,
        weight: 1,
        StudentId: location.state.studentId,
        TeacherId: authState.id
    }

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/grade', data)
            .then((response) => {
                console.log(data)
            })
    }

    return (
        <div className='grade-container'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}>
                <Form className='grade-form'>
                    <div className='form-header'>{location.state.studentName}</div>
                    <div className='form-body'>
                        <div className='grade-icon-container'>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <label>Ocena</label>
                            <Field
                                as='select'
                                name='value'
                                className='grade-input'>
                                {marks.map((value, key) => {
                                    return (
                                        <option value={value}>{value}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        <div>
                            <label>Waga</label>
                            <Field
                                as='select'
                                name='weight'
                                className='grade-input'>
                                {weights.map((value, key) => {
                                    return (
                                        <option value={value} key={key}>{value}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        <div>
                            <button type='submit'>Dodaj ocenę</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddNewGrade