const { Student } = require('../models')
const bcrypt = require('bcrypt')

// TODO: add try catch statement
module.exports = {
    // add student
    addStudent: async (req, res) => {
        const student = req.body
        student.StatusId = 1
        try {
            bcrypt.hash(student.password, 10).then((hash) => {
                student.password = hash
                Student.create(student)
            })
            res.json("ADDED")
        }
        catch (error) {
            res.json(error)
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
