import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function TeacherForm() {
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
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
            .matches(/^(?=.*[A-Za-zĄĆĘŁŃÓŚŻŹąćęłńóśżź])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zĄĆĘŁŃÓŚŻŹąćęłńóśżź\d@$!%*#?&]{8,}$/, "Musi zawierać 8 znaków, wielką i małą literę, liczbę oraz znak specjalny")
    })

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/teacher', data)
            .then((response) => {
                console.log(response.data)
            })
    }

    const changeForm = () => {
        sessionStorage.setItem('user', 'student')
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
                        dodawanie - nauczyciela
                        <i className="fa-solid fa-arrow-right" onClick={changeForm}></i>
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
                            <button type='submit'>dodaj</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default TeacherForm