import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './Login.scss'

function Login() {
    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("To nie jest email").required("To pole jest wymagane"),
        password: Yup.string()
            .required("To pole jest wymagane")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Musi zawierać 8 znaków, wielką i małą literę, liczbę oraz znak specjalny")
    })

    const onSubmit = (data) => {
        // TODO: pin to server
        console.log(data)
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
                            <Field
                                name='email'
                                className='login-input'
                                placeholder='Użytkownik' />
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
                            <button type='submit'>Zaloguj się</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Login