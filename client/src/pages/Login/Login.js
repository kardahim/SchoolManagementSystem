import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import './Login.scss'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState('')

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("To nie jest email").required("To pole jest wymagane"),
        password: Yup.string()
            .required("To pole jest wymagane")
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth/login', data).then((response) => {
            if (response.data.error) {
                setLoginError(response.data.error)
            }
            else {
                console.log(response.data.error)
                localStorage.setItem('accessToken', response.data)
                navigate('/')
            }
        })
    }

    return (
        <div className='login-container'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className='login-form'>
                    <div className='form-header'>logowanie</div>
                    <div className='form-body'>
                        <div className='login-icon-container'>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <ErrorMessage name='email' component='span' />
                            <span>{loginError}</span>
                            <Field
                                name='email'
                                className='login-input'
                                // FIXME: onchange doesnt work, errorMessage should disappear
                                placeholder='Email' />
                        </div>
                        <div>
                            <ErrorMessage name='password' component='span' />
                            <Field
                                name='password'
                                type='password'
                                className='login-input'
                                placeholder='Hasło' />
                        </div>
                        <div>
                            <button type='submit'>zaloguj się</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Login