const { Student, Teacher } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        const teacher = await Teacher.findOne({ where: { email: email } })
        const student = await Student.findOne({ where: { email: email } })

        if (!teacher && !student) res.json("Użytkownik nie istnieje")
        else {
            if (!student) {
                bcrypt.compare(password, teacher.password).then((match) => {
                    if (!match) res.json({ error: "Złe hasło lub email" })
                    else res.json("You logged in")
                })
            }
            else if (!teacher) {
                bcrypt.compare(password, student.password).then((match) => {
                    if (!match) res.json({ error: "Złe hasło lub email" })
                    else res.json("You logged in")
                })
            }
        }
    }
}