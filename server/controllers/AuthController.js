const { Student, Teacher } = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    // login
    login: async (req, res) => {
        const { email, password } = req.body
        const teacher = await Teacher.findOne({ where: { email: email } })
        const student = await Student.findOne({ where: { email: email } })

        if (!teacher && !student) res.json({ error: "Użytkownik nie istnieje" })
        else {
            if (!student) {
                bcrypt.compare(password, teacher.password).then((match) => {
                    if (!match) res.json({ error: "Złe hasło lub email" })
                    else {
                        const accessToken = sign({ email: teacher.email, id: teacher.id, isAdmin: teacher.isAdmin, isTeacher: true, name: teacher.first_name }, 'importantsecret')
                        res.json({ token: accessToken, email: teacher.email, id: teacher.id, isAdmin: teacher.isAdmin, isTeacher: true, name: teacher.first_name })
                    }
                })
            }
            else if (!teacher) {
                bcrypt.compare(password, student.password).then((match) => {
                    if (!match) res.json({ error: "Złe hasło lub email" })
                    else {
                        const accessToken = sign({ email: student.email, id: student.id, isAdmin: false, isTeacher: false, name: student.first_name }, 'importantsecret')
                        res.json({ token: accessToken, email: student.email, id: student.id, isAdmin: false, isTeacher: false, name: student.first_name })
                    }
                })
            }
        }
    },

    // check correct token
    checkToken: (req, res) => {
        res.json(req.user)
    }
}