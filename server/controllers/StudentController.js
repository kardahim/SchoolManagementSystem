const { Student, Teacher } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    // add student
    addStudent: async (req, res) => {
        const student = req.body

        const studentFind = await Student.findAll({ where: { email: student.email } })
        const teacherFind = await Teacher.findAll({ where: { email: student.email } })
        console.log('-------------------')
        if (studentFind.length != 0 || teacherFind.length != 0) res.json({ error: "Użytkownik o tym emailu już istnieje" })
        else {
            student.StatusId = 1
            bcrypt.hash(student.password, 10).then((hash) => {
                student.password = hash
                Student.create(student)
            })
            res.json("ADDED")
        }
    },

    // get all students
    getAllStudents: async (req, res) => {
        const students = await Student.findAll()
        res.json(students)
    },

    // get student by id
    getStudentById: async (req, res) => {
        const id = req.params.id
        const student = await Student.findByPk(id)
        res.json(student)
    },

    // update student
    updateStudent: async (req, res) => {
        const id = req.params.id
        const newStudent = req.body
        try {
            await Student.update(newStudent, { where: { id: id } })
            res.json(newStudent)
        }
        catch (error) {
            res.json(error)
        }
    },

    //delete student
    deleteStudent: async (req, res) => {
        const id = req.params.id
        try {
            await Student.destroy({ where: { id: id } })
            res.json("DELETED")
        }
        catch (error) {
            res.json(error)
        }
    }
}
