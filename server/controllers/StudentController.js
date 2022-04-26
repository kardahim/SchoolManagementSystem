const { Student, Teacher } = require('../models')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

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

    // get student by StatusId
    getStudentByStatusId: async (req, res) => {
        const id = req.params.id
        const student = await Student.findAll({ where: { StatusId: id } })
        res.json(student)
    },

    // FIXME: always change password, need correct password for work
    // update student
    updateStudent: async (req, res) => {
        const id = req.params.id
        const newStudent = req.body

        const studentFind = await Student.findAll({ where: { email: newStudent.email, id: { [Op.ne]: id } } })
        const teacherFind = await Teacher.findAll({ where: { email: newStudent.email, id: { [Op.ne]: id } } })
        if (teacherFind.length != 0 || studentFind.length != 0) res.json({ error: "Użytkownik o tym emailu już istnieje" })
        else {
            bcrypt.hash(newStudent.password, 10).then((hash) => {
                newStudent.password = hash
                Student.update(newStudent, { where: { id: id } })
            })
            res.json("updated")
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
