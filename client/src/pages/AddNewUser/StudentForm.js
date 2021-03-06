import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function StudentForm() {
    const [classes, setClasses] = useState([])
    const [emailError, setEmailError] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/class').then((response) => {
            setClasses(response.data)
        })
    }, [])

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        ClassId: 1
    }

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("To pole jest wymagane")
            .matches(/^[A-ZĄĆĘŁŃÓŚŻŹ][a-ząćęłńóśżź]{2,}$/, "Musi zaczynać się wielką literą i mieć min. 3 znaki"),
        last_name: Yup.string()
            .required("To pole jest wymagane")
            .matches(/^[A-ZĄĆĘŁŃÓŚŻŹ][a-ząćęłńóśżź]{2,}$/, "Musi zaczynać się wielką literą i mieć min. 3 znaki"),
        email: Yup.string().email("To nie jest email").required("To pole jest wymagane"),
        password: Yup.string()
            .required("To pole jest wymagane")
            .matches(/^(?=.*[A-Za-zĄĆĘŁŃÓŚŻŹąćęłńóśżź])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zĄĆĘŁŃÓŚŻŹąćęłńóśżź\d@$!%*#?&]{8,}$/, "Musi zawierać 8 znaków, wielką i małą literę, liczbę oraz znak specjalny"),
        ClassId: Yup.number().integer().required()

    })

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/student', data)
            .then((response) => {
                if (response.data.error) {
                    setEmailError(response.data.error)
                }
            })
    }

    const changeForm = () => {
        sessionStorage.setItem('user', 'teacher')
        window.location.reload()
    }

    return (
        <div className='addNewUser-container'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form className='addNewUser-form'>
                    <div className='form-header'>
                        dodawanie - ucznia
                        <i className="fa-solid fa-arrow-left" onClick={changeForm}></i>
                    </div>
                    <div className='form-body'>
                        <div className='form-icon-container'>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <ErrorMessage name='first_name' component='span' />
                            <Field
                                name='first_name'
                                className='form-input'
                                placeholder='Imię' />
                        </div>
                        <div>
                            <ErrorMessage name='last_name' component='span' />
                            <Field
                                name='last_name'
                                className='form-input'
                                placeholder='Nazwisko' />
                        </div>
                        <div>
                            <ErrorMessage name='email' component='span' />
                            <span>{emailError}</span>
                            <Field
                                name='email'
                                className='form-input'
                                placeholder='Email' />
                        </div>
                        <div>
                            <ErrorMessage name='password' component='span' />
                            <Field
                                name='password'
                                type='password'
                                className='form-input'
                                placeholder='Hasło' />
                        </div>
                        <div>
                            <ErrorMessage name='ClassId' component='span' />
                            <Field
                                as='select'
                                name='ClassId'
                                className='form-input'>
                                {classes.map((value, key) => {
                                    return (
                                        <option value={value.id}>{value.name}</option>)
                                })}
                            </Field>
                        </div>
                        <div>
                            <button type='submit'>dodaj</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default StudentForm