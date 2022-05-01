const { Teacher, Student } = require('../models')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

module.exports = {
    // add teacher
    addTeacher: async (req, res) => {
        const teacher = req.body

        const studentFind = await Student.findAll({ where: { email: teacher.email } })
        const teacherFind = await Teacher.findAll({ where: { email: teacher.email } })
        if (teacherFind.length != 0 || studentFind.length != 0) res.json({ error: "Użytkownik o tym emailu już istnieje" })
        else {
            teacher.isAdmin = false
            teacher.StatusId = 1
            bcrypt.hash(teacher.password, 10).then((hash) => {
                teacher.password = hash
                Teacher.create(teacher)
            })
            res.json("ADDED")
        }
    },

    // get all teachers
    getAllTeachers: async (req, res) => {
        const teachers = await Teacher.findAll()
        res.json(teachers)
    },

    // get teacher by id
    getTeacherById: async (req, res) => {
        const id = req.params.id
        const teacher = await Teacher.findByPk(id)
        res.json(teacher)
    },

    // get teacher by StatusId
    getTeacherByStatusId: async (req, res) => {
        const id = req.params.id
        const teacher = await Teacher.findAll({ where: { StatusId: id } })
        res.json(teacher)
    },

    // update teacher
    updateTeacher: async (req, res) => {
        const id = req.params.id
        const status = req.body.status

        Teacher.update({ StatusId: status }, { where: { id: id } })
        res.json("updated")
    },

    // delete teacher
    deleteTeacher: async (req, res) => {
        const id = req.params.id
        try {
            await Teacher.destroy({ where: { id: id } })
            res.json("DELETED")
        }
        catch (error) {
            res.json(error)
        }
    }
}

