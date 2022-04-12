import React, { useEffect, useState } from 'react'
import './AddNewUser.scss'
import Teacher from './TeacherForm'
import Student from './StudentForm'
import TeacherForm from './TeacherForm'

function AddNewUser() {
    if (sessionStorage.getItem('user') === 'student') {
        return (
            Student.call()
        )
    }
    else {
        return (
            Teacher.call()
        )
    }
}

export default AddNewUser